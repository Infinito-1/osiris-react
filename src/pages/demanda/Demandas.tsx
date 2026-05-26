import React, { useState, useMemo, useEffect } from "react";
import CardDemanda from "./CardDemanda";
import foguete from "../../assets/img/icones/foguete.svg";
import pessoas from "../../assets/img/icones/pessoas.svg";
import FiltroDemandas from "../../components/filtro/filtroDemandas";
import { getGaleriaDemandaOrdenada } from "../../services/demanda.service";

interface Filtros {
  tipos: string[];
  area: string;
  semestre: string;
}

const GaleriaDemanda: React.FC = () => {
  const [filtros, setFiltros] = useState<Filtros>({
    tipos: [],
    area: "Todas as áreas",
    semestre: "Todos",
  });

  const [ordem, setOrdem] = useState<'ASC' | 'DESC'>('DESC');
  const [demandas, setDemandas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGaleriaDemandas()
      .then(data => {
        setDemandas(data.map((d: any) => ({
          id: d.id,
          titulo: d.nome,
          empreendedor: d.empreendedor?.empresa ?? '—',
          tipo: d.tipos?.[0] ?? '',
          descricao: d.descricao,
          semestreRecomendado: d.semestreRecomendado,
        })));
      })
      .catch(() => setDemandas([]))
      .finally(() => setLoading(false));
  }, []);

  const demandasFiltradas = useMemo(() => {
    return demandas.filter(demanda => {
      const tipoMatch = filtros.tipos.length === 0 || filtros.tipos.includes(demanda.tipo);
      const semestreMatch = filtros.semestre === "Todos" ||
        demanda.semestreRecomendado === filtros.semestre;
      return tipoMatch && semestreMatch;
    });
  }, [demandas, filtros]);


  useEffect(() => {
    getGaleriaDemandaOrdenada(ordem)
      .then(data => {
        setDemandas(data.map((d: any) => ({
          id: d.id,
          titulo: d.nome,
          empreendedor: d.empreendedor?.empresa ?? '—',
          tipo: d.tipos?.[0] ?? '',
          semestreRecomendado: d.semestreRecomendado,
          descricao: d.descricao,
        })));
      })
      .catch(() => setDemandas([]));
  }, [ordem]);

  return (
    <div className="w-full min-h-screen bg-[#F1F7EE]">
      <header className="bg-[#021926] text-[#F1F7EE] py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Galeria de Demandas</h1>
        <div className="w-11/12 max-w-2xl mx-auto">
          <div className="flex gap-4 mt-2 justify-center max-[500px]:flex-wrap">
            <button className="flex items-center space-x-2 bg-[#5F747F] text-white py-3 px-5 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-[#556872]">
              <img src={foguete} alt="Cadastrar Projeto" className="w-5 h-5" />
              <p>Cadastrar Projeto</p>
            </button>
            <button className="flex items-center space-x-2 bg-[#F1F7EE] text-[#000000] py-3 px-5 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-[#c4c9c2]">
              <img src={pessoas} alt="Formar Equipe" className="w-5 h-5" />
              <p>Formar Equipe</p>
            </button>
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
              onChange={(e) => setOrdem(e.target.value as 'ASC' | 'DESC')}
              className="p-2 border border-gray-300 rounded-md focus:outline-none bg-white cursor-pointer"
            >
              <option value="DESC">Mais recentes</option>
              <option value="ASC">Mais antigas</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 text-lg mt-10">Carregando demandas...</p>
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