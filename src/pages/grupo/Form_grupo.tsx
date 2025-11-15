import React from 'react';

// Componente para um campo de formulário com label e input/select
interface FormFieldProps {
    label: string;
    id: string;
    type: 'text' | 'number' | 'select';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
}

const FormField: React.FC<FormFieldProps> = ({ label, id, type, placeholder, required, options }) => {
    const inputClasses = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800";

    const renderInput = () => {
        if (type === 'select' && options) {
            return (
                <select id={id} name={id} required={required} className={inputClasses}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            );
        }
        return (
            <input
                id={id}
                type={type === 'number' ? 'number' : 'text'}
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

// Componente Principal do Formulário
const FormGrupo: React.FC = () => {
    const semestreOptions = [
        { value: "1", label: "1º Semestre" },
        { value: "2", label: "2º Semestre" },
        { value: "3", label: "3º Semestre" },
        { value: "4", label: "4º Semestre" },
        { value: "5", label: "5º Semestre" },
        { value: "6", label: "6º Semestre" },
    ];

    return (
        <main className="flex justify-center w-full min-h-screen bg-[#F1F7EE] py-10">
            <div className="w-11/12 max-w-4xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                    Formulário de cadastro do grupo
                </h2>

                <form action="#" method="submit" id="formulario" className="space-y-6">
                    {/* Campos em Duas Colunas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Nome do grupo" id="grupo" type="text" placeholder="Digite o nome do grupo" required />
                        <FormField label="Semestre" id="semestre" type="select" required options={semestreOptions} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Representante" id="representante" type="text" placeholder="Digite o nome do representante" required />
                        <FormField label="RA" id="ra1" type="number" placeholder="Digite o RA" required />
                    </div>

                    {/* Campos de Integrantes e RAs */}
                    {[2, 3, 4, 5].map((i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Integrante" id={`integrante${i}`} type="text" placeholder="Digite o nome do integrante" required />
                            <FormField label="RA" id={`ra${i}`} type="number" placeholder="Digite o RA" required />
                        </div>
                    ))}

                    {/* Botão de Cadastro */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-[#782E29] text-white py-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#6d2823] shadow-md"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default FormGrupo;
