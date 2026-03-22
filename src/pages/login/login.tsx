import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowIn from "../../assets/img/login/arrowin.png";
import PersonPlus from "../../assets/img/login/PersonPlus.png";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-6 sm:py-10 px-4 sm:px-6 bg-[#F1F7EE]">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
          Osíris
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700">
          Acesse sua conta ou crie uma nova
        </p>
      </div>

      <div className="flex w-full sm:w-[440px] mb-6 sm:mb-8 rounded-lg overflow-hidden bg-[#dce2d7] border border-[#cbd2c6] max-w-md">
        <button
          onClick={() => setActiveTab("login")}
          className={`loginCadastro flex-1 py-2.5 sm:py-3 text-sm sm:text-base md:text-[1.05rem] font-medium transition duration-200 ${
            activeTab === "login"
              ? "bg-white text-[#021926] shadow-sm"
              : "hover:bg-[#e7ece3] bg-transparent text-gray-700"
          }`}
        >
          Entrar
        </button>

        <button
          onClick={() => setActiveTab("register")}
          className={`loginCadastro flex-1 py-2.5 sm:py-3 text-sm sm:text-base md:text-[1.05rem] font-medium transition duration-200 ${
            activeTab === "register"
              ? "bg-white text-[#021926] shadow-sm"
              : "hover:bg-[#e7ece3] bg-transparent text-gray-700"
          }`}
        >
          Cadastrar
        </button>
      </div>

      {activeTab === "login" && (
        <div className="bg-white border border-[#d3d3d3] rounded-xl p-6 sm:p-8 md:p-12 w-full sm:w-[520px] shadow-md max-w-md">
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <img src={ArrowIn} alt="Ícone de login" className="w-6 sm:w-7 h-6 sm:h-7" />
            <h2 className="text-xl sm:text-2xl md:text-[1.6rem] text-[#021926] font-semibold">
              Fazer Login
            </h2>
          </div>

          <div className="mb-5 sm:mb-6 text-left">
            <label className="block mb-2 text-sm sm:text-base md:text-[1rem] text-[#021926] font-medium">
              E-mail
            </label>
            <input
              type="email"
              className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base md:text-[1rem] focus:outline-none focus:border-[#782e29] focus:ring-1 focus:ring-[#782e29] transition"
              placeholder="seu.email@exemplo.com"
            />
          </div>

          <div className="mb-6 sm:mb-8 text-left">
            <label className="block mb-2 text-sm sm:text-base md:text-[1rem] text-[#021926] font-medium">
              Senha
            </label>
            <input
              type="password"
              className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base md:text-[1rem] focus:outline-none focus:border-[#782e29] focus:ring-1 focus:ring-[#782e29] transition"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-[#782e29] text-white py-2.5 sm:py-3 text-sm sm:text-base md:text-[1.1rem] rounded-lg font-medium cursor-pointer transition hover:bg-[#5e231f] active:scale-95">
            Entrar
          </button>

          <div className="text-center mt-4 sm:mt-5">
            <button
              onClick={() => navigate("/esqueceu-senha")}
              className="text-xs sm:text-sm md:text-[0.95rem] text-[#782e29] underline hover:no-underline transition"
            >
              Esqueceu sua senha?
            </button>
          </div>
        </div>
      )}

      {activeTab === "register" && (
        <div className="bg-white border border-[#d3d3d3] rounded-xl p-6 sm:p-8 md:p-12 w-full sm:w-[520px] shadow-md max-w-md">
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <img src={PersonPlus} alt="Ícone de cadastro" className="w-6 sm:w-7 h-6 sm:h-7" />
            <h2 className="text-xl sm:text-2xl md:text-[1.6rem] text-[#021926] font-semibold">
              Criar Conta
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
            Escolha o tipo de conta que deseja criar:
          </p>

          <button
            onClick={() => navigate("/cadastro/empreendedor")}
            className="w-full py-3 sm:py-4 text-sm sm:text-base md:text-[1.05rem] font-medium rounded-lg text-white mt-3 sm:mt-4 cursor-pointer transition hover:bg-[#5e231f] active:scale-95 bg-[#782e29]"
          >
            Empreendedor
          </button>

          <button
            onClick={() => navigate("/cadastro/estudante")}
            className="w-full py-3 sm:py-4 text-sm sm:text-base md:text-[1.05rem] font-medium rounded-lg text-white mt-3 sm:mt-4 cursor-pointer transition hover:bg-[#495a63] active:scale-95 bg-[#546873]"
          >
            Estudante
          </button>

          <button
            onClick={() => navigate("/cadastro/coordenador")}
            className="w-full py-3 sm:py-4 text-sm sm:text-base md:text-[1.05rem] font-medium rounded-lg text-white mt-3 sm:mt-4 cursor-pointer transition hover:bg-[#717271] active:scale-95 bg-[#9fa39e]"
          >
            Coordenador
          </button>
        </div>
      )}
    </section>
  );
}
