import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { criarProjeto } from '../../services/projeto.service';
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
  'Planejamento',
  'Em Desenvolvimento',
  'Bloqueado',
  'Entregue',
  'Concluido',
];

const Entrega: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const canIntId = searchParams.get('canIntId');

  const [nomeGrupo, setNomeGrupo] = useState('');
  const [semestre, setSemestre] = useState('');
  const [loadingPerfil, setLoadingPerfil] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastrarProjetoDto>({
    defaultValues: { hspStrStatus: 'Planejamento' },
  });

  useEffect(() => {
    getGrupoPerfil()
      .then(perfil => {
        setNomeGrupo(perfil?.nome ?? '');
        setSemestre(perfil?.semestre ? `${perfil.semestre}º semestre` : '');
      })
      .catch(() => {})
      .finally(() => setLoadingPerfil(false));
  }, []);

  const onSubmit = async (data: CadastrarProjetoDto) => {
    try {
      // 1. cria o projeto
      const projeto = await criarProjeto({
        proStrDescricao: data.proStrDescricao,
        proDateInicio: data.proDateInicio,
        ...(canIntId ? { canIntId: Number(canIntId) } : {}),
      });

      // 2. se algum link ou status foi preenchido, cria histórico
      const temLink = data.hspStrLinkGithub || data.hspStrLinkDeploy || data.hspStrLinkProjeto;
      if (temLink || data.hspStrStatus) {
        await criarEntrega({
          hspStrDesc: `Início do projeto: ${data.proStrDescricao}`,
          hspStrStatus: data.hspStrStatus,
          hspStrLinkGithub: data.hspStrLinkGithub || undefined,
          hspStrLinkDeploy: data.hspStrLinkDeploy || undefined,
          hspStrLinkProjeto: data.hspStrLinkProjeto || undefined,
          proIntId: projeto.id,
        });
      }

      navigate('/dashboard_grupo');
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join('\n')
          : mensagem ?? 'Erro ao cadastrar projeto.'
      );
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <div className="w-11/12 max-w-2xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Cadastrar Projeto
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          {canIntId ? 'Projeto vinculado à candidatura' : 'Projeto independente'}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Grupo e Semestre — readonly */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Grupo</label>
              <input
                type="text"
                value={loadingPerfil ? 'Carregando...' : (nomeGrupo || '—')}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 cursor-default focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Semestre</label>
              <input
                type="text"
                value={semestre || '—'}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 cursor-default focus:outline-none"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="proStrDescricao" className="text-sm font-medium text-gray-700">
              Descrição do projeto
            </label>
            <textarea
              {...register('proStrDescricao', { required: 'Descrição obrigatória' })}
              id="proStrDescricao"
              rows={4}
              placeholder="Descreva o escopo e objetivos do projeto"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] resize-none"
            />
            {errors.proStrDescricao && (
              <span className="text-red-500 text-xs">{errors.proStrDescricao.message}</span>
            )}
          </div>

          {/* Data de início */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="proDateInicio" className="text-sm font-medium text-gray-700">
              Data de início
            </label>
            <input
              {...register('proDateInicio', { required: 'Data de início obrigatória' })}
              id="proDateInicio"
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]"
            />
            {errors.proDateInicio && (
              <span className="text-red-500 text-xs">{errors.proDateInicio.message}</span>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="hspStrStatus" className="text-sm font-medium text-gray-700">
              Status inicial
            </label>
            <select
              {...register('hspStrStatus')}
              id="hspStrStatus"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] bg-white cursor-pointer"
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Links — opcionais */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700">
              Links <span className="text-gray-400 font-normal">(opcionais)</span>
            </p>

            <div className="flex flex-col space-y-1">
              <label htmlFor="hspStrLinkGithub" className="text-xs text-gray-600">
                Repositório GitHub
              </label>
              <input
                {...register('hspStrLinkGithub')}
                id="hspStrLinkGithub"
                type="text"
                placeholder="https://github.com/usuario/repositorio"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="hspStrLinkDeploy" className="text-xs text-gray-600">
                Link de Deploy
              </label>
              <input
                {...register('hspStrLinkDeploy')}
                id="hspStrLinkDeploy"
                type="text"
                placeholder="https://meu-projeto.vercel.app"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="hspStrLinkProjeto" className="text-xs text-gray-600">
                Link do Projeto
              </label>
              <input
                {...register('hspStrLinkProjeto')}
                id="hspStrLinkProjeto"
                type="text"
                placeholder="https://link-do-projeto.com"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#782E29] text-white py-3 rounded-md text-lg font-medium transition hover:bg-[#6d2823] shadow-md cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Projeto'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
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