import React from 'react';

const Filtros: React.FC = () => {
    return (
        <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-150">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Filtros</h3>

            {/* Tipo de Projeto */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Tipo de Projeto</h4>
                <div className="space-y-2">
                    {['Sistema Web', 'Aplicativo Mobile', 'Landing Page', 'E-commerce'].map((tipo, index) => (
                        <div key={index} className="flex items-center">
                            <input type="checkbox" id={`tipo-${index}`} className="h-4 w-4 text[#782E29] border-gray-300 rounded focus:ring-[#782E29]" />
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
                            <input type="radio" id={`level-${index}`} name="complexidade" className="h-4 w-4 text-[#782E29] border-gray-300 focus:ring-[#782E29]" />
                            <label htmlFor={`level-${index}`} className="ml-2 text-gray-700">{level}</label>
                        </div>
                    ))}
                </div>
            </div>

            <button className="w-full bg-[#782E29] text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[#6d2823] shadow-md">
                Aplicar Filtros
            </button>
        </div>
    );
};

export default Filtros;
