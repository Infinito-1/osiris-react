function Perfil_grupo() {
    return (
    <>
        <main>
            <h1>Nome do grupo</h1>
            <div>
                <img src="../assets/img/icones/Person.svg" />
                <h5>Nº Membros</h5>
                <img src="../assets/img/icones/calendario.svg" />
                <h5>Nº Semestre</h5>
            </div>

            <section>
                <div>
                    <h3>Sobre o Grupo</h3>
                    <p>DESCRIÇÃO DO GRUPO. EX: "Especialistas em desenvolvimento de aplicações web modernas, utilizando tecnologias como React, Node.js e bancos de dados."</p>

                    <h3>Integrantes</h3>
                    <ul>
                        <li>integrante2</li>
                        <li>integrante3</li>
                        <li>integrante4</li>
                        <li>integrante5</li>
                    </ul>

                    <h3>Mais informações</h3>
                    <div>
                        <p>Representante:</p>
                        <p>nomeRepresentante</p>
                    </div>
                    <hr>

                        <div>
                            <p>RA:</p>
                            <p>numRA</p>
                        </div>
                        <hr>

                            <div>
                                <p>Semestre:</p>
                                <p>numSemestre</p>
                            </div>

                            <button>Enviar Mensagem</button>
                            <button>Solicitar Entrada</button>
                        </div>

                        <div>
                            <img src="../assets/img/icones/pin.svg" />
                            <h3>Portfólio</h3>

                            {/* <!-- MODELO LISTA PROJETOS DO GRUPO --> */}

                            <h4>Título do projeto</h4>
                            <p>Descrição do projeto</p>
                            <div>
                                <button>Deploy</button>
                                <button>GitHub</button>
                            </div>
                        </div>

            </section>
        </main>

    </>
 )
}

export default Perfil_grupo