function Footer() {
  return (
    <footer className="bg-[#021926] text-[#dad4c8] pt-[50px] px-[80px] pb-[20px] mt-[80px]">
      {/* Colunas */}
      <div className="grid grid-cols-3 gap-[40px] mb-[30px]">
        <div>
          <h3 className="text-[1.3rem] mb-[10px]">Osíris</h3>
          <h4 className="text-[1rem] -mt-[5px] text-[#bab9b5]">
            Fatec Zona Leste
          </h4>
          <p className="leading-[1.6] text-[0.95rem] text-[#dad4c8]">
            Conectando empreendedores com estudantes de tecnologia para criar
            soluções inovadoras.
          </p>
        </div>

        <div>
          <h3 className="text-[1.3rem] mb-[10px]">Links Rápidos</h3>
          <a
            href="#"
            className="block leading-[1.6] text-[0.95rem] text-[#dad4c8] no-underline hover:underline"
          >
            Projetos
          </a>
          <a
            href="#"
            className="block leading-[1.6] text-[0.95rem] text-[#dad4c8] no-underline hover:underline"
          >
            Como Funciona
          </a>
          <a
            href="#"
            className="block leading-[1.6] text-[0.95rem] text-[#dad4c8] no-underline hover:underline"
          >
            Grupos
          </a>
        </div>

        <div>
          <h3 className="text-[1.3rem] mb-[10px]">Contato</h3>
          <p className="leading-[1.6] text-[0.95rem] text-[#dad4c8]">
            contato@osiris.fatec.sp.gov.br
          </p>
          <p className="leading-[1.6] text-[0.95rem] text-[#dad4c8]">
            📞 (11) 2024-8000
          </p>
          <p className="leading-[1.6] text-[0.95rem] text-[#dad4c8]">
            📍 Fatec Zona Leste, São Paulo - SP
          </p>
        </div>
      </div>

      {/* Linha divisória */}
      <div className="border-t border-[#dad4c8] mb-[15px]"></div>

      {/* Rodapé inferior */}
      <div className="text-center text-[0.9rem]">
        © 2025 Osíris - Fatec Zona Leste. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;
