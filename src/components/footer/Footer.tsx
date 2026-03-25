import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="flex flex-col bg-[#F1F7EE]">
        <footer className="bg-[#021926] text-[#dad4c8] pt-8 sm:pt-12 md:pt-[50px] px-4 sm:px-6 md:px-[80px] pb-5 sm:pb-[20px] mt-12 sm:mt-16 md:mt-[80px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-[40px] mb-6 sm:mb-[30px]">
            <div>
              <h3 className="text-lg sm:text-xl md:text-[1.3rem] font-semibold mb-2 sm:mb-[10px]">
                Osíris
              </h3>
              <h4 className="text-sm sm:text-base md:text-[1rem] -mt-1 sm:-mt-[2px] md:-mt-[5px] text-[#bab9b5] font-medium mb-3">
                Fatec Zona Leste
              </h4>
              <p className="leading-relaxed sm:leading-[1.6] text-xs sm:text-sm md:text-[0.95rem] text-[#dad4c8]">
                Conectando empreendedores com estudantes de tecnologia para criar
                soluções inovadoras.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl md:text-[1.3rem] font-semibold mb-3 sm:mb-[10px]">
                Links Rápidos
              </h3>
              <nav className="space-y-2 sm:space-y-1">
                <Link
                  to="/demandas"
                  className="block leading-relaxed sm:leading-[1.6] text-xs sm:text-sm md:text-[0.95rem] text-[#dad4c8] no-underline hover:underline transition-all duration-200"
                >
                  Projetos
                </Link>
                <Link
                  to="/#como-funciona"
                  className="block leading-relaxed sm:leading-[1.6] text-xs sm:text-sm md:text-[0.95rem] text-[#dad4c8] no-underline hover:underline transition-all duration-200"
                >
                  Como Funciona
                </Link>
                <Link
                  to="/grupos"
                  className="block leading-relaxed sm:leading-[1.6] text-xs sm:text-sm md:text-[0.95rem] text-[#dad4c8] no-underline hover:underline transition-all duration-200"
                >
                  Grupos
                </Link>
              </nav>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl md:text-[1.3rem] font-semibold mb-3 sm:mb-[10px]">
                Contato
              </h3>
              <div className="space-y-2">
                <p className="leading-relaxed sm:leading-[1.6] text-xs sm:text-sm md:text-[0.95rem] text-[#dad4c8] break-all">
                  contato@osiris.fatec.sp.gov.br
                </p>
                <p className="leading-relaxed sm:leading-[1.6] text-xs sm:text-sm md:text-[0.95rem] text-[#dad4c8]">
                  📞 (11) 2024-8000
                </p>
                <p className="leading-relaxed sm:leading-[1.6] text-xs sm:text-sm md:text-[0.95rem] text-[#dad4c8]">
                  📍 Fatec Zona Leste, São Paulo - SP
                </p>
              </div>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="border-t border-[#dad4c8] mb-4 sm:mb-[15px]"></div>

          <div className="text-center text-[0.8rem] sm:text-[0.9rem] text-[#bab9b5]">
            © 2025 Osíris - Fatec Zona Leste. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
