import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowIn from "../../assets/img/login/arrowin.png";

export default function EsqueceuSenha() {
  const navigate = useNavigate();

  const handleEnviarCodigo = () => {
    navigate("/codigo-senha");
  };

  return (
    <section className="flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-2">Osíris</h1>
      <p className="text-lg mb-6">Acesse sua conta ou crie uma nova</p>

      {/* BOX */}
      <div className="bg-white border border-[#d3d3d3] rounded-xl p-12 w-[520px] shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <img src={ArrowIn} alt="Ícone de login" className="w-7 h-7" />
          <h2 className="text-[1.6rem] text-[#021926] font-semibold">
            Redefinição de Senha
          </h2>
        </div>

        <div className="mb-6 text-left">
          <label className="block mb-2 text-[1rem] text-[#021926] font-medium">
            Digite o E-mail cadastrado:
          </label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg text-[1rem]"
          />
        </div>

        <button
          onClick={handleEnviarCodigo}
          className="w-full bg-[#782e29] text-white py-3 text-[1.1rem] rounded-lg cursor-pointer transition hover:opacity-90"
        >
          Enviar Código para meu E-mail
        </button>

        <div className="text-center mt-3 text-[0.95rem]">
          <button onClick={() => navigate("/suporte")} className="underline">
            Problemas? Fale com nosso suporte aqui
          </button>
        </div>
      </div>
    </section>
  );
}
