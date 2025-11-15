import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home";
import Grupos from "./pages/grupo/Grupos";
import SobreGrupo from "./pages/grupo/Perfil_grupo";
import FormGrupo from "./pages/grupo/Form_grupo";
import Dashboard from "./pages/grupo/Dashboard_grupo";


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
          </Routes>

        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
