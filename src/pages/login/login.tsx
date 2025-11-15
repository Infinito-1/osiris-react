import React, { useState } from "react";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <section className="flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-2">Osíris</h1>
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
            <img
              src="../../assets/img/login/arrowin.png"
              alt="Ícone de login"
              className="w-7 h-7"
            />
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
            <a href="esqueceusenha.html" className="underline">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      )}

      {/* REGISTER BOX */}
      {activeTab === "register" && (
        <div className="bg-white border border-[#d3d3d3] rounded-xl p-12 w-[520px] shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="../../assets/img/login/PersonPlus.png"
              alt="Ícone de cadastro"
              className="w-7 h-7"
            />
            <h2 className="text-[1.6rem] text-[#021926] font-semibold">
              Criar Conta
            </h2>
          </div>

          {/* BUTTONS */}
          {[
            {
              label: "Empreendedor",
              color: "#782e29",
              link: "./forms/empreendedorform.html",
            },
            {
              label: "Estudante",
              color: "#546873",
              link: "./forms/estudantesform.html",
            },
            {
              label: "Docente",
              color: "#021926",
              link: "./forms/docenteform.html",
            },
            {
              label: "Coordenador",
              color: "#9fa39e",
              link: "./forms/coordenadorform.html",
            },
          ].map((btn, index) => (
            <a href={btn.link} key={index}>
              <button
                className="w-full py-4 text-[1.05rem] font-medium rounded-lg text-white mt-4 cursor-pointer transition hover:opacity-90"
                style={{ backgroundColor: btn.color }}
              >
                {btn.label}
              </button>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
