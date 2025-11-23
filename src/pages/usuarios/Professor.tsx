import React from "react";
import { useNavigate } from "react-router-dom";

// Ícone de Enviar gerado de modo genérico por enquanto, TODO: substituir por icone do lucid.
const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

// Interface para definir os tipos das propriedades do Badge
interface BadgeProps {
  text: string;
  color: "brown" | "dark";
}

// Componente de Badge
const Badge = ({ text, color }: BadgeProps) => {
  // Definição direta das classes baseada na prop 'color'
  // Se for 'brown' usa a cor marrom, caso contrário usa a cor escura (padrão)
  const colorClasses =
    color === "brown" ? "bg-[#782E29] text-white" : "bg-[#021926] text-white";

  return (
    <span
      className={`${colorClasses} text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide`}
    >
      {text}
    </span>
  );
};

// Card Interno de Grupo
const CardGrupoInterno = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4 hover:border-gray-300 transition-colors shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-900">Os Fulaninhos</h3>
        <Badge text="Em Andamento" color="brown" />
      </div>

      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p>Representante: Pedro Alves - 4 membros - 3º semestre</p>
        <p>
          <span className="font-semibold text-gray-800">Projeto:</span> Sistema
          de Gestão para Padaria
        </p>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50 transition">
          Ver Detalhes
        </button>
        <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50 transition">
          Agendar Reunião
        </button>
      </div>
    </div>
  );
};

// Card Interno de Projeto Entregue - Tipo 1 (Com avaliação pendente)
const CardProjetoPendente = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-900">Projeto II</h3>
        <Badge text="Pendente" color="dark" />
      </div>

      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p>Grupo Teste - App Yoga Mobile</p>
        <p>
          <span className="font-semibold text-gray-800">Entregue em:</span>{" "}
          19/05/2025
        </p>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50 transition">
          Visualizar Projeto
        </button>
        <button
          className="flex-1 bg-[#782E29] border border-[#782E29] text-white py-2 rounded text-sm font-medium hover:bg-[#6a2623] transition shadow-sm"
          onClick={() => navigate("/professorAvaliar")}
        >
          Avaliar
        </button>
      </div>
    </div>
  );
};

// Card Interno de Projeto Entregue - Tipo 2 (Concluído)
const CardProjetoConcluido = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-900">Projeto Final</h3>
        <Badge text="Concluído" color="brown" />
      </div>

      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p>Grupo Teste II - Site de Roupa</p>
        <p>
          <span className="font-semibold text-gray-800">Entregue em:</span>{" "}
          23/05/2025
        </p>
        <p>
          <span className="font-semibold text-gray-800">Nota:</span> 9.0
        </p>
      </div>

      <div className="w-full md:w-1/2">
        <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50 transition">
          Visualizar Projeto
        </button>
      </div>
    </div>
  );
};

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
          <p className="font-medium text-gray-900">Professor Arthur</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Email
          </p>
          <p className="font-medium text-gray-900">arthur.7@gmail.com</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Departamento
          </p>
          <p className="font-medium text-gray-900">Estrutura de Dados</p>
        </div>
      </div>
    </div>
  );
};

const Estatisticas = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Estatísticas Gerais
      </h3>

      <div className="w-full py-2 bg-[#B88A8A] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
        <span>Grupos Orientando</span> <span>2</span>
      </div>

      <div className="w-full py-2 bg-[#6F7C85] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
        <span>Entregas Pendentes</span> <span>1</span>
      </div>

      <div className="w-full py-2 bg-[#B3B4B4] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
        <span>Aprovadas</span> <span>1</span>
      </div>
    </div>
  );
};

const Lembretes = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Lembretes Enviados
      </h3>

      <div className="space-y-3">
        <div className="border border-gray-200 rounded p-3">
          <p className="font-bold text-gray-800 text-sm mb-1">
            Grupo Infinito - 1
          </p>
          <p className="text-gray-600 text-xs">
            Reunião de orientação sexta-feira às 14h
          </p>
          <p className="text-gray-500 text-xs mt-1">19/05/2025</p>
        </div>

        <div className="border border-gray-200 rounded p-3">
          <p className="font-bold text-gray-800 text-sm mb-1">
            Todos os Grupos
          </p>
          <p className="text-gray-600 text-xs">Prazo de entrega: 30/11/2025</p>
          <p className="text-gray-500 text-xs mt-1">17/05/2025</p>
        </div>
      </div>
    </div>
  );
};

export default function DashboardProfessor() {
  const navigate = useNavigate();
  return (
    <main className="w-full min-h-screen bg-[#E8F0E2] py-10 font-sans">
      <div className="w-11/12 max-w-6xl mx-auto">
        {/* Header Principal */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
            Dashboard do Professor
          </h1>
          <p className="text-gray-600 font-light">
            Oriente grupos e acompanhe entregas
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* COLUNA ESQUERDA */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sessão Grupos Orientando */}
            <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#021926]">
                  Grupos Orientando
                </h2>
                <p className="text-sm text-gray-500">
                  Grupos sob sua orientação
                </p>
              </div>
              <CardGrupoInterno />
              <CardGrupoInterno />
            </section>

            {/* Projetos Entregues */}
            <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#021926]">
                  Projetos Entregues
                </h2>
                <p className="text-sm text-gray-500">
                  Entregas aguardando avaliação e já avaliadas
                </p>
              </div>
              <CardProjetoPendente />
              <CardProjetoConcluido />
            </section>
          </div>

          {/* COLUNA DIREITA */}
          <div className="space-y-6">
            {/* Botão de Ação Principal */}
            <button
              className="w-full bg-[#782E29] hover:bg-[#632420] text-white py-3 px-4 rounded-md shadow flex items-center justify-center gap-2 transition"
              onClick={() => navigate("/professorLembrete")}
            >
              <SendIcon />
              <span className="font-medium">Enviar Lembrete</span>
            </button>

            <MinhasInformacoes />
            <Estatisticas />
            <Lembretes />
          </div>
        </div>
      </div>
    </main>
  );
}
