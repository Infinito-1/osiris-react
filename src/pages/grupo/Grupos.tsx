function Grupos() {
  return (
    <>
        <main>
            <section>
                <h1>Grupos</h1>
                <p>Conheça os grupos de estudantes</p>

                <form action="#" method="submit" id="formulario">
                    <label for="nome">Nome: </label>
                    <input id="name" type="text" name="name" placeholder="Busque um Projeto" required />
                    <span id="txtNome"></span>
                    <button type="submit"><img src="../assets/img/icones/lupa.svg"/></button>
                </form>

                <button>
                    <img src="../assets/img/icones/pessoas.svg"> 
                    <p>Formar Equipe</p>
                </button>
        </section>

        <section>
            <!-- MODELO DE CARD QUE RECEBERÁ OS DADOS -->
            <div>
                <img src="../assets/img/icones/pessoas.svg" />
                <h3>Nome do Grupo</h3>
            </div>

            <p>DESCRIÇÃO DO GRUPO. EX: "Especialistas em desenvolvimento de aplicações web modernas, utilizando tecnologias como React, Node.js e bancos de dados."</p>

            <div>
                <img src="../assets/img/icones/Person.svg">
                <h5> Nº Membros - Nº Semestre </h5>
            </div>

            <button>Ver Detalhes</button>
            <button>Solicitar Entrada</button>

        </section>


        </main>

    </> 
  )
}

export default Grupos