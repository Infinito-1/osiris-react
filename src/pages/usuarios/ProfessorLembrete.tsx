import React from "react";
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

// Ícone Enviar
const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default function ProfessorLembrete() {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen bg-[#E8F0E2] flex items-center justify-center py-10 font-sans p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl relative border border-gray-200">
        {/* Botão Fechar */}
        <button onClick={() => navigate(-1)} className="absolute top-6 right-6">
          <XIcon />
        </button>

        {/* Cabeçalho */}
        <h1 className="text-2xl font-bold text-[#021926] mb-1">
          Minhas Informações
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Envie um aviso para o quadro de avisos dos alunos
        </p>

        {/* Formulário */}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          {/* Destinatário */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Destinatário
            </label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-md p-2.5 text-gray-600 appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-[#782E29] focus:border-[#782E29] text-sm">
                <option>Selecione um grupo</option>
              </select>
              {/* Seta do Select customizada */}
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

          {/* Tipo de Aviso */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Tipo de Aviso
            </label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-md p-2.5 text-gray-600 appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-[#782E29] focus:border-[#782E29] text-sm">
                <option value="" disabled selected>
                  Selecione o tipo
                </option>
                <option value="prazo">Prazo</option>
                <option value="lembrete">Lembrete</option>
                <option value="notificacao">Notificação</option>
                <option value="geral">Geral</option>
              </select>
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

          {/* Título */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Título
            </label>
            <input
              type="text"
              placeholder="Ex: Reunião de Orientação"
              className="w-full border border-gray-300 rounded-md p-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#782E29] focus:border-[#782E29] text-sm"
            />
          </div>

          {/* Mensagem */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Mensagem
            </label>
            <textarea
              rows={5}
              placeholder="Digite sua mensagem..."
              className="w-full border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#782E29] focus:border-[#782E29] resize-none text-sm"
            ></textarea>
          </div>

          {/* Botão Enviar */}
          <button
            type="submit"
            className="w-full bg-[#782E29] hover:bg-[#632420] text-white py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-colors shadow-sm mt-2"
          >
            <SendIcon />
            Enviar Lembrete
          </button>
        </form>
      </div>
    </main>
  );
}
