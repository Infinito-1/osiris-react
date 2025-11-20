import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/login/logo.png";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex justify-between items-center bg-[#782e29] px-[60px] py-[15px]">
        {/* Esquerda */}
        <div className="flex items-center gap-[12px]">
          <div
            className="w-[48px] h-[48px] rounded-full bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
          <div>
            <h1 className="m-0 text-[1.6rem] font-medium text-[#e9e4da]">
              Osíris
            </h1>
            <span className="text-[1rem] text-[#bab9b5]">Fatec Zona Leste</span>
          </div>
        </div>

        {/* Centro */}
        <div className="flex items-center gap-[30px]">
          <button
            className="bg-none border-none text-[#dad4c8] text-[1.15rem] cursor-pointer font-medium transition-opacity duration-300 hover:opacity-70"
            // onClick={() => navigate("/aluno")}
            // onClick={() => navigate("/coordenador")}
            // onClick={() => navigate("/professor")}
            onClick={() => navigate("/empreendedor")}
          >
            Projetos
          </button>
          <button className="bg-none border-none text-[#dad4c8] text-[1.15rem] cursor-pointer font-medium transition-opacity duration-300 hover:opacity-70">
            Como Funciona
          </button>
          <button
            className="bg-none border-none text-[#dad4c8] text-[1.15rem] cursor-pointer font-medium transition-opacity duration-300 hover:opacity-70"
            onClick={() => navigate("/grupos")}
          >
            Grupos
          </button>
        </div>

        {/* Direita */}
        <div className="flex items-center gap-[30px]">
          <button
            className="text-[1.1rem] rounded-[10px] px-[22px] py-[10px] font-semibold cursor-pointer border border-solid border-white bg-white text-black transition-opacity duration-300 hover:opacity-85"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="text-[1.1rem] rounded-[10px] px-[22px] py-[10px] font-semibold cursor-pointer border border-solid border-white bg-white text-black transition-opacity duration-300 hover:opacity-85"
            onClick={() => navigate("/login")}
          >
            Cadastrar
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
