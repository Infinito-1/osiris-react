import React, { useEffect, useState } from 'react';
import { getGrupoPerfil, getGrupoDashboard } from '../../services/grupos.service';

// ── Tipos alinhados com o retorno do getDashboardDados ────────────────────────

interface GrupoPerfil {
  id: number;
  nome: string;
  lider: string;
  ra: string;
  tamanho: number;
  membros: string | null;
  semestre: string | null;
}

interface ProjetoAtual {
  id: number;
  descricao: string;
  dataInicio: string;
  demanda: string;
  empreendedor: string;
  status: string;
}

interface Candidatura {
  id: number;
  demanda: string;
  status: string;
  aprovacao: boolean;
}

interface Entrega {
  id: number;
  descricao: string;
  link: string;
  status: string;
  data: string;
}

interface Metricas {
  totalCandidaturasEnviadas: number;
  candidaturasAceitas: number;
}

interface DashboardDados {
  grupo: string;
  lider: string;
  ra: string;
  semestre: string | null;
  membros: string | null;
  tamanho: number;
  metricas: Metricas;
  projetoAtual: ProjetoAtual | null;
  candidaturas: Candidatura[];
  entregas: Entrega[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const statusCandidaturaCor = (status: string) => {
  switch (status) {
    case 'Aceita':    return 'bg-green-100 text-green-800';
    case 'Recusada':  return 'bg-red-100 text-red-800';
    case 'Pendente':  return 'bg-yellow-100 text-yellow-800';
    case 'Desistente': return 'bg-gray-100 text-gray-600';
    default:          return 'bg-gray-100 text-gray-800';
  }
};

const statusEntregaCor = (status: string) => {
  switch (status) {
    case 'Aprovado':           return 'bg-green-100 text-green-800';
    case 'Revisão Necessária': return 'bg-red-100 text-red-800';
    case 'Em Análise':         return 'bg-yellow-100 text-yellow-800';
    default:                   return 'bg-gray-100 text-gray-800';
  }
};

// ── Subcomponentes ────────────────────────────────────────────────────────────

const InformacoesGrupo: React.FC<{ dados: DashboardDados }> = ({ dados }) => {
  const membrosLista = dados.membros ? dados.membros.split('\n').filter(Boolean) : [];

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Informações do Grupo</h3>

      <div className="space-y-2 text-sm">
        <p><span className="font-medium">Nome do Grupo</span><br />{dados.grupo}</p>
        <p><span className="font-medium">Representante</span><br />{dados.lider}</p>
        <p><span className="font-medium">RA</span><br />{dados.ra}</p>
        {dados.semestre && (
          <p><span className="font-medium">Semestre</span><br />{dados.semestre}</p>
        )}
        {membrosLista.length > 0 && (
          <>
            <p className="font-medium pt-2">Membros</p>
            <ul className="list-disc list-inside ml-4 text-gray-600">
              {membrosLista.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-[#782E29] hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>Editar</span>
        </button>
      </div>
    </div>
  );
};

const ProjetoAtualCard: React.FC<{ projeto: ProjetoAtual | null }> = ({ projeto }) => {
  if (!projeto) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800">Projeto Atual</h3>
        </div>
        <p className="text-sm text-gray-500">Seu grupo ainda não está vinculado a um projeto ativo.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-800">Projeto Atual</h3>
      </div>

      <p className="font-medium text-gray-800">{projeto.demanda}</p>
      <p className="text-sm text-gray-600 mb-1">Empreendedor: {projeto.empreendedor}</p>
      <p className="text-sm text-gray-600 mb-3">Início: {new Date(projeto.dataInicio).toLocaleDateString('pt-BR')}</p>

      <div className="flex items-center space-x-4 text-sm mb-6">
        <span className="bg-[#c6d8e2] text-[#5F747F] px-2 py-0.5 rounded-full font-medium">
          {projeto.status}
        </span>
      </div>

      <div className="flex space-x-3">
        <button className="bg-[#782E29] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#6d2823] transition-colors">
          Fazer Entrega
        </button>
        <button className="bg-[#5F747F] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#53656e] transition-colors">
          Ver detalhes
        </button>
      </div>
    </div>
  );
};

const CandidaturasGrupo: React.FC<{ candidaturas: Candidatura[] }> = ({ candidaturas }) => {
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 4;
  const totalPaginas = Math.max(1, Math.ceil(candidaturas.length / itensPorPagina));
  const slice = candidaturas.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md flex flex-col justify-between" style={{ minHeight: '18rem' }}>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">Candidaturas</h3>
        <p className="text-sm text-gray-600 mb-4">Projetos para os quais seu grupo se candidatou</p>

        {candidaturas.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhuma candidatura enviada ainda.</p>
        ) : (
          <div className="space-y-3">
            {slice.map((c) => (
              <div key={c.id} className="border border-gray-200 rounded-md p-3">
                <p className="font-medium text-gray-800 mb-2 text-sm">{c.demanda}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusCandidaturaCor(c.status)}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {candidaturas.length > itensPorPagina && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button onClick={() => setPagina(p => p - 1)} disabled={pagina === 1} className={`text-gray-500 ${pagina === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-medium select-none">{pagina} <span className="text-gray-400 text-sm font-normal">/ {totalPaginas}</span></span>
          <button onClick={() => setPagina(p => p + 1)} disabled={pagina === totalPaginas} className={`text-gray-500 ${pagina === totalPaginas ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

const HistoricoEntregas: React.FC<{ entregas: Entrega[] }> = ({ entregas }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Histórico de Entregas</h3>

      {entregas.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma entrega registrada ainda.</p>
      ) : (
        <div className="space-y-4">
          {entregas.map((e) => (
            <div key={e.id} className="flex justify-between items-start border-b border-gray-200 pb-3">
              <div>
                <p className="font-medium text-gray-800">{e.descricao}</p>
                <p className="text-sm text-gray-500 mb-1">{e.data}</p>
                {e.link && (
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#5F747F] underline hover:text-[#021926] transition-colors"
                  >
                    Ver entrega
                  </a>
                )}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ml-4 ${statusEntregaCor(e.status)}`}>
                {e.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MetricasGrupo: React.FC<{ metricas: Metricas }> = ({ metricas }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-md text-center">
        <p className="text-3xl font-bold text-[#5F747F]">{metricas.totalCandidaturasEnviadas}</p>
        <p className="text-sm text-gray-600 mt-1">Candidaturas Enviadas</p>
      </div>
      <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-md text-center">
        <p className="text-3xl font-bold text-[#782E29]">{metricas.candidaturasAceitas}</p>
        <p className="text-sm text-gray-600 mt-1">Projetos Aprovados</p>
      </div>
    </div>
  );
};

// ── Componente principal ──────────────────────────────────────────────────────

const DashboardGrupo: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardDados | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await getGrupoDashboard();
        setDashboard(dados);
      } catch {
        setErro('Não foi possível carregar o dashboard. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
        <p className="text-gray-500">Carregando dashboard...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
        <p className="text-red-600">{erro}</p>
      </div>
    );
  }

  if (!dashboard) return null;

  return (
    <div className="flex flex-col items-center w-full bg-[#F1F7EE] py-10 pb-20 font-sans">
      <div className="w-11/12 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          Dashboard do Grupo {dashboard.grupo}
        </h1>
        <p className="text-base text-gray-600 text-center mb-8">
          Gerencie seu grupo e acompanhe o progresso do projeto
        </p>

        <MetricasGrupo metricas={dashboard.metricas} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-8">
            <ProjetoAtualCard projeto={dashboard.projetoAtual} />
            <HistoricoEntregas entregas={dashboard.entregas} />
          </div>

          {/* Coluna lateral */}
          <div className="lg:col-span-1 space-y-8">
            <InformacoesGrupo dados={dashboard} />
            <CandidaturasGrupo candidaturas={dashboard.candidaturas} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrupo;