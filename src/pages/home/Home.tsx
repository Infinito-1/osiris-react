import React, { useState, useMemo, useEffect, useRef } from "react";
import foguete from "../../assets/img/icones/foguete.svg";
import send from "../../assets/img/icones/send.svg";
import EllipseCadastro from "../../assets/img/icones/Ellipse cadastro.svg";
import EllipseDescoberta from "../../assets/img/icones/Ellipse descoberta.svg";
import EllipseExecucao from "../../assets/img/icones/Ellipse execucao.svg";
import EllipseConexao from "../../assets/img/icones/Ellipse conexao.svg";
import CarrosselHome from "../../components/carrosselHome/CarrosselHome";
import FiltroDemandas from "../../components/filtro/filtroDemandas";
import { useLocation, useNavigate } from "react-router-dom";
import { getGaleriaDemandaOrdenada, getGaleriaDemandas } from "../../services/demanda.service";
import CardDemanda from "../demanda/CardDemanda";
import { useAuth } from "../../hooks/useAuth";

interface Demanda {
  id: number;
  titulo: string;
  empreendedor: string;
  empId?: number;
  tipo: string;
  semestreRecomendado: string | null;
  descricao: string;
}

interface Filtros {
  tipos: string[];
  area: string;
  semestre: string;
}

// ── Botão com tooltip ─────────────────────────────────────────────────────────

const BotaoComTooltip: React.FC<{
  label: string;
  icone: string;
  iconeAlt: string;
  onClick: () => void;
  tooltip?: string;
  className: string;
}> = ({ label, icone, iconeAlt, onClick, tooltip, className }) => {
  const [tooltipVisivel, setTooltipVisivel] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClick() {
    if (tooltip) {
      setTooltipVisivel(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setTooltipVisivel(false), 2500);
    } else {
      onClick();
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`flex items-center space-x-2 py-3 px-5 rounded-lg text-base font-medium transition-colors duration-200 cursor-pointer ${className}`}
      >
        <img src={icone} alt={iconeAlt} className="w-5 h-5" />
        <p>{label}</p>
      </button>
      {tooltip && tooltipVisivel && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded-md px-3 py-2 whitespace-nowrap z-10 shadow-lg">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
};

// ── Componente principal ──────────────────────────────────────────────────────

function Home() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, usuario } = useAuth();

  const [filtros, setFiltros] = useState<Filtros>({
    tipos: [],
    area: "Todas as áreas",
    semestre: "Todos",
  });
  const [demandas, setDemandas] = useState<Demanda[]>([]);
  const [ordem, setOrdem] = useState<'ASC' | 'DESC'>('DESC');

    useEffect(() => {
      getGaleriaDemandas()
        .then(data => {
          setDemandas(data.map((d: any) => ({
            id: d.id,
            titulo: d.nome,
            empreendedor: d.empreendedor?.empresa ?? '—',
            empId: d.empreendedor?.id,
            tipo: d.tipos?.[0] ?? '',
            descricao: d.descricao,
            semestreRecomendado: d.semestreRecomendado,
          })));
        })
        .catch(() => setDemandas([]))
        .finally(() => setLoading(false));
    }, []);

  useEffect(() => {
    getGaleriaDemandaOrdenada(ordem)
      .then(data => {
        setDemandas(data.map((d: any) => ({
          id: d.id,
          titulo: d.nome,
          empreendedor: d.empreendedor?.empresa ?? '—',
          empId: d.empreendedor?.id,
          tipo: d.tipos?.[0] ?? '',
          semestreRecomendado: d.semestreRecomendado,
          descricao: d.descricao,
        })));
      })
      .catch(() => setDemandas([]));
  }, [ordem]);

  const demandasFiltradas = useMemo(() => {
    return demandas.filter(demanda => {
      const tipoMatch = filtros.tipos.length === 0 || filtros.tipos.includes(demanda.tipo);
      const semestreMatch = filtros.semestre === "Todos" ||
        Number(demanda.semestreRecomendado) >= Number(filtros.semestre);
      return tipoMatch && semestreMatch;
    });
  }, [demandas, filtros]);

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  // ── Lógica dos botões ──────────────────────────────────────────────────────

  // Botão "Cadastrar Projeto" — disponível apenas para Grupo
  function getCadastrarProjetoProps() {
    if (!isAuthenticated) {
      return { onClick: () => navigate('/login'), tooltip: undefined };
    }
    if (usuario?.tipo === 'Grupo') {
      return { onClick: () => navigate('/entrega'), tooltip: undefined };
    }
    return {
      onClick: () => {},
      tooltip: 'Disponível apenas para grupos',
    };
  }

  // Botão "Enviar Demanda" — disponível apenas para Empreendedor
  function getEnviarDemandaProps() {
    if (!isAuthenticated) {
      return { onClick: () => navigate('/login'), tooltip: undefined };
    }
    if (usuario?.tipo === 'Empreendedor') {
      return { onClick: () => navigate('/cadastrar_demanda'), tooltip: undefined };
    }
    return {
      onClick: () => {},
      tooltip: 'Disponível apenas para empreendedores',
    };
  }

  const projetoProps = getCadastrarProjetoProps();
  const demandaProps = getEnviarDemandaProps();

  return (
    <div className="w-full min-h-screen">
      <section className="bg-[#021926] p-10">
        <h1 className="text-4xl justify-center font-semibold text-[#DAD4C8] w-[70%] mx-auto text-center md:text-5xl break-words">
          Conectamos <span className="text-[#A33E38]">Empreendedores</span>{" "}
          com <span className="text-[#A33E38]">Estudantes de Tecnologia</span>
        </h1>
        <h2 className="text-[#DAD4C8] text-center py-5 text-2xl w-[80%] mx-auto">
          Plataforma que une demandas reais de negócios com projetos
          acadêmicos da Fatec Zona Leste, criando oportunidades de aprendizado
          prático e soluções inovadoras.
        </h2>

        <div className="flex gap-4 mt-2 justify-center max-[500px]:flex-wrap">
          <BotaoComTooltip
            label="Cadastrar Projeto"
            icone={foguete}
            iconeAlt="Cadastrar Projeto"
            onClick={projetoProps.onClick}
            tooltip={projetoProps.tooltip}
            className="bg-[#5F747F] text-white hover:bg-[#556872]"
          />
          <BotaoComTooltip
            label="Enviar Demanda"
            icone={send}
            iconeAlt="Enviar Demanda"
            onClick={demandaProps.onClick}
            tooltip={demandaProps.tooltip}
            className="bg-[#F1F7EE] text-[#000000] hover:bg-[#c4c9c2]"
          />
        </div>
      </section>

      <section className="bg-[#F1F7EE] py-10">
        <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FiltroDemandas onFiltroChange={setFiltros} currentFiltros={filtros} />
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6 max-[500px]:flex-wrap">
              <h2 className="text-2xl font-semibold text-gray-800">
                Demandas Disponíveis ({demandasFiltradas.length})
              </h2>
              <select
                value={ordem}
                onChange={(e) => setOrdem(e.target.value as 'ASC' | 'DESC')}
                className="p-2 border border-gray-300 rounded-md focus:outline-none bg-white cursor-pointer"
              >
                <option value="DESC">Mais recentes</option>
                <option value="ASC">Mais antigas</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {demandasFiltradas.map((demanda) => (
                <CardDemanda key={demanda.id} {...demanda} />
              ))}
            </div>
            {demandasFiltradas.length === 0 && (
              <p className="text-center text-gray-500 text-lg mt-10">
                Nenhum projeto encontrado com os filtros selecionados.
              </p>
            )}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="text-center py-5 bg-[#F1F7EE]">
        <h2 className="text-3xl font-semibold">Como Funciona</h2>
        <p className="w-[50%] mx-auto lg:text-2xl md:text-lg sm:text-sm">
          Um processo simples e eficiente para conectar demandas reais com estudantes talentosos
        </p>
        <div className="mx-[10%] my-10">
          <div className="flex flex-wrap gap-10 justify-center">
            <div className="w-full sm:w-[45%] lg:w-[20%] p-2 hover:scale-110 transition-transform duration-200">
              <img className="size-25 mx-auto" src={EllipseCadastro} />
              <h3 className="font-semibold text-lg">1. Cadastro</h3>
              <p>Empreendedores se cadastram e descrevem suas demandas com detalhes do projeto</p>
            </div>
            <div className="w-full sm:w-[45%] lg:w-[20%] hover:scale-110 transition-transform duration-200">
              <img className="size-25 mx-auto" src={EllipseDescoberta} />
              <h3 className="font-semibold text-lg">2. Descoberta</h3>
              <p>Estudantes exploram projetos usando filtros para encontrar oportunidades ideais</p>
            </div>
            <div className="w-full sm:w-[45%] lg:w-[20%] hover:scale-110 transition-transform duration-200">
              <img className="size-25 mx-auto" src={EllipseConexao} />
              <h3 className="font-semibold text-lg">3. Conexão</h3>
              <p>Grupos de alunos manifestam interesse e iniciam diálogo com empreendedores</p>
            </div>
            <div className="w-full sm:w-[45%] lg:w-[20%] hover:scale-110 transition-transform duration-200">
              <img className="size-25 mx-auto" src={EllipseExecucao} />
              <h3 className="font-semibold text-lg">4. Execução</h3>
              <p>Desenvolvimento colaborativo do projeto</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-5 bg-[#F1F7EE]">
        <h2 className="text-3xl font-semibold">Faça Parte da Plataforma</h2>
        <p className="text-2xl w-[50%] mx-auto mb-2">Escolha como deseja participar do Osiris</p>
        <CarrosselHome />
      </section>
    </div>
  );
}

export default Home;