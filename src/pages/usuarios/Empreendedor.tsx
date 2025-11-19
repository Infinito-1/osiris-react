import React from "react";

// --- Ícones SVG - gerados de modo genérico. TODO: Trocar por icones do lucid ---

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

// --- Componentes de UI - Genéricos por enquanto ---

// Badge de Status
const StatusBadge = ({ text }: { text: string }) => (
  <span className="border border-gray-300 text-gray-600 text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide bg-white">
    {text}
  </span>
);

// Tag escura (ex: "Sistema Web", "Intermediária")
const Tag = ({ text }: { text: string }) => (
  <span className="bg-[#021926] text-white text-[10px] px-3 py-1 rounded-full font-medium">
    {text}
  </span>
);

// Componente de Barra de Abas
const TabsNavegacao = () => {
  return (
    <div className="flex w-full bg-[#A7ACA6] rounded-md p-1">
      <button className="flex-1 py-2 bg-white text-gray-800 rounded-md font-medium shadow-sm text-sm">
        Demandas Pendentes
      </button>

      <button className="flex-1 py-2 text-gray-200 font-medium text-sm hover:bg-white/10 rounded transition">
        Em Andamento
      </button>

      <button className="flex-1 py-2 text-gray-200 font-medium text-sm hover:bg-white/10 rounded transition">
        Concluídos
      </button>
    </div>
  );
};

// Card de Demanda
const CardDemanda = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-b-lg rounded-tr-lg p-6 mb-4 shadow-sm first:rounded-tl-none">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900">
          Sistema de Gestão de Estoque
        </h3>
        <StatusBadge text="Aberta" />
      </div>

      <p className="text-gray-600 text-sm mb-4">
        Necessito de um sistema para controlar entradas e saídas de produtos.
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Tag text="Sistema Web" />
        <Tag text="Intermediária" />
        <Tag text="3-6 meses" />
      </div>

      {/* Footer do Card */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-100 pt-4 mt-2">
        <span className="text-gray-500 text-sm font-medium">
          3 grupos interessados
        </span>

        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-1.5 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-50 transition w-full sm:w-auto">
            <EditIcon /> Editar
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-1.5 border border-[#B91C1C] text-[#B91C1C] rounded text-sm font-medium hover:bg-red-50 transition w-full sm:w-auto">
            <TrashIcon /> Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Cards da Barra Lateral ---

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
          <p className="font-medium text-gray-900">Carlos Oliveira</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Email
          </p>
          <p className="font-medium text-gray-900">carlos@empresa.com</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Empresa
          </p>
          <p className="font-medium text-gray-900">Padaria Pão Quente</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Telefone
          </p>
          <p className="font-medium text-gray-900">(11) 98765-4321</p>
        </div>

        <button className="w-full mt-2 border border-gray-300 text-gray-600 py-1.5 rounded text-xs font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
          <EditIcon /> Editar
        </button>
      </div>
    </div>
  );
};

const Estatisticas = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Estatísticas</h3>

      {/* Barra Marrom (Demandas Abertas) */}
      <div className="w-full py-2 bg-[#BC9595] text-[#3E1F1F] rounded flex justify-between px-4 font-medium text-sm">
        <span>Demandas Abertas</span> <span>3</span>
      </div>

      {/* Barra Cinza Escuro (Em Andamento) */}
      <div className="w-full py-2 bg-[#7D888F] text-white rounded flex justify-between px-4 font-medium text-sm">
        <span>Em Andamento</span> <span>3</span>
      </div>

      {/* Barra Cinza Claro (Concluído) */}
      <div className="w-full py-2 bg-[#A6ACB1] text-gray-800 rounded flex justify-between px-4 font-medium text-sm">
        <span>Concluído</span> <span>3</span>
      </div>
    </div>
  );
};

// --- Componente Principal ---

export default function DashboardEmpreendedor() {
  return (
    <main className="w-full min-h-screen bg-[#E8F0E2] py-10 font-sans">
      <div className="w-11/12 max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
            Dashboard do Empreendedor
          </h1>
          <p className="text-gray-600 font-light">
            Gerencie suas demandas e projetos
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* COLUNA ESQUERDA */}
          <div className="lg:col-span-2">
            <TabsNavegacao />

            <div className="bg-transparent mt-6">
              <CardDemanda />
              <CardDemanda />
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div className="space-y-6">
            <button className="w-full bg-[#550B0B] hover:bg-[#3f0808] text-white py-3 px-4 rounded-md shadow font-medium transition text-center">
              Nova Demanda
            </button>

            <MinhasInformacoes />
            <Estatisticas />
          </div>
        </div>
      </div>
    </main>
  );
}
