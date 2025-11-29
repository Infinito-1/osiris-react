
// Componente para um campo de formulário com label e input/textarea
interface FormFieldProps {
  label: string;
  id: string;
  type: "text" | "textarea";
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  required,
  readOnly = false,
}) => {
  const inputClasses =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]";

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          rows={4}
          readOnly={readOnly}
          className={`${inputClasses} resize-none ${readOnly ? "bg-gray-50 cursor-default" : ""}`}
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
        readOnly={readOnly}
        className={`${inputClasses} ${readOnly ? "bg-gray-50 cursor-default" : ""}`}
      />
    );
  };

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {renderInput()}
    </div>
  );
};

// Componente Principal da Página de Classificação de Demanda
const ClassificarDemanda: React.FC = () => {
  return (
    <main className="flex justify-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <div className="w-11/12 max-w-xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Classificação da Demanda
        </h1>

        <form className="space-y-6">
          {/* Descrição sobre a demanda (ReadOnly) */}
          <FormField
            label="Descrição sobre a demanda"
            id="descricaoDemanda"
            type="textarea"
            placeholder="Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados."
            readOnly
          />

          {/* Indicação de Semestre */}
          <FormField
            label="Indicação de Semestre"
            id="semestre"
            type="text"
            placeholder="1° semestre | 2° semestre | 3° semestre......"
            required
          />

          {/* Descrição breve sobre quais os requisitos exigidos para esse projeto */}
          <FormField
            label="Descrição breve sobre quais os requisitos exigidos para esse projeto"
            id="requisitos"
            type="text"
            required
          />

          {/* Tipo */}
          <FormField
            label="Tipo:"
            id="tipo"
            type="text"
            placeholder="Site | Mobile | Outro:"
            required
          />

          {/* Grau de dificuldade */}
          <FormField
            label="Grau de dificuldade"
            id="dificuldade"
            type="text"
            placeholder="Básico | Intermediário | Dificil"
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

export default ClassificarDemanda;
