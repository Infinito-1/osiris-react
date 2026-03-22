import Book from "../../assets/img/login/book.png";
import { useNavigate } from "react-router-dom";

function CoordenadorForm() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-6 sm:py-10 md:py-[60px] px-4 sm:px-6 font-inter bg-[#F1F7EE]">
      {/* TÍTULO E SUBTÍTULO */}
      <div className="text-center mb-8 sm:mb-10 w-full">
        <h1 className="text-[#021926] text-2xl sm:text-3xl md:text-[2.4rem] font-semibold mb-2">
          Osíris
        </h1>
        <p className="text-sm sm:text-base md:text-[1.05rem] font-medium text-[#021926]">
          Acesse sua conta ou crie uma nova
        </p>
      </div>

      {/* FORMULÁRIO */}
      <div className="w-full sm:w-[680px] max-w-md sm:max-w-none bg-white border border-[#d3d3d3] rounded-xl p-6 sm:p-8 md:p-[50px] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
        {/* ÍCONE CENTRALIZADO */}
        <div className="flex justify-center mb-6 sm:mb-[25px]">
          <img
            src={Book}
            alt="Ícone Coordenador"
            className="w-16 sm:w-20 md:w-[90px] h-16 sm:h-20 md:h-[90px] rounded-full p-3 sm:p-4 md:p-[15px] bg-[#9fa39e]"
          />
        </div>

        {/* TÍTULO DO FORMULÁRIO */}
        <h3 className="coordenador text-center text-lg sm:text-xl md:text-[1.35rem] font-semibold mb-2 text-[#021926]">
          Sou Coordenador
        </h3>

        {/* SUBTÍTULO */}
        <p className="text-center text-xs sm:text-sm md:text-[0.95rem] text-gray-600 mb-6 sm:mb-[45px]">
          Preciso verificar demandas
        </p>

        {/* Nome */}
        <div className="mb-5 sm:mb-[30px]">
          <label htmlFor="nomeCoo" className="block mb-2 text-sm sm:text-base font-medium text-[#021926]">
            Nome
          </label>
          <input
            type="text"
            id="nomeCoo"
            placeholder="Digite seu nome completo"
            className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#9fa39e] transition"
          />
        </div>

        {/* Email */}
        <div className="mb-5 sm:mb-[30px]">
          <label htmlFor="emailCoo" className="block mb-2 text-sm sm:text-base font-medium text-[#021926]">
            E-mail
          </label>
          <input
            type="email"
            id="emailCoo"
            placeholder="seu.email@exemplo.com"
            className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#9fa39e] transition"
          />
        </div>

        {/* Curso */}
        <div className="mb-5 sm:mb-[30px]">
          <label htmlFor="cursoCoo" className="block mb-2 text-sm sm:text-base font-medium text-[#021926]">
            Curso
          </label>
          <input
            type="text"
            id="cursoCoo"
            placeholder="Ex: Análise e Desenvolvimento de Sistemas"
            className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#9fa39e] transition"
          />
        </div>

        {/* Senha */}
        <div className="mb-6 sm:mb-[30px]">
          <label htmlFor="senhaCoo" className="block mb-2 text-sm sm:text-base font-medium text-[#021926]">
            Senha
          </label>
          <input
            type="password"
            id="senhaCoo"
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#9fa39e] transition"
          />
        </div>

        {/* BOTÃO */}
        <button
          className="
            w-full
            py-4
            rounded-lg
            text-white
            text-[1.05rem]
            bg-[#9fa39e]
            mt-[20px]
            transition
            hover:bg-[#717271] 
            active:scale-95
          "
          onClick={() => navigate("/coordenador")}
        >
          Criar Conta
        </button>

        <div className="text-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600">
            Já tem uma conta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#9fa39e] font-medium underline hover:no-underline transition"
            >
              Faça login aqui
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export default CoordenadorForm;
