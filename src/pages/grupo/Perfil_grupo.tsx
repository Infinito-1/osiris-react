import React from 'react';

import Person from "../../assets/img/icones/Person.svg";
import calendario from "../../assets/img/icones/calendario.svg";
import pin from "../../assets/img/icones/pin.svg";

const PortfolioItem: React.FC = () => {
    return (
        <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800">E-commerce de Amigurumi</h4>
            <p className="text-sm text-gray-600 mb-3">
                Loja virtual completa com carrinho de compras e sistema de pagamento online.
            </p>
            <div className="flex space-x-3">
                <button className="bg-[#782E29] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[#6d2823]">
                    Deploy
                </button>
                <button className="bg-[#5F747F] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[#53656e]">
                    GitHub
                </button>
            </div>
        </div>
    );
};

// Componente Principal da Página "Sobre o Grupo"
const SobreGrupo: React.FC = () => {
    return (
        <main className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE] py-10">
            <div className="w-11/12 max-w-6xl">
                {/* Título Principal */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
                    Os Fulaninhos
                </h1>

                {/* Informações de Membros e Semestre */}
                <div className="flex justify-center items-center space-x-4 text-gray-600 mb-8">
                    <div className="flex items-center space-x-1">
                        <img src={Person} alt="Membros" className="w-4 h-4 filter invert(10%) sepia(10%) saturate(1000%) hue-rotate(180deg) brightness(50%)" />
                        <h5 className="text-sm">3 Membros</h5>
                    </div>
                    <div className="flex items-center space-x-1">
                        <img src={calendario} alt="Semestre" className="w-4 h-4 filter invert(10%) sepia(10%) saturate(1000%) hue-rotate(180deg) brightness(50%)" />
                        <h5 className="text-sm">3º Semestre</h5>
                    </div>
                </div>

                {/* Seção Principal de Conteúdo (Grid de 2 Colunas) */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Coluna da Esquerda: Sobre o Grupo e Informações */}
                    <div className="lg:col-span-2 bg-white border border-gray-300 rounded-lg p-6 shadow-md">
                        {/* Sobre o Grupo */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Sobre o Grupo</h3>
                        <p className="text-base text-gray-600 mb-6">
                            Especialistas em desenvolvimento de aplicações web modernas, utilizando tecnologias como React, Node.js e bancos de dados.
                        </p>

                        {/* Integrantes */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Integrantes</h3>
                        <ul className="list-disc list-inside text-base text-gray-600 mb-6 ml-4">
                            <li>Pedro</li>
                            <li>José</li>
                            <li>Ricardo</li>
                        </ul>

                        {/* Informações do Grupo */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Informações do Grupo</h3>
                        <div className="space-y-4">
                            {/* Representante */}
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                <p className="text-base font-medium text-gray-800">Representante:</p>
                                <p className="text-base text-gray-600">Pedro</p>
                            </div>

                            {/* RA */}
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                <p className="text-base font-medium text-gray-800">RA:</p>
                                <p className="text-base text-gray-600">1127580024</p>
                            </div>

                            {/* Semestre */}
                            <div className="flex justify-between items-center">
                                <p className="text-base font-medium text-gray-800">Semestre:</p>
                                <p className="text-base text-gray-600">3º</p>
                            </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex flex-col space-y-3 mt-8">
                            <button className="bg-[#782E29] text-white py-3 px-5 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#6d2823]">
                                Solicitar Entrada
                            </button>
                            {/* O botão "Enviar Mensagem" não está no HTML, mas está no design, vou adicioná-lo como um botão secundário */}
                            <button className="bg-[#5F747F] text-white py-3 px-5 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#53656e]">
                                Enviar Mensagem
                            </button>
                        </div>
                    </div>

                    {/* Coluna da Direita: Portfólio */}
                    <div className="lg:col-span-1 bg-white border border-gray-300 rounded-lg p-6 shadow-md">
                        <div className="flex items-center space-x-2 mb-4">
                            <img src={pin} alt="Portfólio" className="w-5 h-5 filter invert(10%) sepia(10%) saturate(1000%) hue-rotate(180deg) brightness(50%)" />
                            <h3 className="text-xl font-semibold text-gray-800">Portfólio</h3>
                        </div>

                        {/* Lista de Projetos */}
                        <PortfolioItem />
                        <PortfolioItem />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default SobreGrupo;