import React from 'react';

// Componente para um campo de formulário com label e input
interface StatusFieldProps {
    label: string;
    id: string;
    placeholder: string;
    colSpan?: 'full' | 'half';
}

const StatusField: React.FC<StatusFieldProps> = ({ label, id, placeholder, colSpan = 'full' }) => {
    const inputClasses = "w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-0 cursor-default";
    const containerClasses = colSpan === 'half' ? 'col-span-1' : 'col-span-2';

    return (
        <div className={`flex flex-col space-y-1 ${containerClasses}`}>
            <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
            <input
                id={id}
                type="text"
                name={id}
                placeholder={placeholder}
                readOnly // Campos de status geralmente são apenas para visualização
                className={inputClasses}
            />
        </div>
    );
};

// Componente Principal da Página de Status
const Status: React.FC = () => {
    return (
        <main className="flex justify-center w-full h-160 bg-[#F1F7EE] py-20">
            <div className="w-11/12 max-w-2xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Status do Projeto
                </h1>

                <form className="space-y-6">
                    {/* Nome do Projeto */}
                    <StatusField
                        label="Nome do projeto"
                        id="nomeProjeto"
                        placeholder="Site E-commerce de amigurumi"
                    />

                    {/* Grupo */}
                    <StatusField
                        label="Grupo"
                        id="grupo"
                        placeholder="Os fulaninhos"
                    />

                    {/* Aceite da coordenação e Professor orientador (Duas Colunas) */}
                    <div className="grid grid-cols-2 gap-4">
                        <StatusField
                            label="Aceite da coordenação"
                            id="aceiteCoordenacao"
                            placeholder="Reprovado"
                            colSpan="half"
                        />
                        <StatusField
                            label="Aceite do Professor orientador"
                            id="aceiteOrientador"
                            placeholder="Aprovado"
                            colSpan="half"
                        />
                    </div>

                    {/* Data de entrega final para o empreendedor */}
                    <StatusField
                        label="Data de entrega final para o empreendedor"
                        id="dataEntrega"
                        placeholder="Dia | Mês | Ano"
                    />
                </form>
            </div>
        </main>
    );
};

export default Status;