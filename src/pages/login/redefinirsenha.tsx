import React from 'react'

function redefinirsenha() {
  return (
    <>
      <section className="login-section">
        <h1>Osíris</h1>
        <p>Acesse sua conta ou crie uma nova</p>

        {/* <!--Redefinir Senha--> */}
        <div className="login-box" id="loginBox">
          <div className="login-header">
            <img src="../../assets/img/login/arrowin.png" alt="Ícone de login" />
            <h2>Redefinição de Senha</h2>
          </div>

          <div className="form-group">
            <label for="email">Nova Senha:</label>
            <input type="email" id="email" />
          </div>

          <div className="form-group">
            <label for="senha">Confirme a Senha:</label>
            <input type="password" id="senha" />
          </div>

          <a href="login.html"><button className="login-button" id="reset-button">Redefinir</button></a>
          <div className="forgot-password">
              <a href="#" id="suporte-link">Problemas? Fale com nosso suporte aqui</a>
          </div>
        </div>
        {/* <!--Redefinir Senha--> */}
      </section>
    </>
  )
}

export default redefinirsenha