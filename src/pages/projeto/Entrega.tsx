import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getGrupoPerfil } from '../../services/grupos.service';
import { getProjetos } from '../../services/projeto.service';
import { criarEntrega, type StatusProjeto } from '../../services/historicoprojeto.service';

interface EntregaFormDto {
  hspStrDesc: string;
  hspStrLinkProjeto: string;
  hspStrStatus: StatusProjeto;
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
  const [proIntId, setProIntId] = useState<number | null>(null);
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [nomeGrupo, setNomeGrupo] = useState('');
  const [semestre, setSemestre] = useState('');
  const [loadingProjeto, setLoadingProjeto] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EntregaFormDto>();

  useEffect(() => {
    async function carregarProjeto() {
      try {
        const [perfil, projetos] = await Promise.all([
          getGrupoPerfil(),
          getProjetos(),
        ]);

        setNomeGrupo(perfil?.nome ?? '');
        setSemestre(perfil?.semestre ? `${perfil.semestre}º semestre` : '');

        // encontra o projeto ativo vinculado ao grupo logado
        const projetoAtivo = projetos.find(
          (p: any) => p.candidatura?.grupo?.nome === perfil?.nome && p.ativo
        );

        if (projetoAtivo) {
          setProIntId(projetoAtivo.id);
          setNomeProjeto(projetoAtivo.candidatura?.demanda ?? '');
        }
      } catch {
        // grupo sem projeto ativo ainda
      } finally {
        setLoadingProjeto(false);
      }
    }
    carregarProjeto();
  }, []);

  const onSubmit = async (data: EntregaFormDto) => {
    if (!proIntId) {
      alert('Nenhum projeto ativo encontrado para este grupo.');
      return;
    }
    try {
      await criarEntrega({
        hspStrDesc: data.hspStrDesc,
        hspStrLinkProjeto: data.hspStrLinkProjeto,
        hspStrStatus: data.hspStrStatus,
        proIntId,
      });
      navigate('/dashboard_grupo');
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join('\n')
          : mensagem ?? 'Erro ao registrar entrega.'
      );
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <div className="w-11/12 max-w-2xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Entrega de Projeto
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nome do Projeto — readonly */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">Nome do projeto</label>
            <input
              type="text"
              value={loadingProjeto ? 'Carregando...' : (nomeProjeto || '—')}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 cursor-default focus:outline-none"
            />
          </div>

          {/* Descrição da entrega */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="hspStrDesc" className="text-sm font-medium text-gray-700">
              Descrição do que foi desenvolvido
            </label>
            <textarea
              {...register('hspStrDesc', { required: 'Descrição obrigatória' })}
              id="hspStrDesc"
              rows={4}
              placeholder="Descreva o que foi entregue nesta etapa"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] resize-none"
            />
            {errors.hspStrDesc && (
              <span className="text-red-500 text-xs">{errors.hspStrDesc.message}</span>
            )}
          </div>

          {/* Grupo e Semestre */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Grupo</label>
              <input
                type="text"
                value={nomeGrupo || '—'}
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

          {/* Link do repositório/deploy */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="hspStrLinkProjeto" className="text-sm font-medium text-gray-700">
              Link do repositório ou deploy
            </label>
            <input
              {...register('hspStrLinkProjeto', { required: 'Link obrigatório' })}
              id="hspStrLinkProjeto"
              type="text"
              placeholder="https://github.com/seu-repositorio"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]"
            />
            {errors.hspStrLinkProjeto && (
              <span className="text-red-500 text-xs">{errors.hspStrLinkProjeto.message}</span>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="hspStrStatus" className="text-sm font-medium text-gray-700">
              Status atual do projeto
            </label>
            <select
              {...register('hspStrStatus', { required: 'Status obrigatório' })}
              id="hspStrStatus"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] bg-white cursor-pointer"
            >
              <option value="">Selecione o status</option>
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.hspStrStatus && (
              <span className="text-red-500 text-xs">{errors.hspStrStatus.message}</span>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#782E29] text-white py-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#6d2823] shadow-md cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Entrega'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Entrega;