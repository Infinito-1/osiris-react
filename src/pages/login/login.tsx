import React from 'react'

function login() {
  return (
    <>
      <section class="login-section">
        <h1>Osíris</h1>
        <p>Acesse sua conta ou crie uma nova</p>

        <div class="tab-buttons">
          <button id="tab-login" class="active">Entrar</button>
          <button id="tab-register" class="inactive">Cadastrar</button>
        </div>

        <div class="login-box" id="loginBox">
          <div class="login-header">
            <img src="../../assets/img/login/arrowin.png" alt="Ícone de login" />
            <h2>Fazer Login</h2>
          </div>

          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" />
          </div>

          <div class="form-group">
            <label for="senha">Senha</label>
            <input type="password" id="senha" />
          </div>

          <button class="login-button">Entrar</button>
          <div class="forgot-password">
            <a href="esqueceusenha.html" id="esqueceu-senha"
              >Esqueceu sua senha?</a>
          </div>
        </div>

        <div class="register-box" id="registerBox">
          <div class="login-header">
            <img src="../../assets/img/login/PersonPlus.png" alt="Ícone de cadastro" />
            <h2>Criar Conta</h2>
          </div>

          <a href="./forms/empreendedorform.html">
            <button class="register-button empreendedor" id="btnEmpreendedor">
              Empreendedor
            </button>
          </a>
          <a href="./forms/estudantesform.html">
            <button class="register-button estudante" id="btnEstudante">
              Estudante
            </button>
          </a>
          <a href="./forms/docenteform.html">
            <button class="register-button docente" id="btnDocente">
              Docente
            </button>
          </a>
          <a href="./forms/coordenadorform.html">
            <button class="register-button coordenador" id="btnCoordenador">
              Coordenador
            </button>
          </a>
        </div>
      </section>
    </>
  )
}

export default login