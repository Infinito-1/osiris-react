import React from 'react'

function esqueceusenha() {
  return (
    <>
      <section class="login-section">
        <h1>Osíris</h1>
        <p>Acesse sua conta ou crie uma nova</p>

        
        {/* <!--Digitar E-mail--> */}
        <div class="login-box" id="emailBox">
          <div class="login-header">
            <img src="../../assets/img/login/arrowin.png" alt="Ícone de login" />
            <h2>Redefinição de Senha</h2>
          </div>

          <div class="form-group">
            <label for="email">Digite o E-mail cadastrado:</label>
            <input type="email" id="email" />
          </div>

          <a href="codigosenha.html"><button class="login-button" id="email-button">Enviar Código para meu E-mail</button></a>
          <div class="forgot-password">
            <a href="#" id="suporte-link">Problemas? Fale com nosso suporte aqui</a>
          </div>
          {/* <!--Digitar E-mail--> */}
        </div>
      </section>
    </>
  )
}

export default esqueceusenha