function Dashboard_grupo() {
  return (
    <>
        <main>
            <h1>Dashboard do grupo nomeGrupo</h1>
            <p>Gerencie seu grupo e acompanhe o progresso do projeto</p>

            <section>
                <article>
                    <div>
                        <img src="../assets/img/icones/Bell.svg" />
                        <h2>Quadro de avisos</h2>
                    </div>
                    <p>Fique por dentro de lembretes e avisos enviados pela coordenação e  professores.</p>

                    {/* <!-- Modelo de card de aviso. Estrutura circula em carrossel de 3 lembretes por vez. --> */}
                    <div>
                        <div>
                            <h4>Título do alerta</h4>
                            <p>Descrição</p>
                        </div>
                        <div>
                            Data
                        </div>
                    </div>
                </article>

                <article>
                    <div>
                        <img src="../assets/img/icones/FileProject.svg" />
                        <h2>Projeto Atual</h2>
                    </div>
                    <h4>Título do projeto</h4>
                    <p>Empreendedor: Nome do Empreendedor</p>

                    <div>
                        <div>
                            <img src="../assets/img/icones/Clock.svg" />
                            <p>Em Andamento</p>
                        </div>
                        <div>
                            <img src="../assets/img/icones/calendario.svg" />
                            <p>Prazo: data</p>
                        </div>
                    </div>

                    <div>
                        <div>
                            <img src="../assets/img/icones/upload.svg" />
                            <p>Fazer Entrega</p>
                        </div>
                        <div>
                            <p>Ver detalhes</p>
                        </div>
                    </div>
                </article>

                <article>
                    <h2>Histórico de Entregas</h2>
                    <!-- Modelo de cartão para lista -->
                    <div>
                        <div>
                            <h4>Título do Projeto</h4>
                            <p>Data</p>
                        </div>
                        <button>Status</button>
                        <img src="../assets/img/icones/BoxArrowUpRight.svg" />
                    </div>
                </article>
            </section>

            <section>
                <article>
                    <h2>Informações do Grupo</h2>

                    <h5>Nome do Grupo</h5>
                    <p>nomeGrupo</p>

                    <h5>Representante</h5>
                    <p>nomeRepresentante</p>

                    <h5>RA:</h5>
                    <p>numRA</p>

                    <h5>Semestre:</h5>
                    <p>numSemestre</p>

                    <h5>Membros</h5>
                    <p>integrante2</p>
                    <p>integrante3</p>
                    <p>integrante4</p>
                    <p>integrante5</p>

                    <button>
                        <img src="../assets/img/icones/PencilSquare.svg" />
                        Editar
                    </button>
                </article>

                <article>
                    <h2>Galeria de Demandas</h2>
                    <p>Demandas disponíveis para novos projetos</p>

                    {/* <!-- Modelo de card de aviso. Estrutura circula em carrossel de 3 demandas por vez. --> */}
                    <div>
                        <h4>Título da demanda</h4>
                        <div>
                            <p>Status</p>
                            <p>Semestre</p>
                        </div>
                    </div>
                </article>
            </section>
        </main>

    </> 
  )
}

export default Dashboard_grupo