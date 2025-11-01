function Status() {
    return (
        <>
            <body>
                <main>
                    <h1>Status do Projeto</h1>

                    <form>
                        <label>Nome do projeto</label><br />
                        <input
                            type="text"
                            placeholder="Site E-commerce de amigurumi"
                        /><br /><br />

                        <label>Grupo</label><br />
                        <input type="text" placeholder="Os fulaninhos" /><br /><br />

                        <label>Aceite da coordenação</label>
                        <input type="text" placeholder="Reprovado" />

                        <label>Aceite do Professor orientador</label>
                        <input type="text" placeholder="Aprovado" /><br /><br />

                        <label>Data de entrega final para o empreendedor</label><br />
                        <input type="text" placeholder="Dia | Mês | Ano" />
                    </form>
                </main>
            </body>

        </>
    )
}

export default Status