import React from 'react';

import { useNavigate } from "react-router-dom";

import pessoas from "../../assets/img/icones/pessoas.svg";
import Person from "../../assets/img/icones/Person.svg";
import Lupa from "../../assets/img/icones/lupa.svg";
import foguete from "../../assets/img/icones/foguete.svg";

const GrupoCard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-md flex flex-col transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center space-x-2 mb-3">
                <img src={pessoas} alt="Ícone de Pessoas"/>
                <h3 className="text-xl font-semibold text-gray-800">Os Fulaninhos</h3>
            </div>

            <p className="text-sm text-gray-600 mb-4 flex-grow">
                Especialistas em desenvolvimento de aplicações web modernas, utilizando tecnologias como React, Node.js e bancos de dados.
            </p>

            <div className="flex items-center space-x-1 mb-5">
                <img src={Person} alt="Ícone de Pessoa" />
                <h5 className="text-xs font-normal text-gray-600"> 3 Membros - 3º Semestre </h5>
            </div>

            <div className="flex flex-col space-y-2 mt-auto">
                <button className="bg-[#5F747F] text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[#53656e]"
                onClick={() => navigate("/perfil_grupo")}
                >
                Ver Detalhes</button>
                <button className="bg-[#782E29] text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[#6d2823]">Solicitar Entrada</button>
            </div>
        </div>
    );
};

// Componente Principal da Página de Grupos
const Grupos: React.FC = () => {
    // Simula 6 cards para replicar o layout da imagem
    const cards = Array.from({ length: 6 }, (_, i) => <GrupoCard key={i} />);

    return (
        <main className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE]">
            {/* Seção do Cabeçalho (Fundo Azul Escuro) */}
            <section className="w-full bg-[#021926] text-[#FFFBF2] py-10 md:py-16 flex justify-center">
                <div className="w-11/12 max-w-6xl flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-1">Grupos</h1>
                    <p className="text-lg mb-8">Conheça os grupos de estudantes</p>

                    {/* Formulário de Busca */}
                    <form className="flex items-center w-full max-w-xl bg-[#FFFBF2] rounded-full overflow-hidden mb-8 shadow-lg">
                        <input
                            type="text"
                            name="name"
                            placeholder="Busque um Projeto"
                            required
                            className="flex-grow py-3 px-6 border-none outline-none text-gray-800 placeholder-gray-500 text-base"
                        />
                        <button type="submit" className="p-3 focus:outline-none">
                            {/* O ícone precisa ser estilizado para uma cor escura */}
                            <img src={Lupa} alt="Buscar" className="w-5 h-5 filter invert(10%) sepia(10%) saturate(1000%) hue-rotate(180deg) brightness(50%)" />
                        </button>
                    </form>

                    {/* Botões de Ação (Cadastrar Projeto e Formar Equipe) */}
                    <div className="flex space-x-4 mt-2">
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
            </section>

            {/* Seção da Lista de Grupos */}
            <section className="w-11/12 max-w-6xl py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards}
                </div>
            </section>
        </main>
    );
};

export default Grupos;
