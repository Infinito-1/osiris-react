/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect, useRef } from "react";
import CardDemanda from "./CardDemanda";
import foguete from "../../assets/img/icones/foguete.svg";
import send from "../../assets/img/icones/send.svg";
import FiltroDemandas from "../../components/filtro/filtroDemandas";
import {
  getGaleriaDemandaOrdenada,
  getGaleriaDemandas,
} from "../../services/demanda.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface Filtros {
  tipos: string[];
  semestre: string;
}

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

const GaleriaDemanda: React.FC = () => {
  const [filtros, setFiltros] = useState<Filtros>({
    tipos: [],
    semestre: "Todos",
  });

  const [ordem, setOrdem] = useState<"ASC" | "DESC">("DESC");
  const [demandas, setDemandas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, usuario } = useAuth();
  const [busca, setBusca] = useState("");

  useEffect(() => {
    getGaleriaDemandas()
      .then((data) => {
        setDemandas(
          data.map((d: any) => ({
            id: d.id,
            titulo: d.nome,
            empreendedor: d.empreendedor?.empresa ?? "—",
            empId: d.empreendedor?.id,
            tipo: d.tipos?.[0] ?? "",
            descricao: d.descricao,
            semestreRecomendado: d.semestreRecomendado,
          })),
        );
      })
      .catch(() => setDemandas([]))
      .finally(() => setLoading(false));
  }, []);

  const demandasFiltradas = useMemo(() => {
    return demandas.filter((demanda) => {
      const tipoMatch =
        filtros.tipos.length === 0 || filtros.tipos.includes(demanda.tipo);
      const semestreMatch =
        filtros.semestre === "Todos" ||
        Number(demanda.semestreRecomendado) >= Number(filtros.semestre);
      const buscaMatch =
        busca.trim() === "" ||
        demanda.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        demanda.empreendedor.toLowerCase().includes(busca.toLowerCase()) ||
        demanda.descricao.toLowerCase().includes(busca.toLowerCase());
      return tipoMatch && semestreMatch && buscaMatch;
    });
  }, [demandas, filtros, busca]);

  useEffect(() => {
    getGaleriaDemandaOrdenada(ordem)
      .then((data) => {
        setDemandas(
          data.map((d: any) => ({
            id: d.id,
            titulo: d.nome,
            empreendedor: d.empreendedor?.empresa ?? "—",
            empId: d.empreendedor?.id,
            tipo: d.tipos?.[0] ?? "",
            semestreRecomendado: d.semestreRecomendado,
            descricao: d.descricao,
          })),
        );
      })
      .catch(() => setDemandas([]));
  }, [ordem]);

  function getCadastrarProjetoProps() {
    if (!isAuthenticated) {
      return { onClick: () => navigate("/login"), tooltip: undefined };
    }
    if (usuario?.tipo === "Grupo") {
      return { onClick: () => navigate("/entrega"), tooltip: undefined };
    }
    return {
      onClick: () => {},
      tooltip: "Disponível apenas para grupos",
    };
  }

  // Botão "Enviar Demanda" — disponível apenas para Empreendedor
  function getEnviarDemandaProps() {
    if (!isAuthenticated) {
      return { onClick: () => navigate("/login"), tooltip: undefined };
    }
    if (usuario?.tipo === "Empreendedor") {
      return {
        onClick: () => navigate("/cadastrar_demanda"),
        tooltip: undefined,
      };
    }
    return {
      onClick: () => {},
      tooltip: "Disponível apenas para empreendedores",
    };
  }

  const projetoProps = getCadastrarProjetoProps();
  const demandaProps = getEnviarDemandaProps();

  return (
    <div className="w-full min-h-screen bg-[#F1F7EE]">
      <header className="bg-[#021926] text-[#F1F7EE] py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Galeria de Demandas</h1>
        <div className="w-11/12 max-w-2xl mx-auto">
          <div className="relative flex items-center w-full bg-[#FFFBF2] rounded-full overflow-hidden mb-8 shadow-lg">
            <input
              type="text"
              placeholder="Busque uma demanda"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full p-3 rounded-full text-gray-800 focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
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
        </div>
      </header>

      <div className="w-11/12 max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FiltroDemandas
            onFiltroChange={setFiltros}
            currentFiltros={filtros}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6 max-[500px]:flex-wrap">
            <h2 className="text-2xl font-semibold text-gray-800">
              Demandas Disponíveis ({demandasFiltradas.length})
            </h2>
            <select
              value={ordem}
              onChange={(e) => setOrdem(e.target.value as "ASC" | "DESC")}
              className="p-2 border border-gray-300 rounded-md focus:outline-none bg-white cursor-pointer"
            >
              <option value="DESC">Mais recentes</option>
              <option value="ASC">Mais antigas</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 text-lg mt-10">
              Carregando demandas...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {demandasFiltradas.map((demanda) => (
                <CardDemanda key={demanda.id} {...demanda} />
              ))}
            </div>
          )}

          {!loading && demandasFiltradas.length === 0 && (
            <p className="text-center text-gray-500 text-lg mt-10">
              Nenhum projeto encontrado com os filtros selecionados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GaleriaDemanda;
