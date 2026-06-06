import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { criarProjeto, getProjetoById, updateProjeto } from '../../services/projeto.service';
import { criarEntrega, type StatusProjeto } from '../../services/historicoprojeto.service';
import { getGrupoPerfil } from '../../services/grupos.service';

interface CadastrarProjetoDto {
  proStrDescricao: string;
  proDateInicio: string;
  hspStrStatus: StatusProjeto;
  hspStrLinkGithub?: string;
  hspStrLinkDeploy?: string;
  hspStrLinkProjeto?: string;
}

const STATUS_OPTIONS: StatusProjeto[] = [
  'Planejamento', 'Em Desenvolvimento', 'Bloqueado', 'Entregue', 'Concluido',
];

const Entrega: React.FC = () => {
  const navigate = useNavigate();
  const { id: projetoId } = useParams<{ id: string }>();   // /projeto/:id
  const [searchParams] = useSearchParams();
  const canIntId = searchParams.get('canIntId');

  const modoEdicao = !!projetoId;

  const [nomeGrupo, setNomeGrupo] = useState('');
  const [semestre, setSemestre] = useState('');
  const [gruIntId, setGruIntId] = useState<number | null>(null);
  const [loadingPerfil, setLoadingPerfil] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CadastrarProjetoDto>({
    defaultValues: { hspStrStatus: 'Planejamento' },
  });

  // Carrega perfil do grupo (nome, semestre, id)
  useEffect(() => {
    getGrupoPerfil()
      .then(perfil => {
        setNomeGrupo(perfil?.nome ?? '');
        setSemestre(perfil?.semestre ? `${perfil.semestre}º semestre` : '');
        setGruIntId(perfil?.id ?? null);
      })
      .catch(() => {})
      .finally(() => setLoadingPerfil(false));
  }, []);

  // Se modo edição, carrega dados do projeto para pré-preencher o form
  useEffect(() => {
    if (!modoEdicao) return;
    getProjetoById(Number(projetoId))
      .then(projeto => {
        const ultimoH = projeto?.historicos?.[projeto.historicos.length - 1];
        reset({
          proStrDescricao: projeto?.descricao,
          proDateInicio: projeto?.dataInicio?.split('T')[0] ?? '',
          hspStrStatus: ultimoH?.status ?? 'Planejamento',
          hspStrLinkGithub: ultimoH?.linkGithub ?? '',
          hspStrLinkDeploy: ultimoH?.linkDeploy ?? '',
          hspStrLinkProjeto: ultimoH?.link ?? '',
        });
      })
      .catch(() => alert('Erro ao carregar projeto para edição.'));
  }, [modoEdicao, projetoId]);

  const onSubmit = async (data: CadastrarProjetoDto) => {
    try {
      if (modoEdicao) {
        // Atualiza dados do projeto
        await updateProjeto(Number(projetoId), {
          proStrDescricao: data.proStrDescricao,
          proDateInicio: data.proDateInicio,
        });

        // Cria novo histórico com os links/status atualizados
        const temConteudo = data.hspStrLinkGithub || data.hspStrLinkDeploy ||
                            data.hspStrLinkProjeto || data.hspStrStatus;
        if (temConteudo) {
          await criarEntrega({
            hspStrDesc: `Atualização: ${data.proStrDescricao}`,
            hspStrStatus: data.hspStrStatus,
            hspStrLinkGithub: data.hspStrLinkGithub || undefined,
            hspStrLinkDeploy: data.hspStrLinkDeploy || undefined,
            hspStrLinkProjeto: data.hspStrLinkProjeto || undefined,
            proIntId: Number(projetoId),
          });
        }
      } else {
        // Cria novo projeto
        const projeto = await criarProjeto({
          proStrDescricao: data.proStrDescricao,
          proDateInicio: data.proDateInicio,
          ...(canIntId ? { canIntId: Number(canIntId) } : { gruIntId: gruIntId! }),
        });

        const temLink = data.hspStrLinkGithub || data.hspStrLinkDeploy || data.hspStrLinkProjeto;
        if (temLink || data.hspStrStatus) {
          await criarEntrega({
            hspStrDesc: `Início do projeto: ${data.proStrDescricao}`,
            hspStrStatus: data.hspStrStatus,
            hspStrLinkGithub: data.hspStrLinkGithub || undefined,
            hspStrLinkDeploy: data.hspStrLinkDeploy || undefined,
            hspStrLinkProjeto: data.hspStrLinkProjeto || undefined,
            proIntId: projeto?.id,
          });
        }
      }

      navigate('/dashboard_grupo');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join('\n')
          : mensagem ?? `Erro ao ${modoEdicao ? 'atualizar' : 'cadastrar'} projeto.`
      );
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <div className="w-11/12 max-w-2xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          {modoEdicao ? 'Editar Projeto' : 'Cadastrar Projeto'}
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          {modoEdicao
            ? 'Atualize os dados e adicione um novo marco de entrega'
            : canIntId ? 'Projeto vinculado à candidatura' : 'Projeto independente'}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Grupo</label>
              <input type="text"
                value={loadingPerfil ? 'Carregando...' : (nomeGrupo || '—')}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 cursor-default focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Semestre</label>
              <input type="text" value={semestre || '—'} readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 cursor-default focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="proStrDescricao" className="text-sm font-medium text-gray-700">
              Descrição do projeto
            </label>
            <textarea
              {...register('proStrDescricao', { required: 'Descrição obrigatória' })}
              id="proStrDescricao" rows={4}
              placeholder="Descreva o escopo e objetivos do projeto"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] resize-none"
            />
            {errors.proStrDescricao && (
              <span className="text-red-500 text-xs">{errors.proStrDescricao.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="proDateInicio" className="text-sm font-medium text-gray-700">
              Data de início
            </label>
            <input
              {...register('proDateInicio', { required: 'Data de início obrigatória' })}
              id="proDateInicio" type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]"
            />
            {errors.proDateInicio && (
              <span className="text-red-500 text-xs">{errors.proDateInicio.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="hspStrStatus" className="text-sm font-medium text-gray-700">
              {modoEdicao ? 'Novo status (será registrado como marco)' : 'Status inicial'}
            </label>
            <select {...register('hspStrStatus')} id="hspStrStatus"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] bg-white cursor-pointer"
            >
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700">
              Links <span className="text-gray-400 font-normal">(opcionais)</span>
            </p>
            {[
              { field: 'hspStrLinkGithub' as const, label: 'Repositório GitHub', placeholder: 'https://github.com/usuario/repositorio' },
              { field: 'hspStrLinkDeploy' as const, label: 'Link de Deploy', placeholder: 'https://meu-projeto.vercel.app' },
              { field: 'hspStrLinkProjeto' as const, label: 'Link do Projeto', placeholder: 'https://link-do-projeto.com' },
            ].map(({ field, label, placeholder }) => (
              <div key={field} className="flex flex-col space-y-1">
                <label htmlFor={field} className="text-xs text-gray-600">{label}</label>
                <input {...register(field)} id={field} type="text" placeholder={placeholder}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 flex gap-3">
            <button type="submit" disabled={isSubmitting}
              className="flex-1 bg-[#782E29] text-white py-3 rounded-md text-lg font-medium transition hover:bg-[#6d2823] shadow-md cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? (modoEdicao ? 'Salvando...' : 'Cadastrando...')
                : (modoEdicao ? 'Salvar Alterações' : 'Cadastrar Projeto')}
            </button>
            <button type="button" onClick={() => navigate(-1)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md text-lg font-medium transition hover:bg-gray-300 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Entrega;