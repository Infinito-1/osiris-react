import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/login/logo.png";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="block sm:hidden">
          <nav className="flex justify-evenly items-center bg-[#782e29] px-[60px] py-[15px]">
            {/* Esquerda */}
            <Link to='/' className="flex items-center gap-[12px] cursor-pointer transition-opacity duration-300 hover:opacity-70">
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
            </Link>

            <Menu as="div" className="relative inline-block">
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold 
              text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20"> Menu <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
              <MenuItems transition className="absolute right-0 z-10 mt-2 w-40 origin-top-right divide-y divide-white/10 rounded-md 
              bg-[#782e29] outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 
              data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                <div className="py-1">
                  <MenuItem><a href="#"className="block px-4 py-2 text-sm bg-none border-none text-[#dad4c8] cursor-pointer transition-opacity duration-300 hover:opacity-70" onClick={() => navigate("/demandas")}> Projetos </a></MenuItem>
                  <MenuItem><a href="#"className="block px-4 py-2 text-sm bg-none border-none text-[#dad4c8] cursor-pointer transition-opacity duration-300 hover:opacity-70" onClick={() => navigate("/#como-funciona")}> Como Funciona </a></MenuItem>
                  <MenuItem><a href="#"className="block px-4 py-2 text-sm bg-none border-none text-[#dad4c8] cursor-pointer transition-opacity duration-300 hover:opacity-70" onClick={() => navigate("/grupos")}> Grupos </a></MenuItem>
                </div>
                  <div className="py-1">
                    <MenuItem><a href="#"className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden" onClick={() => navigate("/login")}> Login </a></MenuItem>
                    <MenuItem><a href="#"className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden" onClick={() => navigate("/login")}> Cadastrar </a></MenuItem>
                  </div>
                </MenuItems>
            </Menu>

          </nav>
        </div>
      
        <div className="hidden sm:block">
          <nav className="flex justify-between items-center bg-[#782e29] px-[60px] py-[15px]">
            {/* Esquerda */}
            <Link to='/' className="flex items-center gap-[12px] cursor-pointer transition-opacity duration-300 hover:opacity-70">
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
            </Link>

            {/* Centro */}
            <div className="flex items-center gap-[30px]">
              <button
                className="bg-none border-none text-[#dad4c8] text-[1.15rem] cursor-pointer font-medium transition-opacity duration-300 hover:opacity-70"
                // onClick={() => navigate("/aluno")}
                // onClick={() => navigate("/coordenador")}
                // onClick={() => navigate("/professor")}
                // onClick={() => navigate("/empreendedor")}
                onClick={() => navigate("/demandas")}
              >
                Projetos
              </button>
              <Link to="/#como-funciona" className="bg-none border-none text-[#dad4c8] text-[1.15rem] cursor-pointer font-medium transition-opacity duration-300 hover:opacity-70">
                Como Funciona
              </Link>
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
        </div>
      </div>
      
    </>
  );
}

export default Navbar;
