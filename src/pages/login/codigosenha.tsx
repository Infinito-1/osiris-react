import { useNavigate } from "react-router-dom";
import ArrowIn from "../../assets/img/login/arrowin.png";

export default function CodigoSenha() {
  const navigate = useNavigate();

  const handleVerificar = () => {
    navigate("/redefinir-senha");
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-6 sm:py-10 px-4 sm:px-6 bg-[#F1F7EE]">
      <div className="text-center mb-8 sm:mb-10 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#021926] mb-2">
          Osíris
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700">
          Acesse sua conta ou crie uma nova
        </p>
      </div>

      <div className="bg-white border border-[#d3d3d3] rounded-xl p-6 sm:p-8 md:p-12 w-full sm:w-[520px] shadow-md max-w-md">
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <img src={ArrowIn} alt="Ícone verificação" className="w-6 sm:w-7 h-6 sm:h-7" />
          <h2 className="text-xl sm:text-2xl md:text-[1.6rem] text-[#021926] font-semibold">
            Redefinição de Senha
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
          Verifique seu e-mail e digite o código de 6 dígitos que foi enviado para você.
        </p>

        <div className="mb-6 sm:mb-8 text-left">
          <label className="block mb-2 text-sm sm:text-base md:text-[1rem] text-[#021926] font-medium">
            Digite o Código enviado:
          </label>
          <input
            type="text"
            placeholder="000000"
            className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base md:text-[1rem] text-center tracking-widest font-semibold focus:outline-none focus:border-[#782e29] focus:ring-1 focus:ring-[#782e29] transition"
          />
        </div>

        <button
          onClick={handleVerificar}
          className="w-full bg-[#782e29] text-white py-2.5 sm:py-3 text-sm sm:text-base md:text-[1.1rem] rounded-lg font-medium cursor-pointer transition hover:bg-[#5e231f] active:scale-95"
        >
          Verificar
        </button>

        <div className="text-center mt-4 sm:mt-5">
          <button
            onClick={() => navigate("/suporte")}
            className="text-xs sm:text-sm md:text-[0.95rem] text-[#782e29] underline hover:no-underline transition"
          >
            Problemas? Fale com nosso suporte aqui
          </button>
        </div>

        <div className="text-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            Não recebeu o código?
          </p>
          <button
            onClick={() => navigate("/esqueceu-senha")}
            className="text-xs sm:text-sm md:text-[0.95rem] text-[#782e29] underline hover:no-underline transition font-medium"
          >
            Reenviar código
          </button>
        </div>
      </div>
    </section>
  );
}
