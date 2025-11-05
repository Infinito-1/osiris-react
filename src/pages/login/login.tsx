import React from 'react'

function login() {
  return (
    <>
      <section className="login-section">
        <h1>Osíris</h1>
        <p>Acesse sua conta ou crie uma nova</p>

        <div className="tab-buttons">
          <button id="tab-login" className="active">Entrar</button>
          <button id="tab-register" className="inactive">Cadastrar</button>
        </div>

        <div className="login-box" id="loginBox">
          <div className="login-header">
            <img src="../../assets/img/login/arrowin.png" alt="Ícone de login" />
            <h2>Fazer Login</h2>
          </div>

          <div className="form-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" />
          </div>

          <div className="form-group">
            <label for="senha">Senha</label>
            <input type="password" id="senha" />
          </div>

          <button className="login-button">Entrar</button>
          <div className="forgot-password">
            <a href="esqueceusenha.html" id="esqueceu-senha"
              >Esqueceu sua senha?</a>
          </div>
        </div>

        <div className="register-box" id="registerBox">
          <div className="login-header">
            <img src="../../assets/img/login/PersonPlus.png" alt="Ícone de cadastro" />
            <h2>Criar Conta</h2>
          </div>

          <a href="./forms/empreendedorform.html">
            <button className="register-button empreendedor" id="btnEmpreendedor">
              Empreendedor
            </button>
          </a>
          <a href="./forms/estudantesform.html">
            <button className="register-button estudante" id="btnEstudante">
              Estudante
            </button>
          </a>
          <a href="./forms/docenteform.html">
            <button className="register-button docente" id="btnDocente">
              Docente
            </button>
          </a>
          <a href="./forms/coordenadorform.html">
            <button className="register-button coordenador" id="btnCoordenador">
              Coordenador
            </button>
          </a>
        </div>
      </section>
    </>
  )
}

export default login