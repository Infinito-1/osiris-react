import { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Ícones SVG Inline ---

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ExternalLinkIcon = () => (
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
    className="text-gray-400"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

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

// --- Componentes Internos ---

// Item de Aviso Individual
const AvisoItem = ({
  title,
  subtitle,
  date,
}: {
  title: string;
  subtitle: string;
  date: string;
}) => (
  <div className="border border-gray-200 rounded-md p-4 flex justify-between items-start bg-white hover:border-gray-300 transition-colors animate-fadeIn">
    <div>
      <h4 className="font-bold text-gray-800 text-sm mb-1">{title}</h4>
      <p className="text-gray-600 text-xs">{subtitle}</p>
    </div>
    <div className="border border-gray-300 rounded px-2 py-1 text-xs font-medium text-gray-700 whitespace-nowrap">
      {date}
    </div>
  </div>
);

// Item de Portfólio
const PortfolioItem = ({
  title,
  subtitle,
  nota,
  date,
}: {
  title: string;
  subtitle: string;
  nota: string;
  date: string;
}) => (
  <div className="border border-gray-200 rounded-md p-4 relative hover:border-gray-300 transition-colors bg-white">
    <div className="absolute top-4 right-4">
      <ExternalLinkIcon />
    </div>

    <h4 className="font-bold text-gray-800 text-sm mb-1 pr-8">{title}</h4>
    <p className="text-gray-600 text-xs mb-3">{subtitle}</p>

    <div className="flex items-center gap-3">
      <span className="bg-[#782E29] text-white text-[10px] px-3 py-0.5 rounded-full font-medium">
        Nota: {nota}
      </span>
      <span className="text-gray-500 text-xs">{date}</span>
    </div>
  </div>
);

// --- Seções Principais ---

const QuadroAvisos = () => {
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 3;

  const todosAvisos = [
    // Página 1
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
    // Página 2
    {
      title: "Workshop de React",
      subtitle: "Laboratório 3 - Vagas limitadas",
      date: "14/05/2025",
    },
    {
      title: "Manutenção do Sistema",
      subtitle: "Indisponibilidade programada: 23h às 02h",
      date: "12/05/2025",
    },
    {
      title: "Resultado Parcial",
      subtitle: "Notas da P1 disponíveis no portal",
      date: "10/05/2025",
    },
    // Página 3
    {
      title: "Feira de Empregabilidade",
      subtitle: "Traga seu currículo impresso",
      date: "05/05/2025",
    },
    {
      title: "Rematrícula",
      subtitle: "Prazo final para ajuste de grade",
      date: "02/05/2025",
    },
    {
      title: "Boas-vindas aos Calouros",
      subtitle: "Apresentação da coordenação",
      date: "28/04/2025",
    },
  ];

  const totalPaginas = Math.ceil(todosAvisos.length / itensPorPagina);
  const indiceInicial = (pagina - 1) * itensPorPagina;
  const avisosAtuais = todosAvisos.slice(
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
    <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm min-h-[420px] flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="text-[#021926]">
            <BellIcon />
          </div>
          <h3 className="text-lg font-bold text-[#021926]">Quadro de avisos</h3>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Fique por dentro de lembretes e avisos enviados pela coordenação e
          professores.
        </p>

        <div className="space-y-3 mb-6">
          {avisosAtuais.map((aviso, index) => (
            <AvisoItem
              key={`${pagina}-${index}`}
              title={aviso.title}
              subtitle={aviso.subtitle}
              date={aviso.date}
            />
          ))}
        </div>
      </div>

      {/* Paginação */}
      <div className="flex justify-center items-center gap-4 text-gray-600">
        <button
          onClick={irParaPaginaAnterior}
          disabled={pagina === 1}
          className={`p-1 rounded-full transition ${pagina === 1 ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100 text-[#021926]"}`}
        >
          <ChevronLeftIcon />
        </button>

        <span className="font-medium text-lg text-[#021926] select-none">
          {pagina}{" "}
          <span className="text-gray-400 text-sm font-normal">
            / {totalPaginas}
          </span>
        </span>

        <button
          onClick={irParaProximaPagina}
          disabled={pagina === totalPaginas}
          className={`p-1 rounded-full transition ${pagina === totalPaginas ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100 text-[#021926]"}`}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </section>
  );
};

const MeuPortfolio = () => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-[#021926] mb-1">Meu Portfólio</h3>
      <p className="text-gray-500 text-sm mb-6">
        Demandas disponíveis para novos projetos
      </p>

      <div className="space-y-4">
        <PortfolioItem
          title="Sistema de Gestão para Padaria"
          subtitle="Sistema web para controle de estoque e vendas"
          nota="9.5"
          date="14/05/2025"
        />
        <PortfolioItem
          title="Sistema de Gestão para Padaria"
          subtitle="Sistema web para controle de estoque e vendas"
          nota="9.5"
          date="14/05/2025"
        />
        <PortfolioItem
          title="Sistema de Gestão para Padaria"
          subtitle="Sistema web para controle de estoque e vendas"
          nota="9.5"
          date="14/05/2025"
        />
      </div>
    </section>
  );
};

const MinhasInformacoes = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-[#021926] mb-4">
        Minhas Informações
      </h3>

      <div className="space-y-4 text-sm mb-6">
        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Nome
          </p>
          <p className="font-medium text-gray-900">João Santos</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Email
          </p>
          <p className="font-medium text-gray-900">
            joao.santos@fatec.sp.gov.br
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            RA
          </p>
          <p className="font-medium text-gray-900">12345678</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Semestre
          </p>
          <p className="font-medium text-gray-900">5º Semestre</p>
        </div>
      </div>

      <button className="w-full border border-gray-300 text-gray-600 py-2 rounded text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition">
        <EditIcon /> Editar
      </button>
    </div>
  );
};

const MeuGrupo = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-[#021926] mb-4">Meu Grupo</h3>

      <div className="space-y-4 text-sm mb-6">
        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Nome do Grupo
          </p>
          <p className="font-medium text-gray-900">Os Fulaninhos</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Membros
          </p>
          <p className="font-medium text-gray-900">4 integrantes</p>
        </div>
      </div>

      <button
        className="w-full bg-[#782E29] hover:bg-[#632420] text-white py-3 rounded-md shadow text-sm font-medium transition text-center"
        onClick={() => navigate("/dashboard_grupo")}
      >
        Acessar Dashboard do Grupo
      </button>
    </div>
  );
};

// --- Componente Principal ---

export default function DashboardAluno() {
  return (
    <main className="w-full min-h-screen bg-[#E8F0E2] py-10 font-sans">
      <div className="w-11/12 max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
            Dashboard do Aluno
          </h1>
          <p className="text-gray-600 font-light">
            Acompanhe seu progresso e gerencie suas informações
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* COLUNA ESQUERDA */}
          <div className="lg:col-span-2 space-y-6">
            <QuadroAvisos />
            <MeuPortfolio />
          </div>

          {/* COLUNA DIREITA */}
          <div className="space-y-6">
            <MinhasInformacoes />
            <MeuGrupo />

            {/* Botões de Ação */}
            <div className="space-y-3">
              <button className="w-full bg-[#021926] hover:bg-[#0f293a] text-white py-3 rounded-md shadow text-sm font-medium transition text-center">
                Cadastrar Grupo
              </button>
              <button className="w-full bg-[#550B0B] hover:bg-[#3f0808] text-white py-3 rounded-md shadow text-sm font-medium transition text-center">
                Grupos com vagas em aberto
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
