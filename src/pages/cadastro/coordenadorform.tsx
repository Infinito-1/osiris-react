
function coordenadorform() {
  return ( 
  <>
    <section className="login-section">
      <h1>Osíris</h1>
      <p>Acesse sua conta ou crie uma nova</p>

      {/* <!--coordenador--> */}

      <div className="coordenador-form" id="coordenadorForm">
        <div className="top-icon">
          <img src="../../assets/img/login/book.png" alt="Ícone Coordenador" />
        </div>
        <h3>Sou Cordenador</h3>
        <p>Preciso verificar demandas</p>

        <div className="form-group">
          <label for="nomeCoo">Nome</label>
          <input type="text" id="nomeCoo" />
        </div>

        <div className="form-group">
          <label for="emailCoo">E-mail</label>
          <input type="email" id="emailCoo" />
        </div>

        <div className="form-group">
          <label for="cursoCoo">Curso</label>
          <input type="text" id="cursoCoo" />
        </div>

        <div className="form-group">
          <label for="senhaStud">Senha</label>
          <input type="password" id="senhaStud" />
        </div>

        <button className="register-button coordenador">Criar Conta</button>
      </div>
    </section>
  </> )
}

export default coordenadorform