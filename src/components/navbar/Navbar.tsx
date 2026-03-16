import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/login/logo.png";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import ThemeToggle from "../ThemeToggle";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Mobile */}
      <div className="block sm:hidden">
        <nav className="flex justify-between items-center bg-[#782e29] px-4 py-3 w-full">
          {/* Logo */}
          <Link to='/' className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full bg-center bg-cover"
              style={{ backgroundImage: `url(${logo})` }}
            ></div>
            <div>
              <h1 className="m-0 text-[clamp(1.3rem,4vw,1.6rem)] font-medium text-[#e9e4da]">Osíris</h1>
              <span className="text-[clamp(0.85rem,2.5vw,1rem)] text-[#bab9b5]">Fatec Zona Leste</span>
            </div>
          </Link>

          {/* Menu Hamburger */}
          <Menu as="div" className="relative">
            <MenuButton className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-2 text-white font-semibold hover:bg-white/20">
              Menu <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-40 divide-y divide-white/10 rounded-md bg-[#782e29]">
              <div className="py-1">
                <MenuItem><a href="#" onClick={() => navigate("/demandas")} className="block px-4 py-2 text-sm text-[#dad4c8] hover:opacity-70">Projetos</a></MenuItem>
                <MenuItem><a href="#" onClick={() => navigate("/#como-funciona")} className="block px-4 py-2 text-sm text-[#dad4c8] hover:opacity-70">Como Funciona</a></MenuItem>
                <MenuItem><a href="#" onClick={() => navigate("/grupos")} className="block px-4 py-2 text-sm text-[#dad4c8] hover:opacity-70">Grupos</a></MenuItem>
              </div>
              <div className="py-1">
                <MenuItem><div className="px-4 py-2"><ThemeToggle /></div></MenuItem>
                <MenuItem><a href="#" onClick={() => navigate("/login")} className="block px-4 py-2 text-sm text-gray-300 hover:opacity-70">Login</a></MenuItem>
                <MenuItem><a href="#" onClick={() => navigate("/login")} className="block px-4 py-2 text-sm text-gray-300 hover:opacity-70">Cadastrar</a></MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </nav>
      </div>

      {/* Desktop / Tablet */}
      <div className="hidden sm:block">
        <nav className="flex justify-between items-center bg-[#782e29] px-6 py-3 w-full">
          {/* Esquerda - Logo */}
          <Link to='/' className="flex items-center gap-3">
            <div
              className="w-[clamp(2.5rem,6vw,3rem)] h-[clamp(2.5rem,6vw,3rem)] rounded-full bg-center bg-cover"
              style={{ backgroundImage: `url(${logo})` }}
            ></div>
            <div>
              <h1 className="m-0 text-[clamp(1.3rem,4vw,1.6rem)] font-medium text-[#e9e4da]">Osíris</h1>
              <span className="text-[clamp(0.85rem,2vw,1rem)] text-[#bab9b5]">Fatec Zona Leste</span>
            </div>
          </Link>

          {/* Centro - Links */}
          <div className="flex items-center gap-[clamp(1rem,4vw,2rem)]">
            <button className="text-[#dad4c8] text-[clamp(0.95rem,2vw,1.15rem)] font-medium hover:opacity-70" onClick={() => navigate("/demandas")}>Projetos</button>
            <Link to="/#como-funciona" className="text-[#dad4c8] text-[clamp(0.95rem,2vw,1.15rem)] font-medium hover:opacity-70">Como Funciona</Link>
            <button className="text-[#dad4c8] text-[clamp(0.95rem,2vw,1.15rem)] font-medium hover:opacity-70" onClick={() => navigate("/grupos")}>Grupos</button>
          </div>

          {/* Direita - ThemeToggle + Botões */}
          <div className="flex items-center gap-[clamp(1rem,4vw,2rem)]">
            <div className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] flex items-center justify-center">
              <ThemeToggle />
            </div>
            <button className="text-[clamp(0.9rem,2vw,1.1rem)] rounded-lg px-[clamp(16px,2vw,22px)] py-[clamp(6px,1.5vw,10px)] font-semibold border border-white bg-white text-black hover:opacity-85" onClick={() => navigate("/login")}>Login</button>
            <button className="text-[clamp(0.9rem,2vw,1.1rem)] rounded-lg px-[clamp(16px,2vw,22px)] py-[clamp(6px,1.5vw,10px)] font-semibold border border-white bg-white text-black hover:opacity-85" onClick={() => navigate("/login")}>Cadastrar</button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;