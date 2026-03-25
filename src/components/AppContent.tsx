import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Home from "../pages/home/Home";
import Grupos from "../pages/grupo/Grupos";
import SobreGrupo from "../pages/grupo/Perfil_grupo";
import FormGrupo from "../pages/grupo/Form_grupo";
import Dashboard from "../pages/grupo/Dashboard_grupo";
import Login from "../pages/login/login";
import EsqueceuSenha from "../pages/login/esqueceusenha";
import CodigoSenha from "../pages/login/codigosenha";
import RedefinirSenha from "../pages/login/redefinirsenha";
import EmpreendedorForm from "../pages/cadastro/empreendedorform";
import EstudantesForm from "../pages/cadastro/estudantesform";
import CoordenadorForm from "../pages/cadastro/coordenadorform";
import Projeto from "../pages/projeto/Projeto";
import Entrega from "../pages/projeto/Entrega";
import Status from "../pages/projeto/Status";
import CadastrarDemanda from "../pages/demanda/Cadastrar_demanda";
import ClassificarDemanda from "../pages/demanda/Classificar_demanda";
import GaleriaDemanda from "../pages/demanda/Demandas";
import DashboardAluno from "../pages/usuarios/Aluno";
import DashboardCoordenador from "../pages/usuarios/Coordenador";
import DashboardEmpreendedor from "../pages/usuarios/Empreendedor";
import CoordenadorEmAndamento from "../pages/usuarios/CoordenadorEmAndamento";
import CoordenadorConcluidas from "../pages/usuarios/CoordenadorConcluidas";
import EmpreendedorConcluidas from "../pages/usuarios/EmpreendedorConcluidas";
import EmpreendedorEmAndamento from "../pages/usuarios/EmpreendedorEmAndamento";
import { Route, Routes } from "react-router-dom";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import useFocusMain from "../components/hooks/useFocusMain";
import { useState, useEffect } from "react";

  

export default function AppContent() {
  const [zoom, setZoom] = useState(1);

  const aumentarFonte = () => {
    setZoom((prev) => prev + 0.1);
  };

  const diminuirFonte = () => {
    setZoom((prev) => (prev > 0.7 ? prev - 0.1 : prev));
  };

  // Atualiza o font-size do <html> sempre que o zoom mudar
  useEffect(() => {
    document.documentElement.style.fontSize = `${zoom}em`;
  }, [zoom]);

  useFocusMain();

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-black focus:text-white focus:px-4 focus:py-2"
      >
        Saltar para o conteúdo principal
      </a>
        <Navbar />

        {/* BOTÕES DE ZOOM COM ÍCONES */}
        <div className="fixed top-4 right-4 flex gap-2 z-50">
          <button
            onClick={aumentarFonte}
            className="bg-blue-500 text-white px-3 py-2 rounded flex items-center gap-1"
            aria-label="Aumentar fonte"
          >
            <PlusIcon className="h-5 w-5" />
          </button>

          <button
            onClick={diminuirFonte}
            className="bg-gray-500 text-white px-3 py-2 rounded flex items-center gap-1"
            aria-label="Diminuir fonte"
          >
            <MinusIcon className="h-5 w-5" />
          </button>
        </div>

        <main id="main-content" tabIndex={-1} className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grupos" element={<Grupos />} />
            <Route path="/perfil_grupo" element={<SobreGrupo />} />
            <Route path="/form_grupo" element={<FormGrupo />} />
            <Route path="/dashboard_grupo" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
            <Route path="/codigo-senha" element={<CodigoSenha />} />
            <Route path="/redefinir-senha" element={<RedefinirSenha />} />
            <Route
              path="/cadastro/empreendedor"
              element={<EmpreendedorForm />}
            />
            <Route path="/cadastro/estudante" element={<EstudantesForm />} />
            <Route path="/cadastro/coordenador" element={<CoordenadorForm />} />
            <Route path="/projeto" element={<Projeto />} />
            <Route path="/entrega" element={<Entrega />} />
            <Route path="/status" element={<Status />} />
            <Route path="/cadastrar_demanda" element={<CadastrarDemanda />} />
            <Route
              path="/classificar_demanda"
              element={<ClassificarDemanda />}
            />
            <Route path="/demandas" element={<GaleriaDemanda />} />
            <Route path="/aluno" element={<DashboardAluno />} />
            <Route path="/coordenador" element={<DashboardCoordenador />} />
            <Route path="/empreendedor" element={<DashboardEmpreendedor />} />
            <Route
              path="/CoordenadorEmAndamento"
              element={<CoordenadorEmAndamento />}
            />
            <Route
              path="/CoordenadorConcluidas"
              element={<CoordenadorConcluidas />}
            />
            <Route
              path="/EmpreendedorConcluidas"
              element={<EmpreendedorConcluidas />}
            />
            <Route
              path="/EmpreendedorEmAndamento"
              element={<EmpreendedorEmAndamento />}
            />
          </Routes>
        </main>

        <Footer />
    </>
  );
}