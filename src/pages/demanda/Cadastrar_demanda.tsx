import React from 'react';

// Componente para um campo de formulário com label e input/textarea
interface FormFieldProps {
    label: string;
    id: string;
    type: 'text' | 'textarea';
    placeholder?: string;
    required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, type, placeholder, required }) => {
    const inputClasses = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]";

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
        <div className="flex flex-col space-y-1">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
            {renderInput()}
        </div>
    );
};

// Componente Principal da Página de Cadastro de Demanda
const CadastrarDemanda: React.FC = () => {
    return (
        <main className="flex justify-center w-full min-h-screen bg-[#F1F7EE] py-10">
            <div className="w-11/12 max-w-xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Cadastrar Demanda
                </h1>

                <form className="space-y-6">
                    {/* Nome da demanda/ projeto a ser desenvolvido */}
                    <FormField
                        label="Nome da demanda/ projeto a ser desenvolvido"
                        id="nomeDemanda"
                        type="text"
                        required
                    />

                    {/* Descrição */}
                    <FormField
                        label="Descrição. Aqui você poderá nos detalhar quais são as suas necessidades"
                        id="descricao"
                        type="textarea"
                        required
                    />

                    {/* Tipo */}
                    <FormField
                        label="Tipo"
                        id="tipo"
                        type="text"
                        placeholder="Site | Aplicativo | Outro? Especifique:"
                        required
                    />

                    {/* Aceita proposta de mudança no tipo? */}
                    <FormField
                        label="Aceita proposta de mudança no tipo?"
                        id="aceiteMudanca"
                        type="text"
                        placeholder="Sim | Não | Talvez"
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

export default CadastrarDemanda;