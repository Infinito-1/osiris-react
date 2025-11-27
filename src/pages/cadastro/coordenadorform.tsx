import Book from "../../assets/img/login/book.png";
import { useNavigate } from "react-router-dom";

function CoordenadorForm() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center px-4 font-inter  bg-[#F1F7EE]">
      {/* TÍTULO E SUBTÍTULO COM BOLD SUAVE */}
      <h1 className="text-[#021926] text-[2.4rem] font-semibold mb-2 mt-[60px]">
        Osíris
      </h1>

      <p className="text-[1.05rem] font-medium mb-[30px] text-[#021926]">
        Acesse sua conta ou crie uma nova
      </p>

      <div
        className="
          w-[680px]
          max-w-full
          max-[700px]:w-[90%]
          bg-white
          border border-[#d3d3d3]
          rounded-xl
          p-[50px]
          shadow-[0_4px_10px_rgba(0,0,0,0.08)]
        "
      >
        {/* ÍCONE CENTRALIZADO */}
        <div className="flex justify-center mb-[25px]">
          <img
            src={Book}
            alt="Ícone Coordenador"
            className="w-[90px] h-[90px] rounded-full p-[15px] bg-[#9fa39e]"
          />
        </div>

        <h3 className="text-center text-[1.35rem] font-semibold mb-[6px]">
          Sou Coordenador
        </h3>

        <p className="text-center text-[0.95rem] text-[#333] mb-[45px]">
          Preciso verificar demandas
        </p>

        {/* Nome */}
        <div className="mb-[30px]">
          <label htmlFor="nomeCoo" className="block mb-2 font-medium">
            Nome
          </label>
          <input
            type="text"
            id="nomeCoo"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#9fa39e]"
          />
        </div>

        {/* Email */}
        <div className="mb-[30px]">
          <label htmlFor="emailCoo" className="block mb-2 font-medium">
            E-mail
          </label>
          <input
            type="email"
            id="emailCoo"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#9fa39e]"
          />
        </div>

        {/* Curso */}
        <div className="mb-[30px]">
          <label htmlFor="cursoCoo" className="block mb-2 font-medium">
            Curso
          </label>
          <input
            type="text"
            id="cursoCoo"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#9fa39e]"
          />
        </div>

        {/* Senha */}
        <div className="mb-[30px]">
          <label htmlFor="senhaCoo" className="block mb-2 font-medium">
            Senha
          </label>
          <input
            type="password"
            id="senhaCoo"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#9fa39e]"
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
            transition-opacity
            hover:opacity-90
          "
          onClick={() => navigate("/coordenador")}
        >
          Criar Conta
        </button>
      </div>
    </section>
  );
}

export default CoordenadorForm;
