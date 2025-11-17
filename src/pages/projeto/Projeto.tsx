import React from 'react';

// Componente para um campo de informação
interface InfoFieldProps {
    label: string;
    value: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => {
    return (
        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <p className="text-base font-medium text-gray-800">{label}</p>
            <p className="text-base text-gray-600">{value}</p>
        </div>
    );
};

// Componente Principal da Página de Projeto
const Projeto: React.FC = () => {
    return (
        <main className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE] py-10 ">
            <header className="w-full py-8 text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold">Sistema de Gestão para Clínica Veterinária</h1>
                <p className="text-lg mt-1"> Amanda Alves / Sistema Web</p>
            </header>

            <div className="w-11/12 max-w-4xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
                {/* Seção de Descrição do Projeto */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descrição do Projeto</h2>
                    <p className="text-base text-gray-600 mb-4 leading-relaxed">
                        Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados.
                    </p>
                    <p className="text-base text-gray-600">
                        <span className="font-medium text-gray-800">Complexidade:</span> Intermediário
                    </p>
                </section>

                {/* Seção Sobre o Empreendedor */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sobre o Empreendedor</h2>
                    <div className="space-y-4">
                        <InfoField label="Nome:" value="Amanda Alves" />
                        <InfoField label="Empresa:" value="Clínica Veterinária São Paulo" />
                        <InfoField label="Email:" value="amanda@veterinaria.com" />
                        <InfoField label="Semestre recomendado:" value="A partir do 2º" />
                        <InfoField label="Complexidade:" value="Intermediário" />
                        <InfoField label="Tecnologias recomendadas:" value="React, Javascript e HTML" />
                    </div>
                </section>

                {/* Seção de Botões */}
                <section className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
                    <button className="flex-1 bg-[#782E29] text-white py-3 px-6 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#6d2823] shadow-md">
                        Manifestar Interesse
                    </button>
                    <button className="flex-1 bg-[#5F747F] text-white py-3 px-6 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#53656e] shadow-md">
                        Entrar em Contato
                    </button>
                </section>
            </div>
        </main>
    );
};

export default Projeto;
