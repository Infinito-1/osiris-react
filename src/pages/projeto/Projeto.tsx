import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getProjetoById, updateProjeto } from "../../services/projeto.service";
import { criarEntrega, type StatusProjeto } from "../../services/historicoprojeto.service";
import { useAuth } from "../../hooks/useAuth";

interface InfoFieldProps {
  label: string;
  value: string | null | undefined;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => (
  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
    <p className="text-base font-medium text-gray-800">{label}</p>
    <p className="text-base text-gray-600">{value ?? '—'}</p>
  </div>
);

interface EditarProjetoDto {
  proStrDescricao: string;
  proDateInicio: string;
  hspStrStatus: StatusProjeto;
  hspStrLinkGithub?: string;
  hspStrLinkDeploy?: string;
  hspStrLinkProjeto?: string;
  hspStrDesc: string;
}

const STATUS_OPTIONS: StatusProjeto[] = [
  'Planejamento',
  'Em Desenvolvimento',
  'Bloqueado',
  'Entregue',
  'Concluido',
];

interface pageParams extends Record<string, string> {
  id: string;
}

// retorna links únicos e não vazios com seus rótulos
function getLinksUnicos(github?: string, deploy?: string, projeto?: string) {
  const mapa = new Map<string, string>();
  if (github) mapa.set(github, 'Repositório GitHub');
  if (deploy && !mapa.has(deploy)) mapa.set(deploy, 'Deploy');
  if (projeto && !mapa.has(projeto)) mapa.set(projeto, 'Link do Projeto');
  return Array.from(mapa.entries()).map(([url, label]) => ({ url, label }));
}

const Projeto: React.FC = () => {
  const { id } = useParams<pageParams>();
  const navigate = useNavigate();
  const { isAuthenticated, usuario } = useAuth();

  const [projeto, setProjeto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [editando, setEditando] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditarProjetoDto>();

  useEffect(() => {
    if (!id) return;
    getProjetoById(Number(id))
      .then(data => {
        setProjeto(data);
        // pega o histórico mais recente para pré-preencher
        const ultimoHistorico = data?.historicos?.[data.historicos.length - 1];
        reset({
          proStrDescricao: data?.descricao ?? '',
          proDateInicio: data?.dataInicio
            ? new Date(data.dataInicio).toISOString().split('T')[0]
            : '',
          hspStrStatus: ultimoHistorico?.status ?? 'Planejamento',
          hspStrLinkGithub: ultimoHistorico?.linkGithub ?? '',
          hspStrLinkDeploy: ultimoHistorico?.linkDeploy ?? '',
          hspStrLinkProjeto: ultimoHistorico?.link ?? '',
          hspStrDesc: '',
        });
      })
      .catch(() => setErro('Projeto não encontrado.'))
      .finally(() => setLoading(false));
  }, [id]);

  const ehDono =
    isAuthenticated &&
    usuario?.tipo === 'Grupo' &&
    projeto?.candidatura?.grupo?.nome === usuario?.nome;

  const mostrarBotaoInteresse =
    !isAuthenticated || usuario?.tipo === 'Grupo';

  function handleManifestarInteresse() {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/candidatura/${projeto?.candidatura?.demanda?.id}`);
  }

  const onSubmitEdicao = async (data: EditarProjetoDto) => {
    try {
      // atualiza dados base do projeto
      const atualizado = await updateProjeto(Number(id), {
        proStrDescricao: data.proStrDescricao,
        proDateInicio: data.proDateInicio,
      });

      // cria novo histórico com os links e status atualizados
      await criarEntrega({
        hspStrDesc: data.hspStrDesc || `Atualização do projeto`,
        hspStrStatus: data.hspStrStatus,
        hspStrLinkGithub: data.hspStrLinkGithub || undefined,
        hspStrLinkDeploy: data.hspStrLinkDeploy || undefined,
        hspStrLinkProjeto: data.hspStrLinkProjeto || undefined,
        proIntId: Number(id),
      });

      setProjeto(atualizado);
      setEditando(false);
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join('\n')
          : mensagem ?? 'Erro ao atualizar projeto.'
      );
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-gray-500">Carregando projeto...</p>
    </div>
  );

  if (erro || !projeto) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-red-600">{erro || 'Erro ao carregar projeto.'}</p>
    </div>
  );

  const demanda = projeto.candidatura?.demanda;
  const grupo = projeto.candidatura?.grupo;

  // pega o histórico mais recente para exibir links
  const ultimoHistorico = projeto?.historicos?.[projeto.historicos?.length - 1];
  const links = getLinksUnicos(
    ultimoHistorico?.linkGithub,
    ultimoHistorico?.linkDeploy,
    ultimoHistorico?.link,
  );

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <header className="w-full py-8 text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">{demanda?.nome ?? projeto.descricao}</h1>
        <p className="text-lg mt-1 text-gray-600">
          {grupo?.nome ?? '—'}{grupo?.lider ? ` / ${grupo.lider}` : ''}
        </p>
      </header>

      <div className="w-11/12 max-w-4xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">

        {/* Descrição */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Descrição do Projeto</h2>
            {ehDono && !editando && (
              <button
                onClick={() => setEditando(true)}
                className="text-sm px-4 py-1.5 border border-[#782E29] text-[#782E29] rounded-md hover:bg-red-50 transition cursor-pointer"
              >
                Editar
              </button>
            )}
          </div>

          {editando ? (
            <form onSubmit={handleSubmit(onSubmitEdicao)} className="space-y-4">
              {/* Descrição */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  {...register('proStrDescricao', { required: 'Descrição obrigatória' })}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] resize-none"
                />
                {errors.proStrDescricao && (
                  <span className="text-red-500 text-xs">{errors.proStrDescricao.message}</span>
                )}
              </div>

              {/* Data */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Data de início</label>
                <input
                  {...register('proDateInicio', { required: 'Data obrigatória' })}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                />
                {errors.proDateInicio && (
                  <span className="text-red-500 text-xs">{errors.proDateInicio.message}</span>
                )}
              </div>

              {/* Status */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  {...register('hspStrStatus')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] bg-white cursor-pointer"
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Links */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Links</p>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs text-gray-600">Repositório GitHub</label>
                  <input
                    {...register('hspStrLinkGithub')}
                    type="text"
                    placeholder="https://github.com/usuario/repositorio"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs text-gray-600">Deploy</label>
                  <input
                    {...register('hspStrLinkDeploy')}
                    type="text"
                    placeholder="https://meu-projeto.vercel.app"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs text-gray-600">Link do Projeto</label>
                  <input
                    {...register('hspStrLinkProjeto')}
                    type="text"
                    placeholder="https://link-do-projeto.com"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm"
                  />
                </div>
              </div>

              {/* Descrição da atualização */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Descrição da atualização <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <input
                  {...register('hspStrDesc')}
                  type="text"
                  placeholder="Ex: Entrega da Sprint 2"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#782E29] text-white py-2 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <p className="text-base text-gray-600 leading-relaxed">{projeto.descricao}</p>
          )}
        </section>

        {/* Detalhes */}
        {!editando && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalhes</h2>
            <div className="space-y-4">
              <InfoField
                label="Data de início:"
                value={projeto.dataInicio
                  ? new Date(projeto.dataInicio).toLocaleDateString('pt-BR')
                  : null}
              />
              <InfoField label="Grupo:" value={grupo?.nome} />
              <InfoField label="Líder:" value={grupo?.lider} />
              <InfoField
                label="Status:"
                value={ultimoHistorico?.status ?? 'Planejamento'}
              />
            </div>
          </section>
        )}

        {/* Links */}
        {!editando && links.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Links</h2>
            <div className="flex flex-wrap gap-3">
              {links.map(({ url, label }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#5F747F] text-white rounded-md text-sm font-medium hover:bg-[#53656e] transition cursor-pointer"
                >
                  {label}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Botões */}
        {!editando && (
          <section className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
            {mostrarBotaoInteresse && !ehDono && (
              <button
                onClick={handleManifestarInteresse}
                className="flex-1 bg-[#782E29] text-white py-3 px-6 rounded-md text-lg font-medium transition hover:bg-[#6d2823] shadow-md cursor-pointer"
              >
                Manifestar Interesse
              </button>
            )}
            <button className="flex-1 bg-[#5F747F] text-white py-3 px-6 rounded-md text-lg font-medium transition hover:bg-[#53656e] shadow-md cursor-pointer">
              Entrar em Contato
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default Projeto;