import React from 'react';

interface CardDemandaProps {
    titulo: string;
    empreendedor: string;
    tipo: string;
    complexidade: string;
    descricao: string;
}

const CardDemanda: React.FC<CardDemandaProps> = ({ titulo, empreendedor, tipo, complexidade, descricao }) => {
    return (
        <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{titulo}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <span>{empreendedor}</span>
                <span>/</span>
                <span>{tipo}</span>
                <span>/</span>
                <span>{complexidade}</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4 flex-grow">{descricao}</p>

            <div className="flex flex-col space-y-2">
                <button className="w-full bg-red-800 text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-red-900 shadow-md">
                    Manifestar Interesse
                </button>
                <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-300 shadow-md">
                    Ver Detalhes
                </button>
            </div>
        </div>
    );
};

export default CardDemanda;
