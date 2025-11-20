import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Grupos from "./pages/grupo/Grupos";
import SobreGrupo from "./pages/grupo/Perfil_grupo";
import FormGrupo from "./pages/grupo/Form_grupo";
import Dashboard from "./pages/grupo/Dashboard_grupo";
import Login from "./pages/login/login";
import EsqueceuSenha from "./pages/login/esqueceusenha";
import CodigoSenha from "./pages/login/codigosenha";
import RedefinirSenha from "./pages/login/redefinirsenha";
import EmpreendedorForm from "./pages/cadastro/empreendedorform";
import EstudantesForm from "./pages/cadastro/estudantesform";
import DocenteForm from "./pages/cadastro/docenteform";
import CoordenadorForm from "./pages/cadastro/coordenadorform";
import Projeto from "./pages/projeto/Projeto";
import Entrega from "./pages/projeto/Entrega";
import Status from "./pages/projeto/Status";
import CadastrarDemanda from "./pages/demanda/Cadastrar_demanda";
import ClassificarDemanda from "./pages/demanda/Classificar_demanda";
import GaleriaDemanda from "./pages/demanda/Demandas";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[80vh]">
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
            <Route path="/cadastro/docente" element={<DocenteForm />} />
            <Route path="/cadastro/coordenador" element={<CoordenadorForm />} />
            <Route path="/projeto" element={<Projeto />} />
            <Route path="/entrega" element={<Entrega />} />
            <Route path="/status" element={<Status />} />
            <Route path="/cadastrar_demanda" element={<CadastrarDemanda />} />
            <Route path="/classificar_demanda" element={<ClassificarDemanda />} />
            <Route path="/demandas" element={<GaleriaDemanda />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
