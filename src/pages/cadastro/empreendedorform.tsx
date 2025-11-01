function empreendedorform() {
  return ( 
    <>
        <section className="login-section">
            <h1>Osíris</h1>
            <p>Acesse sua conta ou crie uma nova</p>

            <div className="empreendedor-form" id="empreendedorForm">
                <div className="top-icon">
                <img src="../../assets/img/login/lamp.png" alt="Ícone de lâmpada" />
                </div>
                <h3>Sou Empreendedor</h3>
                <p>Tenho uma demanda e preciso de uma solução digital</p>

                <div className="form-row">
                <div className="form-group">
                    <label for="nomeEmp">Nome Completo</label>
                    <input type="text" id="nomeEmp" />
                </div>

                <div className="form-group">
                    <label for="emailEmp">E-mail</label>
                    <input type="email" id="emailEmp" />
                </div>
                </div>

                <div className="form-row">
                <div className="form-group">
                    <label for="telefoneEmp">Telefone</label>
                    <input type="text" id="telefoneEmp" />
                </div>

                <div className="form-group">
                    <label for="empresaEmp">Empresa / Negócio</label>
                    <input type="text" id="empresaEmp" />
                </div>
                </div>

                <div className="form-group">
                <label for="senhaEmp">Senha</label>
                <input type="password" id="senhaEmp" />
                </div>

                <button>Criar Conta</button>
            </div>
        </section>

    </>
   )
}

export default empreendedorform