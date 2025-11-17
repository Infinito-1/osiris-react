import React from 'react';

// Componente para um campo de formulário com label e input/textarea
interface FormFieldProps {
    label: string;
    id: string;
    type: 'text' | 'textarea' | 'file';
    placeholder?: string;
    required?: boolean;
    colSpan?: 'full' | 'half';
}

const FormField: React.FC<FormFieldProps> = ({ label, id, type, placeholder, required, colSpan = 'full' }) => {
    const inputClasses = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2";
    const containerClasses = colSpan === 'half' ? 'col-span-1' : 'col-span-2';

    const renderInput = () => {
        if (type === 'textarea') {
            return (
                <textarea
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    required={required}
                    rows={4}
                    className={`${inputClasses} resize-none`}
                />
            );
        } else if (type === 'file') {
            // O input file é estilizado de forma diferente, então vou usar o input padrão
            return (
                <input
                    id={id}
                    type="file"
                    name={id}
                    required={required}
                    className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0  file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
            );
        }
        return (
            <input
                id={id}
                type="text"
                name={id}
                placeholder={placeholder}
                required={required}
                className={inputClasses}
            />
        );
    };

    return (
        <div className={`flex flex-col space-y-1 ${containerClasses}`}>
            <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
            {renderInput()}
        </div>
    );
};

// Componente Principal da Página de Entrega
const Entrega: React.FC = () => {
    return (
        <main className="flex justify-center w-full min-h-screen bg-[#F1F7EE] py-10">
            <div className="w-11/12 max-w-2xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Entrega de Projeto
                </h1>

                <form className="space-y-6">
                    {/* Nome do Projeto */}
                    <FormField
                        label="Nome do projeto"
                        id="nomeProjeto"
                        type="text"
                        placeholder="Digite o nome do projeto"
                        required
                    />

                    {/* Descrição */}
                    <FormField
                        label="Descrição breve sobre o que foi desenvolvido"
                        id="descricao"
                        type="textarea"
                        placeholder="Descreva o projeto"
                        required
                    />

                    {/* Grupo e Semestre (Duas Colunas) */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            label="Grupo"
                            id="grupo"
                            type="text"
                            placeholder="Nome do grupo"
                            required
                            colSpan="half"
                        />
                        <FormField
                            label="Semestre"
                            id="semestre"
                            type="text"
                            placeholder="Semestre"
                            required
                            colSpan="half"
                        />
                    </div>

                    {/* Professor Orientador */}
                    <FormField
                        label="Professor orientador"
                        id="orientador"
                        type="text"
                        placeholder="Nome do professor"
                        required
                    />

                    {/* Arquivo */}
                    <FormField
                        label="Arquivo"
                        id="arquivo"
                        type="file"
                        required
                    />

                    {/* Botão de Publicar */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-[#782E29] text-white py-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#6d2823] shadow-md"
                        >
                            Publicar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Entrega;
