import React, { useState } from "react";

// --- Subcomponentes ---

// 1. Quadro de Avisos com Carrossel Funcional
const QuadroAvisos: React.FC = () => {
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 3;

  // Dados expandidos para testar o carrossel
  const avisos = [
    // Página 1 (Originais)
    {
      title: "Prazo de Entrega",
      subtitle: "Entrega do MVP: 15/06/2024",
      date: "19/05/2025",
    },
    {
      title: "Novo Membro",
      subtitle: "Ana Lima entrou no grupo",
      date: "17/05/2025",
    },
    {
      title: "Reunião com Orientador",
      subtitle: "Sexta-feira às 14h",
      date: "16/05/2025",
    },
    // Página 2 (Novos)
    {
      title: "Revisão de Código",
      subtitle: "Pull Request #42 pendente",
      date: "15/05/2025",
    },
    {
      title: "Atualização de Docs",
      subtitle: "Diagramas de classe atualizados",
      date: "14/05/2025",
    },
    {
      title: "Testes de Usabilidade",
      subtitle: "Agendado com 5 usuários",
      date: "12/05/2025",
    },
    // Página 3 (Novos)
    {
      title: "Feedback do Cliente",
      subtitle: "Aprovação do protótipo de alta",
      date: "10/05/2025",
    },
    {
      title: "Planejamento da Sprint",
      subtitle: "Definição de backlog da Sprint 4",
      date: "08/05/2025",
    },
    {
      title: "Workshop de Design",
      subtitle: "Alinhamento sobre Design System",
      date: "05/05/2025",
    },
  ];

  const totalPaginas = Math.ceil(avisos.length / itensPorPagina);
  const indiceInicial = (pagina - 1) * itensPorPagina;
  const avisosAtuais = avisos.slice(
    indiceInicial,
    indiceInicial + itensPorPagina
  );

  const irParaProximaPagina = () => {
    if (pagina < totalPaginas) setPagina(pagina + 1);
  };

  const irParaPaginaAnterior = () => {
    if (pagina > 1) setPagina(pagina - 1);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-100 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          {/* Ícone de sino/quadro de avisos */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
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
          {avisosAtuais.map((aviso, index) => (
            <div
              key={`${pagina}-${index}`}
              className="flex justify-between items-center border-b border-gray-200 pb-3 animate-fadeIn"
            >
              <div>
                <p className="font-medium text-gray-800">{aviso.title}</p>
                <p className="text-sm text-gray-600">{aviso.subtitle}</p>
              </div>
              <span className="text-sm text-gray-500">{aviso.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Paginação simples funcional */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={irParaPaginaAnterior}
          disabled={pagina === 1}
          className={`text-gray-500 ${pagina === 1 ? "opacity-50 cursor-not-allowed" : "hover:text-gray-800"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <span className="font-medium select-none">
          {pagina}{" "}
          <span className="text-gray-400 text-sm font-normal">
            / {totalPaginas}
          </span>
        </span>

        <button
          onClick={irParaProximaPagina}
          disabled={pagina === totalPaginas}
          className={`text-gray-500 ${pagina === totalPaginas ? "opacity-50 cursor-not-allowed" : "hover:text-gray-800"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// 2. Informações do Grupo
const InformacoesGrupo: React.FC = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-120">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Informações do Grupo
      </h3>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Nome do Grupo</span>
          <br />
          Os Fulaninhos
        </p>
        <p>
          <span className="font-medium">Representante</span>
          <br />
          Pedro Alves dos Santos
        </p>
        <p>
          <span className="font-medium">RA</span>
          <br />
          12345678
        </p>
        <p>
          <span className="font-medium">Semestre</span>
          <br />
          5º Semestre
        </p>
        <p className="font-medium pt-2">Membros</p>
        <ul className="list-disc list-inside ml-4 text-gray-600">
          <li>Pedro Alves dos Santos</li>
          <li>Ricardo Botelho</li>
          <li>José de Oliveira</li>
          <li>Ana Lima</li>
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-[#782E29] hover:text-white transition-colors">
          {/* Ícone de Lápis/Editar */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <span>Editar</span>
        </button>
      </div>
    </div>
  );
};

// 3. Projeto Atual
const ProjetoAtual: React.FC = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-60">
      <div className="flex items-center space-x-2 mb-4">
        {/* Ícone de Documento/Projeto */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-800">Projeto Atual</h3>
      </div>

      <p className="font-medium text-gray-800">
        Sistema de Gestão para Padaria Local
      </p>
      <p className="text-sm text-gray-600 mb-3">
        Empreendedor: Padaria Pão Quente
      </p>

      <div className="flex items-center space-x-4 text-sm mb-6">
        <span className="bg-[#c6d8e2] text-[#5F747F] px-2 py-0.5 rounded-full font-medium">
          Em Andamento
        </span>
        <p className="text-gray-600">Prazo: 29/04/2026</p>
      </div>

      <div className="flex space-x-3">
        <button className="bg-[#782E29] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[#6d2823]">
          Fazer Entrega
        </button>
        <button className="bg-[#5F747F] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[#53656e]">
          Ver detalhes
        </button>
      </div>
    </div>
  );
};

// 4. Galeria de Demandas com Carrossel Funcional
const GaleriaDemandas: React.FC = () => {
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 3;

  const demandas = [
    // Página 1 (Originais)
    {
      title: "App de Delivery para Restaurante",
      level: "Intermediário",
      semester: "4º Sem",
    },
    {
      title: "App de Delivery para Restaurante",
      level: "Básico",
      semester: "3º Sem",
    },
    {
      title: "App de Delivery para Restaurante",
      level: "Avançado",
      semester: "5º Sem",
    },
    // Página 2 (Novos)
    {
      title: "Sistema de Controle de Estoque",
      level: "Intermediário",
      semester: "4º Sem",
    },
    {
      title: "Landing Page para Startup",
      level: "Básico",
      semester: "2º Sem",
    },
    {
      title: "Plataforma de Cursos Online",
      level: "Avançado",
      semester: "6º Sem",
    },
    // Página 3 (Novos)
    {
      title: "Chatbot para Atendimento",
      level: "Avançado",
      semester: "5º Sem",
    },
    {
      title: "Site Institucional ONG",
      level: "Básico",
      semester: "3º Sem",
    },
    {
      title: "App de Finanças Pessoais",
      level: "Intermediário",
      semester: "4º Sem",
    },
  ];

  const totalPaginas = Math.ceil(demandas.length / itensPorPagina);
  const indiceInicial = (pagina - 1) * itensPorPagina;
  const demandasAtuais = demandas.slice(
    indiceInicial,
    indiceInicial + itensPorPagina
  );

  const irParaProximaPagina = () => {
    if (pagina < totalPaginas) setPagina(pagina + 1);
  };

  const irParaPaginaAnterior = () => {
    if (pagina > 1) setPagina(pagina - 1);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Intermediário":
        return "bg-[#782E29] text-white";
      case "Básico":
        return "bg-[#5F747F] text-white";
      case "Avançado":
        return "bg-[#021926] text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-110 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Galeria de Demandas
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Demandas disponíveis para novos projetos
        </p>

        <div className="space-y-3">
          {demandasAtuais.map((demanda, index) => (
            <div
              key={`${pagina}-${index}`}
              className="border border-gray-200 rounded-md p-3 animate-fadeIn"
            >
              <p className="font-medium text-gray-800 mb-2">{demanda.title}</p>
              <div className="flex space-x-2 text-xs">
                <span
                  className={`${getLevelColor(demanda.level)} px-2 py-0.5 rounded-full font-medium`}
                >
                  {demanda.level}
                </span>
                <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full font-medium">
                  {demanda.semester}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paginação simples funcional */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={irParaPaginaAnterior}
          disabled={pagina === 1}
          className={`text-gray-500 ${pagina === 1 ? "opacity-50 cursor-not-allowed" : "hover:text-gray-800"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <span className="font-medium select-none">
          {pagina}{" "}
          <span className="text-gray-400 text-sm font-normal">
            / {totalPaginas}
          </span>
        </span>

        <button
          onClick={irParaProximaPagina}
          disabled={pagina === totalPaginas}
          className={`text-gray-500 ${pagina === totalPaginas ? "opacity-50 cursor-not-allowed" : "hover:text-gray-800"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// 5. Histórico de Entregas
const HistoricoEntregas: React.FC = () => {
  const entregas = [
    {
      title: "MVP - Versão 1.0",
      date: "09/05/2025",
      status: "Aprovado",
      action: "Upload",
    },
    {
      title: "Protótipo Inicial",
      date: "19/04/2025",
      status: "Revisão Necessária",
      action: "Revisar",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-800";
      case "Revisão Necessária":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-62">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Histórico de Entregas
      </h3>

      <div className="space-y-4">
        {entregas.map((entrega, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 pb-3"
          >
            <div>
              <p className="font-medium text-gray-800">{entrega.title}</p>
              <p className="text-sm text-gray-600">{entrega.date}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`${getStatusColor(entrega.status)} px-2 py-0.5 rounded-full text-xs font-medium`}
              >
                {entrega.status}
              </span>
              <button className="text-gray-500 hover:text-red-800">
                {/* Ícone de Lixeira/Excluir */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Componente Principal do Dashboard ---
const DashboardGrupo: React.FC = () => {
  return (
    <main className="flex flex-col items-center w-full bg-[#F1F7EE] py-10 pb-20 font-sans">
      <div className="w-11/12 max-w-6xl">
        {/* Título Principal */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          Dashboard do Grupo Os Fulaninhos
        </h1>
        <p className="text-base text-gray-600 text-center mb-10">
          Gerencie seu grupo e acompanhe o progresso do projeto
        </p>

        {/* Grid Principal do Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1 (2/3 da largura em telas grandes) */}
          <div className="lg:col-span-2 space-y-8">
            <QuadroAvisos />
            <ProjetoAtual />
            <HistoricoEntregas />
          </div>

          {/* Coluna 2 (1/3 da largura em telas grandes) */}
          <div className="lg:col-span-1 space-y-8">
            <InformacoesGrupo />
            <GaleriaDemandas />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardGrupo;
