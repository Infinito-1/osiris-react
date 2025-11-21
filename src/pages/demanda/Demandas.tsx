import React from 'react';
import Filtros from './Filtros';
import CardDemanda from './CardDemanda';

import foguete from "../../assets/img/icones/foguete.svg";
import pessoas from "../../assets/img/icones/pessoas.svg";

const GaleriaDemanda: React.FC = () => {
    const demandas = [
        {
            titulo: "Sistema de Gestão para Clínica Veterinária",
            empreendedor: "Amanda Alves",
            tipo: "Sistema Web",
            complexidade: "Intermediário",
            descricao: "Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados."
        },
        {
            titulo: "Sistema de Gestão para Clínica Veterinária",
            empreendedor: "Amanda Alves",
            tipo: "Sistema Web",
            complexidade: "Intermediário",
            descricao: "Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados."
        },
        {
            titulo: "Sistema de Gestão para Clínica Veterinária",
            empreendedor: "Amanda Alves",
            tipo: "Sistema Web",
            complexidade: "Intermediário",
            descricao: "Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados."
        },
        {
            titulo: "Sistema de Gestão para Clínica Veterinária",
            empreendedor: "Amanda Alves",
            tipo: "Sistema Web",
            complexidade: "Intermediário",
            descricao: "Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados."
        },
        {
            titulo: "Sistema de Gestão para Clínica Veterinária",
            empreendedor: "Amanda Alves",
            tipo: "Sistema Web",
            complexidade: "Intermediário",
            descricao: "Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados."
        },
        {
            titulo: "Sistema de Gestão para Clínica Veterinária",
            empreendedor: "Amanda Alves",
            tipo: "Sistema Web",
            complexidade: "Intermediário",
            descricao: "Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados."
        },
    ];

    return (
        <main className="w-full min-h-screen bg-[#F1F7EE]">
            {/* Seção Superior (Header da Página) */}
            <header className="bg-[#021926] text-[#F1F7EE] py-30 text-center">
                <h1 className="text-4xl font-bold mb-4">Galeria de Demanda</h1>
                <div className="w-11/12 max-w-2xl mx-auto">
                    <div className="relative flex items-center w-full bg-[#FFFBF2] rounded-full overflow-hidden mb-8 shadow-lg">
                        <input
                            type="text"
                            placeholder="Busque um Projeto"
                            className="w-full p-3 rounded-full text-gray-800 focus:outline-none"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                     <div className="flex space-x-4 mt-2 justify-center">
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

            {/* Conteúdo Principal (Filtros e Cards) */}
            <div className="w-11/12 max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Coluna de Filtros */}
                <div className="lg:col-span-1">
                    <Filtros />
                </div>

                {/* Coluna de Cards */}
                <div className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Projetos Disponíveis</h2>
                        <select className="p-2 border border-gray-300 rounded-md focus:outline-none bg-white">
                            <option>Mais recentes</option>
                            {/* Adicione outras opções de ordenação aqui */}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {demandas.map((demanda, index) => (
                            <CardDemanda key={index} {...demanda} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default GaleriaDemanda;
