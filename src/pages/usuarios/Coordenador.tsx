import React from "react";

// --- Componentes de UI - Genéricos ---

// Badge de Status
const StatusBadge = ({ text }: { text: string }) => (
  <span className="border border-gray-300 text-gray-600 text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide bg-white">
    {text}
  </span>
);

// Tag para categorias
const Tag = ({ text }: { text: string }) => (
  <span className="bg-[#021926] text-white text-[10px] px-3 py-1 rounded-full font-medium">
    {text}
  </span>
);

// Barra de Abas
const TabsNavegacao = () => {
  return (
    <div className="flex w-full bg-[#A7ACA6] rounded-md p-1 shadow-sm">
      <button className="flex-1 py-2 bg-white text-gray-900 rounded-md font-medium shadow-sm text-sm transition-all">
        Demandas Pendentes
      </button>

      <button className="flex-1 py-2 text-white font-medium text-sm hover:bg-white/10 rounded transition-colors">
        Em Andamento
      </button>

      <button className="flex-1 py-2 text-white font-medium text-sm hover:bg-white/10 rounded transition-colors">
        Concluídos
      </button>
    </div>
  );
};

// --- Cards Principais ---

const CardDemanda = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4 hover:border-gray-300 transition-colors">
      {/* Cabeçalho do Card */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900">
          App de Gestão de Academia
        </h3>
        <StatusBadge text="Pendente" />
      </div>

      <p className="text-gray-600 text-sm mb-5">
        Aplicativo para controle de treinos e frequência de alunos
      </p>

      {/* Grid de Informações*/}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Empreendedor
          </p>
          <p className="font-medium text-gray-900 text-sm">Raquel Queiroz</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Empresa
          </p>
          <p className="font-medium text-gray-900 text-sm">Super Fit</p>
        </div>
      </div>

      {/* Rodapé do Card */}
      <div className="flex items-center gap-3 mb-6">
        <Tag text="App Mobile" />
        <span className="text-xs text-gray-500">Submetido em: 18/05/2024</span>
      </div>

      {/* Botão de Ação */}
      <button className="w-full bg-[#782E29] hover:bg-[#5e231f] text-white py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm">
        Analisar e Classificar
      </button>
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

      {/* Barra Pendentes */}
      <div className="w-full py-2 bg-[#BC9595] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
        <span>Demandas Pendentes</span> <span>3</span>
      </div>

      {/* Barra em Andamento */}
      <div className="w-full py-2 bg-[#7D888F] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
        <span>Em Andamento</span> <span>3</span>
      </div>

      {/* Barra Concluído */}
      <div className="w-full py-2 bg-[#A6ACB1] text-gray-900 rounded flex justify-between px-4 font-medium text-sm box-border">
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

export default function DashboardCoordenador() {
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

            <div className="mt-6">
              <CardDemanda />
              <CardDemanda />
              <CardDemanda />
            </div>
          </div>

          {/* COLUNA DIREITA (Sidebar) */}
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
