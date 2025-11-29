import { useNavigate } from "react-router-dom";

// --- Componentes de UI Reutilizáveis ---

// Badge de Status
const StatusBadge = ({ text }: { text: string }) => (
  <span className="bg-[#40531D] text-white text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide">
    {text}
  </span>
);

// Badge de Complexidade
const ComplexityBadge = ({ text }: { text: string }) => (
  <span className="bg-[#8B3A3A] text-white text-[10px] px-4 py-1 rounded-full font-medium">
    {text}
  </span>
);

// Barra de Abas
const TabsNavegacao = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full bg-[#9FA39E] rounded-md p-1 shadow-sm">
      <button
        className="flex-1 py-2 text-white font-medium text-sm hover:bg-white/10 rounded transition-colors"
        onClick={() => navigate("/coordenador")}
      >
        Demandas Pendentes
      </button>

      <button
        className="flex-1 py-2 text-white font-medium text-sm hover:bg-white/10 rounded transition-colors"
        onClick={() => navigate("/coordenadorEmAndamento")}
      >
        Em Andamento
      </button>

      <button className="flex-1 py-2 bg-white text-gray-900 rounded-md font-medium shadow-sm text-sm transition-all">
        Concluídos
      </button>
    </div>
  );
};

// --- Card Principal ---

const CardConcluido = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900">
          App de Gestão de Academia
        </h3>
        <StatusBadge text="Concluído" />
      </div>

      <p className="text-gray-600 text-sm mb-8">
        Aplicativo para controle de treinos e frequência de alunos
      </p>

      {/* Grid de Detalhes */}
      <div className="flex flex-wrap gap-12">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-2">Complexidade</p>
          <ComplexityBadge text="Intermediário" />
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Semestre</p>
          <p className="font-bold text-gray-900 text-lg">5º</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Nota Final</p>
          <p className="font-bold text-gray-900 text-lg">9.5</p>
        </div>
      </div>
    </div>
  );
};

// --- Sidebar Components ---

const MinhasInformacoes = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Minhas Informações
      </h3>

      <div className="space-y-4 text-sm">
        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Nome
          </p>
          <p className="font-medium text-gray-900">Professora Bruna</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Email
          </p>
          <p className="font-medium text-gray-900">bruna.s@gmail.com</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Departamento
          </p>
          <p className="font-medium text-gray-900">Coordenação de T.I</p>
        </div>
      </div>
    </div>
  );
};

const EstatisticasGerais = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Estatísticas Gerais
      </h3>

      {/* Barra Marrom/Rosada */}
      <div className="w-full py-2 bg-[#BC9595] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
        <span>Demandas Pendentes</span> <span>3</span>
      </div>

      {/* Barra Cinza Escuro */}
      <div className="w-full py-2 bg-[#7D888F] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
        <span>Em Andamento</span> <span>3</span>
      </div>

      {/* Barra Cinza */}
      <div className="w-full py-2 bg-[#A6ACB1] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
        <span>Concluído</span> <span>3</span>
      </div>
    </div>
  );
};

const Relatorios = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Relatórios</h3>

      <button className="w-full py-2 border border-[#782E29] text-[#782E29] rounded hover:bg-red-50 transition-colors text-sm font-medium">
        Relatório Mensal
      </button>

      <button className="w-full py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
        Relatório Semestral
      </button>
    </div>
  );
};

// --- Componente Principal ---

export default function CoordenadorConcluidas() {
  return (
    <main className="w-full min-h-screen bg-[#E8F0E2] py-10 font-sans">
      <div className="w-11/12 max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
            Dashboard do Coordenador
          </h1>
          <p className="text-gray-600 font-light">
            Gerencie demandas e acompanhe projetos do curso
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* COLUNA ESQUERDA */}
          <div className="lg:col-span-2">
            <TabsNavegacao />

            {/* Lista de Cards */}
            <div className="mt-6">
              <CardConcluido />
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div className="space-y-6">
            <MinhasInformacoes />
            <EstatisticasGerais />
            <Relatorios />
          </div>
        </div>
      </div>
    </main>
  );
}
