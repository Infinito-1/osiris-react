import React from "react";
import { useNavigate } from "react-router-dom";

// --- Ícones SVG Inline ---
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

// --- Componentes de UI Reutilizáveis ---

// Badge de Status
const StatusBadge = ({ text }: { text: string }) => (
  <span className="bg-[#40531D] text-white text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide">
    {text}
  </span>
);

// Barra de Abas
const TabsNavegacao = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full bg-[#A7ACA6] rounded-md p-1 shadow-sm">
      <button
        className="flex-1 py-2 text-white font-medium text-sm hover:bg-white/10 rounded transition-colors"
        onClick={() => navigate("/empreendedor")}
      >
        Demandas Pendentes
      </button>

      <button
        className="flex-1 py-2 text-white font-medium text-sm hover:bg-white/10 rounded transition-colors"
        onClick={() => navigate("/empreendedorEmAndamento")}
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
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-2xl font-bold text-gray-900">
          Sistema de Delivery
        </h3>
        <StatusBadge text="Concluído" />
      </div>

      <p className="text-gray-500 text-sm mb-6">
        Plataforma para gerenciar entregas
      </p>

      <p className="text-gray-500 text-base mb-8">
        Grupo: <span className="font-bold text-gray-900">Infinito -1</span>
      </p>

      {/* Botão Outline */}
      <button className="w-full bg-white border border-gray-400 text-gray-900 py-2.5 rounded-md font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">
        Ver Projeto Final
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

      <div className="space-y-4 text-sm mb-4">
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
      </div>

      <button className="w-full mt-2 border border-gray-300 text-gray-600 py-1.5 rounded text-xs font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
        <EditIcon /> Editar
      </button>
    </div>
  );
};

const Estatisticas = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Estatísticas</h3>

      {/* Barra Marrom*/}
      <div className="w-full py-2 bg-[#BC9595] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
        <span>Demandas Abertas</span> <span>3</span>
      </div>

      {/* Barra Cinza Escuro*/}
      <div className="w-full py-2 bg-[#7D888F] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
        <span>Em Andamento</span> <span>3</span>
      </div>

      {/* Barra Cinza Claro*/}
      <div className="w-full py-2 bg-[#A6ACB1] text-gray-800 rounded flex justify-between px-4 font-medium text-sm">
        <span>Concluído</span> <span>3</span>
      </div>
    </div>
  );
};

// --- Componente Principal ---

export default function EmpreendedorConcluidas() {
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

            <div className="mt-6">
              <CardConcluido />
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div className="space-y-6">
            {/* Botão Nova Demanda*/}
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
