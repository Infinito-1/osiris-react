import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowIn from "../../assets/img/login/arrowin.png";
import PersonPlus from "../../assets/img/login/PersonPlus.png";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center py-10 bg-[#F1F7EE]">
      <h1 className="text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
        Osíris
      </h1>
      <p className="text-lg mb-6">Acesse sua conta ou crie uma nova</p>

      {/* TAB BUTTONS */}
      <div className="flex w-[440px] mb-6 rounded-lg overflow-hidden bg-[#dce2d7] border border-[#cbd2c6]">
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 py-3 text-[1.05rem] transition ${
            activeTab === "login"
              ? "bg-white"
              : "hover:bg-[#e7ece3] bg-transparent"
          }`}
        >
          Entrar
        </button>

        <button
          onClick={() => setActiveTab("register")}
          className={`flex-1 py-3 text-[1.05rem] transition ${
            activeTab === "register"
              ? "bg-white"
              : "hover:bg-[#e7ece3] bg-transparent"
          }`}
        >
          Cadastrar
        </button>
      </div>

      {/* LOGIN BOX */}
      {activeTab === "login" && (
        <div className="bg-white border border-[#d3d3d3] rounded-xl p-12 w-[520px] shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <img src={ArrowIn} alt="Ícone de login" className="w-7 h-7" />
            <h2 className="text-[1.6rem] text-[#021926] font-semibold">
              Fazer Login
            </h2>
          </div>

          <div className="mb-6 text-left">
            <label className="block mb-2 text-[1rem] text-[#021926] font-medium">
              E-mail
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg text-[1rem]"
            />
          </div>

          <div className="mb-6 text-left">
            <label className="block mb-2 text-[1rem] text-[#021926] font-medium">
              Senha
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg text-[1rem]"
            />
          </div>

          <button className="w-full bg-[#782e29] text-white py-3 text-[1.1rem] rounded-lg cursor-pointer transition hover:opacity-90">
            Entrar
          </button>

          <div className="text-center mt-3 text-[0.95rem]">
            <button
              onClick={() => navigate("/esqueceu-senha")}
              className="underline"
            >
              Esqueceu sua senha?
            </button>
          </div>
        </div>
      )}

      {/* REGISTER BOX */}
      {activeTab === "register" && (
        <div className="bg-white border border-[#d3d3d3] rounded-xl p-12 w-[520px] shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <img src={PersonPlus} alt="Ícone de cadastro" className="w-7 h-7" />
            <h2 className="text-[1.6rem] text-[#021926] font-semibold">
              Criar Conta
            </h2>
          </div>

          {/* BUTTONS */}
          <button
            onClick={() => navigate("/cadastro/empreendedor")}
            className="w-full py-4 text-[1.05rem] font-medium rounded-lg text-white mt-4 cursor-pointer transition hover:opacity-90"
            style={{ backgroundColor: "#782e29" }}
          >
            Empreendedor
          </button>

          <button
            onClick={() => navigate("/cadastro/estudante")}
            className="w-full py-4 text-[1.05rem] font-medium rounded-lg text-white mt-4 cursor-pointer transition hover:opacity-90"
            style={{ backgroundColor: "#546873" }}
          >
            Estudante
          </button>

          <button
            onClick={() => navigate("/cadastro/docente")}
            className="w-full py-4 text-[1.05rem] font-medium rounded-lg text-white mt-4 cursor-pointer transition hover:opacity-90"
            style={{ backgroundColor: "#021926" }}
          >
            Docente
          </button>

          <button
            onClick={() => navigate("/cadastro/coordenador")}
            className="w-full py-4 text-[1.05rem] font-medium rounded-lg text-white mt-4 cursor-pointer transition hover:opacity-90"
            style={{ backgroundColor: "#9fa39e" }}
          >
            Coordenador
          </button>
        </div>
      )}
    </section>
  );
}
