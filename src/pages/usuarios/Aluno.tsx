import React from "react";

// 1. Quadro de Avisos
const QuadroAvisos = () => {
  const avisos = [
    {
      title: "Entrega de Projeto",
      subtitle: "Entrega final: 15/06/2024",
      date: "19/05/2025",
    },
    {
      title: "Palestra de Tecnologia",
      subtitle: "Amanhã às 19h no auditório",
      date: "17/05/2025",
    },
    {
      title: "Cadastro de Grupos",
      subtitle: "Grupos podem ser formados até 30/05",
      date: "16/05/2025",
    },
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-800">
          Quadro de avisos
        </h3>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Fique por dentro de lembretes e avisos enviados pela coordenação e
        professores.
      </p>

      <div className="space-y-4">
        {avisos.map((aviso, index) => (
          <div
            key={index}
            className="flex justify-between items-center rounded-md border border-gray-200 p-3"
          >
            <div>
              <p className="font-medium text-gray-800">{aviso.title}</p>
              <p className="text-sm text-gray-600">{aviso.subtitle}</p>
            </div>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-md text-gray-800">
              {aviso.date}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 space-x-6">
        <button className="text-gray-500 hover:text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-medium text-lg">1</span>
        <button className="text-gray-500 hover:text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// 2. Minhas Informações
const MinhasInformacoes = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Minhas Informações
      </h3>

      <div className="text-sm space-y-3">
        <p>
          <span className="font-medium text-gray-700">Nome</span>
          <br /> João Santos
        </p>
        <p>
          <span className="font-medium text-gray-700">Email</span>
          <br /> joao.santos@fatec.sp.gov.br
        </p>
        <p>
          <span className="font-medium text-gray-700">RA</span>
          <br /> 12345678
        </p>
        <p>
          <span className="font-medium text-gray-700">Semestre</span>
          <br /> 5º Semestre
        </p>
      </div>

      <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-2 mt-5 rounded-md hover:bg-gray-100 transition">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span>Editar</span>
      </button>
    </div>
  );
};

// 3. Meu Grupo
const MeuGrupo = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Meu Grupo</h3>

      <p className="text-sm">
        <span className="font-medium text-gray-700">Nome do Grupo</span>
        <br /> Os Fulaninhos
      </p>

      <p className="text-sm mt-3">
        <span className="font-medium text-gray-700">Membros</span>
        <br /> 4 integrantes
      </p>

      <button className="w-full bg-[#782E29] text-white py-2 rounded-md mt-5 hover:bg-[#6a2623] transition">
        Acessar Dashboard do Grupo
      </button>
    </div>
  );
};

// 4. Meu Portfólio
const MeuPortfolio = () => {
  const projetos = [
    {
      title: "Sistema de Gestão para Padaria",
      subtitle: "Sistema web para controle de estoque e vendas",
      note: "Nota: 9.5",
      date: "14/05/2025",
    },
    {
      title: "Sistema de Gestão para Padaria",
      subtitle: "Sistema web para controle de estoque e vendas",
      note: "Nota: 9.5",
      date: "14/05/2025",
    },
    {
      title: "Sistema de Gestão para Padaria",
      subtitle: "Sistema web para controle de estoque e vendas",
      note: "Nota: 9.5",
      date: "14/05/2025",
    },
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        Meu Portfólio
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Demandas disponíveis para novos projetos
      </p>

      <div className="space-y-4">
        {projetos.map((p, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-md p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-800">{p.title}</p>
              <p className="text-sm text-gray-600">{p.subtitle}</p>

              <div className="flex items-center space-x-2 mt-2">
                <span className="bg-[#782E29] text-white text-xs px-2 py-0.5 rounded-md">
                  {p.note}
                </span>
                <p className="text-xs text-gray-600">{p.date}</p>
              </div>
            </div>

            <button className="text-gray-500 hover:text-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Página Principal
const DashboardAluno = () => {
  return (
    <main className="w-full flex flex-col items-center bg-[#E8F0E2] py-12">
      <div className="w-11/12 max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-1">
          Dashboard do Aluno
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Acompanhe seu progresso e gerencie suas informações
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da esquerda */}
          <div className="lg:col-span-2 space-y-8">
            <QuadroAvisos />
            <MeuPortfolio />
          </div>

          {/* Coluna da direita */}
          <div className="space-y-8">
            <MinhasInformacoes />
            <MeuGrupo />

            {/* Botões movidos para fora da seção */}
            <div className="space-y-3">
              <button className="w-full bg-[#021926] text-white py-2 rounded-md hover:bg-[#01121b] transition">
                Cadastrar Grupo
              </button>

              <button className="w-full bg-[#782E29] text-white py-2 rounded-md hover:bg-[#6a2623] transition">
                Grupos com vagas em aberto
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardAluno;
