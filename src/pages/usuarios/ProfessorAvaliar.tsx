import { useNavigate } from "react-router-dom";

// Ícone X (Close)
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400 hover:text-gray-600 cursor-pointer"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function ProfessorAvaliar() {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen bg-[#E8F0E2] flex items-center justify-center py-10 font-sans p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative border border-gray-200">
        {/* Botão Fechar */}
        <button onClick={() => navigate(-1)} className="absolute top-6 right-6">
          <XIcon />
        </button>

        {/* Cabeçalho */}
        <h1 className="text-2xl font-bold text-[#021926] mb-1">
          Avaliar Entrega
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Grupo Teste - App Yoga Mobile
        </p>

        {/* Formulário */}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          {/* Status */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Status
            </label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-md p-2.5 text-gray-600 appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-[#782E29] focus:border-[#782E29] text-sm">
                <option value="" disabled selected>
                  Selecione
                </option>
                <option value="aprovado">Aprovado</option>
                <option value="revisao">Precisa de Revisão</option>
              </select>
              {/* Seta do Select */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Nota */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Nota
            </label>
            <input
              type="text"
              placeholder="8.5"
              className="w-full border border-gray-300 rounded-md p-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#782E29] focus:border-[#782E29] text-sm"
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Feedback
            </label>
            <textarea
              rows={5}
              placeholder="Comentários sobre o projeto..."
              className="w-full border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#782E29] focus:border-[#782E29] resize-none text-sm"
            ></textarea>
          </div>

          {/* Botão Enviar */}
          <button
            type="submit"
            className="w-full bg-[#782E29] hover:bg-[#632420] text-white py-3 rounded-md font-medium transition-colors shadow-sm mt-2"
          >
            Enviar Avaliação
          </button>
        </form>
      </div>
    </main>
  );
}
