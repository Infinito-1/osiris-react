import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardEmpreendedor } from "../../services/empreendedores.service";

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface Demanda {
  id: number;
  nome: string;
  descricao: string;
  ativo: boolean;
  aceitacao: boolean;
  semestreRecomendado: string | null;
  areaTecnica: string | null;
  tipos: string[];
  totalCandidaturas: number;
  grupos: string[];
}

interface Metricas {
  totalDemandasSubmetidas: number;
  demandasPublicadasNaGaleria: number;
  demandasEmAnalisePeloCoordenador: number;
  propostasDeGruposRecebidas: number;
}

interface DashboardDados {
  empresa: string;
  cnpj: string;
  nome: string;
  email: string;
  metricas: Metricas;
  demandas: {
    pendentes: Demanda[];
    emAndamento: Demanda[];
    concluidas: Demanda[];
  };
}

type Aba = "pendentes" | "emAndamento" | "concluidas";

// ── Ícones ────────────────────────────────────────────────────────────────────

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

// ── Subcomponentes ────────────────────────────────────────────────────────────

const StatusBadge = ({ aba }: { aba: Aba }) => {
  const map = {
    pendentes:    { label: "Em Análise",  cls: "border border-gray-300 text-gray-600 bg-white" },
    emAndamento:  { label: "Em Andamento", cls: "bg-[#550B0B] text-white" },
    concluidas:   { label: "Concluído",   cls: "bg-[#40531D] text-white" },
  };
  const { label, cls } = map[aba];
  return (
    <span className={`text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide ${cls}`}>
      {label}
    </span>
  );
};

const Tag = ({ text }: { text: string }) => (
  <span className="bg-[#021926] text-white text-[10px] px-3 py-1 rounded-full font-medium">
    {text}
  </span>
);

const CardDemanda = ({ demanda, aba }: { demanda: Demanda; aba: Aba }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xl font-bold text-gray-900">{demanda.nome}</h3>
      <StatusBadge aba={aba} />
    </div>

    <p className="text-gray-600 text-sm mb-4">{demanda.descricao}</p>

    {demanda.tipos.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-4">
        {demanda.tipos.map((t, i) => <Tag key={i} text={t} />)}
        {demanda.semestreRecomendado && <Tag text={demanda.semestreRecomendado} />}
        {demanda.areaTecnica && <Tag text={demanda.areaTecnica} />}
      </div>
    )}

    {aba === "emAndamento" && demanda.grupos.length > 0 && (
      <p className="text-gray-800 text-sm font-medium mb-4">
        Grupo: <span className="font-normal text-gray-600">{demanda.grupos.join(", ")}</span>
      </p>
    )}

    {aba === "concluidas" && demanda.grupos.length > 0 && (
      <p className="text-gray-500 text-base mb-4">
        Grupo: <span className="font-bold text-gray-900">{demanda.grupos.join(", ")}</span>
      </p>
    )}

    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-100 pt-4 mt-2">
      <span className="text-gray-500 text-sm font-medium">
        {demanda.totalCandidaturas} {demanda.totalCandidaturas === 1 ? "grupo interessado" : "grupos interessados"}
      </span>

      <div className="flex gap-3 w-full sm:w-auto">
        {aba === "concluidas" ? (
          <button className="w-full sm:w-auto bg-white border border-gray-400 text-gray-900 py-2 px-4 rounded-md font-bold text-sm hover:bg-gray-50 transition shadow-sm">
            Ver Projeto Final
          </button>
        ) : (
          <>
            <button className="flex items-center justify-center gap-2 px-4 py-1.5 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-50 transition w-full sm:w-auto">
              <EditIcon /> Editar
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-1.5 border border-[#B91C1C] text-[#B91C1C] rounded text-sm font-medium hover:bg-red-50 transition w-full sm:w-auto">
              <TrashIcon /> Excluir
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);

const TabsNavegacao = ({ aba, setAba }: { aba: Aba; setAba: (a: Aba) => void }) => {
  const tabs: { key: Aba; label: string }[] = [
    { key: "pendentes",   label: "Demandas Pendentes" },
    { key: "emAndamento", label: "Em Andamento" },
    { key: "concluidas",  label: "Concluídos" },
  ];

  return (
    <div className="flex w-full bg-[#4f534e] rounded-md p-1 shadow-sm">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setAba(key)}
          className={`flex-1 py-2 text-sm font-medium rounded transition-all ${
            aba === key
              ? "bg-white text-gray-900 shadow-sm"
              : "text-white hover:bg-white/10"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const MinhasInformacoes = ({ dados }: { dados: DashboardDados }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <h3 className="text-lg font-bold text-gray-900 mb-4">Minhas Informações</h3>

    <div className="space-y-4 text-sm mb-4">
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Nome</p>
        <p className="font-medium text-gray-900">{dados.nome}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Email</p>
        <p className="font-medium text-gray-900">{dados.email}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Empresa</p>
        <p className="font-medium text-gray-900">{dados.empresa}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">CNPJ</p>
        <p className="font-medium text-gray-900">{dados.cnpj}</p>
      </div>
    </div>

    <button className="w-full mt-2 border border-gray-300 text-gray-600 py-1.5 rounded text-xs font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
      <EditIcon /> Editar
    </button>
  </div>
);

const Estatisticas = ({ metricas }: { metricas: Metricas }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
    <h3 className="text-lg font-bold text-gray-900 mb-2">Estatísticas</h3>

    <div className="w-full py-2 bg-[#BC9595] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
      <span>Demandas Abertas</span>
      <span>{metricas.demandasEmAnalisePeloCoordenador}</span>
    </div>
    <div className="w-full py-2 bg-[#7D888F] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
      <span>Em Andamento</span>
      <span>{metricas.demandasPublicadasNaGaleria}</span>
    </div>
    <div className="w-full py-2 bg-[#A6ACB1] text-gray-800 rounded flex justify-between px-4 font-medium text-sm">
      <span>Propostas Recebidas</span>
      <span>{metricas.propostasDeGruposRecebidas}</span>
    </div>
  </div>
);

// ── Componente principal ──────────────────────────────────────────────────────

export default function DashboardEmpreendedor() {
  const navigate = useNavigate();
  const [dados, setDados] = useState<DashboardDados | null>(null);
  const [aba, setAba] = useState<Aba>("pendentes");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const data = await getDashboardEmpreendedor();
        setDados(data);
      } catch {
        setErro("Não foi possível carregar o dashboard.");
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

  if (erro || !dados) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
        <p className="text-red-600">{erro || "Erro ao carregar dados."}</p>
      </div>
    );
  }

  const demandasDaAba = dados.demandas[aba];

  return (
    <div className="w-full min-h-screen bg-[#F1F7EE] py-10 font-sans">
      <div className="w-11/12 max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
            Dashboard do Empreendedor
          </h1>
          <p className="text-gray-600 font-light">Gerencie suas demandas e projetos</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Coluna esquerda */}
          <div className="lg:col-span-2">
            <TabsNavegacao aba={aba} setAba={setAba} />

            <div className="mt-6">
              {demandasDaAba.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 shadow-sm">
                  Nenhuma demanda nesta categoria ainda.
                </div>
              ) : (
                demandasDaAba.map((d) => (
                  <CardDemanda key={d.id} demanda={d} aba={aba} />
                ))
              )}
            </div>
          </div>

          {/* Coluna direita */}
          <div className="space-y-6">
            <button
              onClick={() => navigate("/cadastrar_demanda")}
              className="w-full bg-[#782e29] hover:bg-[#5e231f] active:scale-95 text-white py-3 px-4 rounded-md shadow font-medium transition text-center"
            >
              Nova Demanda
            </button>

            <MinhasInformacoes dados={dados} />
            <Estatisticas metricas={dados.metricas} />
          </div>
        </div>
      </div>
    </div>
  );
}