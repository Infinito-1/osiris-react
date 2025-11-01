function estudantesform() {
  return (
  <>
    <section className="login-section">
      <h1>Osíris</h1>
      <p>Acesse sua conta ou crie uma nova</p>

      {/* <!--estudante--> */}

      <div className="estudante-form" id="estudanteForm">
        <div className="top-icon">
          <img src="../../assets/img/login/hat.png" alt="Ícone Estudante" />
        </div>
        <h3>Sou Estudante</h3>
        <p>Quero participar de projetos reais e ganhar experiência</p>

        <div className="form-group">
          <label for="nomeRep">Nome do Representante</label>
          <input type="text" id="nomeRep" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label for="emailStud">E-mail</label>
            <input type="email" id="emailStud" />
          </div>

          <div className="form-group">
            <label for="raStud">RA (Registro Acadêmico)</label>
            <input type="text" id="raStud" />
          </div>
        </div>

        <div className="form-group">
          <label for="semestre">Semestre Atual</label>
          <input type="text" id="semestre" />
        </div>

        <div className="form-group">
          <label for="membros">Membros do Grupo</label>
          <textarea id="membros"></textarea>
        </div>

        <div className="form-group">
          <label for="senhaStud">Senha</label>
          <input type="password" id="senhaStud" />
        </div>

        <button className="register-button estudante">Criar Conta</button>
      </div>
    </section>
  </> 
  )
}

export default estudantesform