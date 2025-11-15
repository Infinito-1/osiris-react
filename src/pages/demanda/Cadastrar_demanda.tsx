function Cadastrar_demanda() {
  return ( 
        <>
        <section className="login-section">
            <div className="login-box" id="loginBox">
                <div className="login-header">
                    <h2>Cadatrar Demanda</h2>
                </div>

                <div className="form-group">
                    <label for="email">Nome da demanda/ projeto a ser desenvolvido</label>
                    <input type="email" id="email" />
                </div>

                <div className="form-group">
                    <label for="senha">Descrição. Aqui você poderá nos detalhar quais são as suas necessidades</label>
                    <input type="password" id="senha" />
                </div>
                <div className="form-group">
                    <label for="email">Tipo</label>
                    <input type="text" placeholder="Site | Aplicativo | Outro? Especifique:">
                </div>

                <div className="form-group">
                    <label for="senha">Aceita proposta de mudança no tipo?</label>
                    <input type="text" placeholder="Sim | Não | Talvez">
                </div>

                <button className="login-button">publicar</button>
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
                </button></a>            
            </div>
        </section>
    </>
   )
}

export default Cadastrar_demanda