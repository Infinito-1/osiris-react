import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardCoordenador, getDemandasPendentes, aprovarDemanda, classificarDemanda } from "../../services/coordenador.service";

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface Metricas {
  demandasPendentesDeAprovacao: number;
  demandasPublicadasGaleria: number;
  totalDeCandidaturasSubmetidas: number;
}

interface DashboardDados {
  coordenador: string;
  metricas: Metricas;
}

interface Demanda {
  demIntId: number;
  demStrNome: string;
  demStrDescricao: string;
  demBoolAceitacao: boolean;
  demBoolAtivo: boolean;
  demStrSemestreRecomendado: string | null;
  demStrAreaTecnica: string | null;
  demStrTipagem: string | null;
  empreendedor?: {
    empStrEmpresa: string;
    usuario?: { usuStrNome: string; usuStrEmail: string };
  };
}

// ── Subcomponentes ────────────────────────────────────────────────────────────

const Tag = ({ text }: { text: string }) => (
  <span className="bg-[#021926] text-white text-[10px] px-3 py-1 rounded-full font-medium">
    {text}
  </span>
);

const TabsNavegacao = ({ aba, setAba }: { aba: string; setAba: (a: string) => void }) => {
  const tabs = [
    { key: 'pendentes', label: 'Demandas Pendentes' },
    { key: 'ativas', label: 'Em Andamento' },
    { key: 'concluidas', label: 'Concluídos' },
  ];

  return (
    <div className="flex w-full bg-[#4f534e] rounded-md p-1 shadow-sm">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setAba(key)}
          className={`flex-1 py-2 text-sm font-medium rounded transition-all ${
            aba === key ? 'bg-white text-gray-900 shadow-sm' : 'text-white hover:bg-white/10'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const CardDemanda = ({ demanda, onAprovar, onClassificar }: {
  demanda: Demanda;
  onAprovar: (id: number) => void;
  onClassificar: (id: number) => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900">{demanda.demStrNome}</h3>
        <span className="border border-gray-300 text-gray-600 text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide bg-white">
          {demanda.demBoolAceitacao ? 'Aprovada' : 'Pendente'}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{demanda.demStrDescricao}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {demanda.empreendedor && (
          <>
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Empreendedor</p>
              <p className="font-medium text-gray-900 text-sm">{demanda.empreendedor.usuario?.usuStrNome}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Empresa</p>
              <p className="font-medium text-gray-900 text-sm">{demanda.empreendedor.empStrEmpresa}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {demanda.demStrTipagem && <Tag text={demanda.demStrTipagem} />}
        {demanda.demStrSemestreRecomendado && <Tag text={`${demanda.demStrSemestreRecomendado}º Sem`} />}
        {demanda.demStrAreaTecnica && <Tag text={demanda.demStrAreaTecnica} />}
      </div>

      <div className="flex gap-3">
        {!demanda.demStrSemestreRecomendado && (
          <button
            className="flex-1 bg-[#782e29] hover:bg-[#5e231f] active:scale-95 text-white py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm"
            onClick={() => navigate(`/classificar_demanda?id=${demanda.demIntId}`)}
          >
            Classificar
          </button>
        )}
        {demanda.demStrSemestreRecomendado && !demanda.demBoolAceitacao && (
          <button
            className="flex-1 bg-[#40531D] hover:bg-[#344418] active:scale-95 text-white py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm"
            onClick={() => onAprovar(demanda.demIntId)}
          >
            Aprovar
          </button>
        )}
      </div>
    </div>
  );
};

const MinhasInformacoes = ({ dados }: { dados: DashboardDados | null }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <h3 className="text-lg font-bold text-gray-900 mb-4">Minhas Informações</h3>
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Curso</p>
        <p className="font-medium text-gray-900">{dados?.coordenador ?? '—'}</p>
      </div>
    </div>
  </div>
);

const EstatisticasGerais = ({ metricas }: { metricas: Metricas | null }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
    <h3 className="text-lg font-bold text-gray-900 mb-2">Estatísticas Gerais</h3>
    <div className="w-full py-2 bg-[#BC9595] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
      <span>Demandas Pendentes</span>
      <span>{metricas?.demandasPendentesDeAprovacao ?? 0}</span>
    </div>
    <div className="w-full py-2 bg-[#7D888F] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
      <span>Em Andamento</span>
      <span>{metricas?.demandasPublicadasGaleria ?? 0}</span>
    </div>
    <div className="w-full py-2 bg-[#A6ACB1] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
      <span>Candidaturas</span>
      <span>{metricas?.totalDeCandidaturasSubmetidas ?? 0}</span>
    </div>
  </div>
);

// ── Componente principal ──────────────────────────────────────────────────────

export default function DashboardCoordenador() {
  const [dashboard, setDashboard] = useState<DashboardDados | null>(null);
  const [demandas, setDemandas] = useState<Demanda[]>([]);
  const [aba, setAba] = useState('pendentes');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const [dashData, demandasData] = await Promise.all([
          getDashboardCoordenador(),
          getDemandasPendentes(),
        ]);
        setDashboard(dashData);
        setDemandas(demandasData);
      } catch {
        setErro('Não foi possível carregar o dashboard.');
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  async function handleAprovar(id: number) {
    try {
      await aprovarDemanda(id);
      setDemandas(prev => prev.map(d =>
        d.demIntId === id ? { ...d, demBoolAceitacao: true } : d
      ));
    } catch {
      alert('Erro ao aprovar demanda.');
    }
  }

  function handleClassificar(id: number) {
    // navegação tratada dentro do CardDemanda
  }

  const demandasFiltradas = demandas.filter(d => {
    if (aba === 'pendentes') return !d.demBoolAceitacao;
    if (aba === 'ativas') return d.demBoolAceitacao && d.demBoolAtivo;
    return false; // concluídas — endpoint futuro
  });

  if (loading) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-gray-500">Carregando dashboard...</p>
    </div>
  );

  if (erro) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-red-600">{erro}</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#F1F7EE] py-10 font-sans">
      <div className="w-11/12 max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
            Dashboard do Coordenador
          </h1>
          <p className="text-gray-600 font-light">Gerencie demandas e acompanhe projetos do curso</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <TabsNavegacao aba={aba} setAba={setAba} />

            <div className="mt-6">
              {demandasFiltradas.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 shadow-sm">
                  Nenhuma demanda nesta categoria.
                </div>
              ) : (
                demandasFiltradas.map(d => (
                  <CardDemanda
                    key={d.demIntId}
                    demanda={d}
                    onAprovar={handleAprovar}
                    onClassificar={handleClassificar}
                  />
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <MinhasInformacoes dados={dashboard} />
            <EstatisticasGerais metricas={dashboard?.metricas ?? null} />
          </div>
        </div>
      </div>
    </div>
  );
}