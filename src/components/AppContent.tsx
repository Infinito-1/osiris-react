import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import PrivateRoute from "../components/PrivateRoute";

// Páginas públicas
import Home from "../pages/home/Home";
import Grupos from "../pages/grupo/Grupos";
import SobreGrupo from "../pages/grupo/Perfil_grupo";
import GaleriaDemanda from "../pages/demanda/Demandas";
import Login from "../pages/login/login";
import EsqueceuSenha from "../pages/login/esqueceusenha";
import CodigoSenha from "../pages/login/codigosenha";
import RedefinirSenha from "../pages/login/redefinirsenha";
import EmpreendedorForm from "../pages/cadastro/empreendedorform";
import EstudantesForm from "../pages/cadastro/estudantesform";
import CoordenadorForm from "../pages/cadastro/coordenadorform";

// Páginas protegidas
import FormGrupo from "../pages/grupo/Form_grupo";
import Dashboard from "../pages/grupo/Dashboard_grupo";
import Projeto from "../pages/projeto/Projeto";
import Entrega from "../pages/projeto/Entrega";
import Status from "../pages/projeto/Status";
import CadastrarDemanda from "../pages/demanda/Cadastrar_demanda";
import ClassificarDemanda from "../pages/demanda/Classificar_demanda";
import DashboardAluno from "../pages/usuarios/Aluno";
import DashboardCoordenador from "../pages/usuarios/Coordenador";
import DashboardEmpreendedor from "../pages/usuarios/Empreendedor";
import CoordenadorEmAndamento from "../pages/usuarios/CoordenadorEmAndamento";
import CoordenadorConcluidas from "../pages/usuarios/CoordenadorConcluidas";
import EmpreendedorConcluidas from "../pages/usuarios/EmpreendedorConcluidas";
import EmpreendedorEmAndamento from "../pages/usuarios/EmpreendedorEmAndamento";
import DashboardAdmin from "../pages/admin/DashboardAdmin";

import useFocusMain from "../hooks/useFocusMain";
import AccessibilityButton from "../components/AccessibilityButton";

export default function AppContent() {
  useFocusMain();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:text-white focus:px-4 focus:py-2"
      >
        Saltar para o conteúdo principal
      </a>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <AccessibilityButton />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 bg-[#F1F7EE] dark:bg-[#848484] focus:outline-none"
        >
          <Routes>
            {/* ── Rotas públicas ── */}
            <Route path="/" element={<Home />} />
            <Route path="/grupos" element={<Grupos />} />
            <Route path="/perfil_grupo/:id" element={<SobreGrupo />} />
            <Route path="/perfil_grupo" element={<SobreGrupo />} />
            <Route path="/demandas" element={<GaleriaDemanda />} />
            <Route path="/login" element={<Login />} />
            <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
            <Route path="/codigo-senha" element={<CodigoSenha />} />
            <Route path="/redefinir-senha" element={<RedefinirSenha />} />
            <Route path="/cadastro/empreendedor" element={<EmpreendedorForm />} />
            <Route path="/cadastro/estudante" element={<EstudantesForm />} />
            <Route path="/cadastro/coordenador" element={<CoordenadorForm />} />

            {/* ── Rotas protegidas — Grupo ── */}
            <Route path="/form_grupo" element={<PrivateRoute roles={['Grupo']}><FormGrupo /></PrivateRoute>} />
            <Route path="/dashboard_grupo" element={<PrivateRoute roles={['Grupo', 'Admin']}><Dashboard /></PrivateRoute>} />

            {/* ── Rotas protegidas — Projeto ── */}
            <Route path="/projeto" element={<PrivateRoute><Projeto /></PrivateRoute>} />
            <Route path="/projeto/:id" element={<PrivateRoute><Projeto /></PrivateRoute>} />
            <Route path="/entrega" element={<PrivateRoute><Entrega /></PrivateRoute>} />
            <Route path="/status" element={<PrivateRoute><Status /></PrivateRoute>} />

            {/* ── Rotas protegidas — Demanda ── */}
            <Route path="/cadastrar_demanda" element={<PrivateRoute roles={['Empreendedor', 'Admin']}><CadastrarDemanda /></PrivateRoute>} />
            <Route path="/classificar_demanda" element={<PrivateRoute roles={['Coordenador', 'Admin']}><ClassificarDemanda /></PrivateRoute>} />

            {/* ── Rotas protegidas — Dashboards ── */}
            <Route path="/aluno" element={<PrivateRoute roles={['Grupo']}><DashboardAluno /></PrivateRoute>} />
            <Route path="/coordenador" element={<PrivateRoute roles={['Coordenador', 'Admin']}><DashboardCoordenador /></PrivateRoute>} />
            <Route path="/empreendedor" element={<PrivateRoute roles={['Empreendedor', 'Admin']}><DashboardEmpreendedor /></PrivateRoute>} />
            <Route path="/CoordenadorEmAndamento" element={<PrivateRoute roles={['Coordenador', 'Admin']}><CoordenadorEmAndamento /></PrivateRoute>} />
            <Route path="/CoordenadorConcluidas" element={<PrivateRoute roles={['Coordenador', 'Admin']}><CoordenadorConcluidas /></PrivateRoute>} />
            <Route path="/EmpreendedorConcluidas" element={<PrivateRoute roles={['Empreendedor', 'Admin']}><EmpreendedorConcluidas /></PrivateRoute>} />
            <Route path="/EmpreendedorEmAndamento" element={<PrivateRoute roles={['Empreendedor', 'Admin']}><EmpreendedorEmAndamento /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute roles={['Admin']}><DashboardAdmin /></PrivateRoute>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}