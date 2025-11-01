function docenteform() {
  return ( 
    <>
        <section className="login-section">
            <h1>Osíris</h1>
            <p>Acesse sua conta ou crie uma nova</p>

            {/* <!-- doecnte teste--> */}
            <div className="docente-form" id="docenteForm">
                <div className="top-icon">
                <img src="../../assets/img/login/prof.png" alt="Ícone de lâmpada" />
                </div>
                <h3>Sou Docente</h3>
                <p>Tenho um grupo de alunos para orientar</p>

                <div className="form-row">
                <div className="form-group">
                    <label for="nomeDoc">Nome Completo</label>
                    <input type="text" id="nomeDoc" />
                </div>

                <div className="form-group">
                    <label for="emailDoc">E-mail</label>
                    <input type="email" id="emailDoc" />
                </div>
                </div>

                <div className="form-row">
                <div className="form-group">
                    <label for="semestreDoc">Semestre Orientado</label>
                    <input type="text" id="semestreDoc" />
                </div>

                <div className="form-group">
                    <label for="disciplinaDoc">Disciplina</label>
                    <input type="text" id="disciplinaDoc" />
                </div>
                </div>

                <div className="form-group">
                <label for="senhaDoc">Senha</label>
                <input type="password" id="senhaDoc" />
                </div>

                <button>Criar Conta</button>
            </div>
        </section>
    </>
   )
}

export default docenteform