import React, { useState, useEffect } from 'react';
import Filtro from "../../assets/img/icones/filtro.svg";
import Lupa from "../../assets/img/icones/lupa.svg";

interface Filtros {
  tipos: string[];
  area: string;
  semestre: string;
}

interface FiltroDemandasProps {
  onFiltroChange: (filtros: Filtros) => void;
  currentFiltros: Filtros;
}

const TIPOS_PROJETO = ['Sistema Web', 'Aplicativo Mobile', 'Landing Page', 'E-commerce'];
const SEMESTRES = ['Todos', '1', '2', '3', '4', '5', '6'];

const FiltroDemandas: React.FC<FiltroDemandasProps> = ({ onFiltroChange, currentFiltros }) => {
  const [filtrosInternos, setFiltrosInternos] = useState<Filtros>(currentFiltros);

  useEffect(() => {
    setFiltrosInternos(currentFiltros);
  }, [currentFiltros]);

  const handleTipoChange = (tipo: string, isChecked: boolean) => {
    setFiltrosInternos(prev => ({
      ...prev,
      tipos: isChecked ? [...prev.tipos, tipo] : prev.tipos.filter(t => t !== tipo),
    }));
  };

  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltrosInternos(prev => ({ ...prev, area: event.target.value }));
  };

  const handleSemestreChange = (semestre: string) => {
    setFiltrosInternos(prev => ({ ...prev, semestre }));
  };

  const aplicarFiltros = () => {
    onFiltroChange(filtrosInternos);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
      <div className="flex gap-1 mb-4">
        <img className="size-6" src={Filtro} alt="Filtros" />
        <h3 className="text-xl font-semibold text-gray-800">Filtros</h3>
      </div>

      {/* Tipo de Projeto */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2">Formato</h4>
        <div className="space-y-2">
          {TIPOS_PROJETO.map((tipo, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`tipo-${index}`}
                className="appearance-none h-4 w-4 border-2 border-[#782E29] rounded focus:ring-[#782E29] transition-all checked:bg-[#782E29] cursor-pointer"
                checked={filtrosInternos.tipos.includes(tipo)}
                onChange={(e) => handleTipoChange(tipo, e.target.checked)}
              />
              <label htmlFor={`tipo-${index}`} className="ml-2 text-gray-700 cursor-pointer">{tipo}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Área de Negócio */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2">Área de Negócio</h4>
        <select
          id="area_selecionada"
          name="area_selecionada"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]"
          value={filtrosInternos.area}
          onChange={handleAreaChange}
        >
          <option>Todas as áreas</option>
        </select>
      </div>

      {/* Semestre mínimo recomendado */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2">Semestre mínimo recomendado</h4>
        <div className="space-y-2">
          {SEMESTRES.map((s, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`semestre-${index}`}
                name="semestre"
                className="appearance-none rounded-full h-4 w-4 border-2 border-[#782E29] focus:ring-[#782E29] transition-all checked:bg-[#782E29] cursor-pointer"
                checked={filtrosInternos.semestre === s}
                onChange={() => handleSemestreChange(s)}
              />
              <label htmlFor={`semestre-${index}`} className="ml-2 text-gray-700 cursor-pointer">
                {s === 'Todos' ? 'Todos' : `${s}º semestre`}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        className="w-full flex gap-7 justify-center items-center bg-[#782E29] text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[#6d2823] shadow-md cursor-pointer"
        onClick={aplicarFiltros}
      >
        <img src={Lupa} alt="Buscar" />
        Aplicar Filtros
      </button>
    </div>
  );
};

export default FiltroDemandas;