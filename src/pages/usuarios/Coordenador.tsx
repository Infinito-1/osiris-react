import React from "react";

const TabsNavegacao = () => {
  return (
    <div className="flex w-full bg-[#A7ACA6] rounded-md p-1">
      <button className="flex-1 py-2 bg-white text-gray-800 rounded-md font-medium shadow-sm text-sm">
        Demandas Pendentes
      </button>

      <button className="flex-1 py-2 text-gray-200 font-medium text-sm">
        Em Andamento
      </button>

      <button className="flex-1 py-2 text-gray-200 font-medium text-sm">
        Concluídos
      </button>
    </div>
  );
};

const CardDemanda = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow">
      <div className="flex justify-between mb-2">
        <h3 className="text-xl font-semibold text-gray-900">
          App de Gestão de Academia
        </h3>

        <span className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
          Pendente
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-1">
        Aplicativo para controle de treinos e frequência de alunos
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
        <div>
          <p className="font-semibold">Empreendedora</p>
          <p>Raquel Queiroz</p>
        </div>

        <div>
          <p className="font-semibold">Empresa</p>
          <p>Super Fit</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 mt-4">
        <span className="bg-[#021926] text-white text-xs px-2 py-1 rounded">
          App Mobile
        </span>
        <p className="text-xs text-gray-600">Submetido em: 18/05/2024</p>
      </div>

      <button className="w-full bg-[#782E29] text-white py-2 rounded-md mt-6 hover:bg-[#6a2623] transition">
        Analisar e Classificar
      </button>
    </div>
  );
};

const MinhasInformacoes = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Minhas Informações
      </h3>

      <p className="text-sm mb-3">
        <span className="font-semibold text-gray-700">Nome</span>
        <br /> Professora Bruna
      </p>

      <p className="text-sm mb-3">
        <span className="font-semibold text-gray-700">Email</span>
        <br /> bruna.s@gmail.com
      </p>

      <p className="text-sm">
        <span className="font-semibold text-gray-700">Departamento</span>
        <br /> Coordenação de T.I
      </p>
    </div>
  );
};

const EstatisticasGerais = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow space-y-3">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Estatísticas Gerais
      </h3>

      <button className="w-full py-2 bg-[#B88A8A] text-gray-900 rounded-md flex justify-between px-4">
        <span>Demandas Pendentes</span> <span>3</span>
      </button>

      <button className="w-full py-2 bg-[#6F7C85] text-white rounded-md flex justify-between px-4">
        <span>Em Andamento</span> <span>3</span>
      </button>

      <button className="w-full py-2 bg-[#B3B4B4] text-gray-900 rounded-md flex justify-between px-4">
        <span>Concluído</span> <span>3</span>
      </button>
    </div>
  );
};

const Relatorios = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow space-y-3">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Relatórios</h3>

      <button className="w-full py-2 border border-[#782E29] text-[#782E29] rounded-md">
        Relatório Mensal
      </button>

      <button className="w-full py-2 border border-gray-400 text-gray-800 rounded-md">
        Relatório Semestral
      </button>
    </div>
  );
};

export default function DashboardCoordenador() {
  return (
    <main className="w-full flex flex-col items-center bg-[#E8F0E2] py-12">
      <div className="w-11/12 max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-1">
          Dashboard do Coordenador
        </h1>

        <p className="text-center text-gray-700 mb-8">
          Gerencie demandas e acompanhe projetos do curso
        </p>

        <div className="lg:col-span-2">
          <TabsNavegacao />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          <div className="lg:col-span-2 space-y-6">
            <CardDemanda />
            <CardDemanda />
            <CardDemanda />
          </div>

          <div className="space-y-6 self-start">
            <MinhasInformacoes />
            <EstatisticasGerais />
            <Relatorios />
          </div>
        </div>
      </div>
    </main>
  );
}
