import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home";
import Grupos from "./pages/home/Grupos";


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grupos" element={<Grupos />} />
          </Routes>

        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
