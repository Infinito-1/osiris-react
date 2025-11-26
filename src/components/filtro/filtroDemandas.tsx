import Filtro from "../../assets/img/icones/filtro.svg";
import Lupa from "../../assets/img/icones/lupa.svg";

const FiltroDemandas: React.FC = () => {
    return (
        <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-150">
          <div className="flex gap-1">
            <img className="size-6" src={Filtro}/>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Filtros</h3>
          </div>

            {/* Tipo de Projeto */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Tipo de Projeto</h4>
                <div className="space-y-2">
                    {['Sistema Web', 'Aplicativo Mobile', 'Landing Page', 'E-commerce'].map((tipo, index) => (
                        <div key={index} className="flex items-center">
                            <input type="checkbox" id={`tipo-${index}`} 
                            className="appearance-none h-4 w-4 border-2 border-[#782E29] rounded focus:ring-[#782E29]
                            transition-all checked:bg-[#782E29] " />
                            <label htmlFor={`tipo-${index}`} className="ml-2 text-gray-700">{tipo}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Área de Negócio */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Área de Negócio</h4>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]">
                    <option>Todas as áreas</option>
                    {/* Adicione outras opções aqui */}
                </select>
            </div>

            {/* Complexidade */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Complexidade</h4>
                <div className="space-y-2">
                    {['Todas', 'Básica', 'Intermediária', 'Avançada'].map((level, index) => (
                        <div key={index} className="flex items-center">
                            <input type="radio" id={`level-${index}`} name="complexidade" 
                            className="appearance-none rounded-full h-4 w-4 border-2 border-[#782E29] focus:ring-[#782E29]
                            transition-all checked:bg-[#782E29] " />
                            <label htmlFor={`level-${index}`} className="ml-2 text-gray-700">{level}</label>
                        </div>
                    ))}
                </div>
            </div>

            <button className="w-full flex gap-7 justify-center items-center bg-[#782E29] text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[#6d2823] shadow-md cursor-pointer">
                <img src={Lupa}/>
                Aplicar Filtros
            </button>
        </div>
    );
};

export default FiltroDemandas;


