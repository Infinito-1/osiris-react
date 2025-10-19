import React from 'react'

function Footer() {
  return (
    <>
      <footer>
        <div class="footer-columns">
          <div class="footer-column">
            <h3>Osíris</h3>
            <h4>Fatec Zona Leste</h4>
            <p>
              Conectando empreendedores com estudantes de tecnologia para criar
              soluções inovadoras.
            </p>
          </div>
          <div class="footer-column">
            <h3>Links Rápidos</h3>
            <a href="#">Projetos</a>
            <a href="#">Como Funciona</a>
            <a href="#">Grupos</a>
          </div>
          <div class="footer-column">
            <h3>Contato</h3>
            <p>contato@osiris.fatec.sp.gov.br</p>
            <p>📞 (11) 2024-8000</p>
            <p>📍 Fatec Zona Leste, São Paulo - SP</p>
          </div>
        </div>

        <div class="footer-divider"></div>
        <div class="footer-bottom">
          © 2025 Osíris - Fatec Zona Leste. Todos os direitos reservados.
        </div>
      </footer>

    </>
  )
}

export default Footer