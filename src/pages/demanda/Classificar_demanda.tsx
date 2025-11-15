function Classificar_demanda() {
  return ( 
    <>
        <section className="login-section">
        

        <div className="login-box" id="loginBox">
            <div className="login-header">
            <h2>ClassNameificação da demanda</h2>
            </div>

            <div className="form-group">
            <label for="email">Nome da demanda/ projeto a ser desenvolvido</label>
            <input type="text" placeholder="Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados. "     >
            </div>

            <div className="form-group">
            <label for="senha">Descrição. Aqui você poderá nos detalhar quais são as suas necessidades</label>
            <input type="text" placeholder="1° semestre | 2° semestre | 3° semestre......">
            </div>
            <div className="form-group">
            <label for="senha">Descrição breve sobre quais os requisitos exigidos para esse Projeto</label>
            <input type="password" id="senha" />
            </div>
            <div className="form-group">
            <label for="email">Tipo</label>
            <input type="text" placeholder="Site | Mobile | Outro:">
            </div>

            <div className="form-group">
            <label for="senha">Aceita proposta de mudança no tipo?</label>
            <input type="text" placeholder="Básico | Intermediário | Dificil">
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
            </button>
            </a>
        </div>
        </section>
    </>
   )
}

export default Classificar_demanda