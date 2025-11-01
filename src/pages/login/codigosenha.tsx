import React from 'react'

function codigosenha() {
  return (
    <>
      <section class="login-section">
        <h1>Osíris</h1>
        <p>Acesse sua conta ou crie uma nova</p>

        {/* <!--Verificar Código--> */}
        <div class="login-box" id="codeBox">
          <div class="login-header">
            <img src="../../assets/img/login/arrowin.png" alt="Ícone de login" />
            <h2>Redefinição de Senha</h2>
          </div>

          <div class="form-group">
            <label for="email">Digite o Código enviado:</label>
            <input type="email" id="email" />
          </div>

          <a href="redefinirsenha.html"><button class="login-button" id="code-button">Verificar</button></a>
          <div class="forgot-password">
            <a href="#" id="suporte-link">Problemas? Fale com nosso suporte aqui</a>
          </div>
        </div>
        {/* <!--Verificar Código--> */}
      </section>
    </>
  )
}

export default codigosenha