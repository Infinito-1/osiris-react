function CoodernadorConcluidas() {
  return (
    <>
    <!-- Container principal -->
  <div class="container">
    <!-- Conteúdo principal -->
    <main>
      <h2>Dashboard do Coordenador</h2>
      <p>Gerencie demandas e acompanhe projetos do curso.</p>

      <!-- Seção: Projetos Concluídos -->
      <section id="concluidos">
        <h3>Projetos Concluídos</h3>

        <div>
          <h4>App de Gestão de Academia</h4>
          <p><strong>Coordenador:</strong> Bruna</p>
          <p><strong>Semestre:</strong> 6º</p>
          <p><strong>Nota Final:</strong> 9.5</p>
          <a href=""><button>Ver Detalhes Completos</button></a>
        </div>
      </section>
    </main>

    <!-- Barra lateral -->
    <aside>
      <h3>Minhas Informações</h3>
      <p><strong>Nome:</strong> Professora Bruna</p>
      <p><strong>Email:</strong> bruna@gmail.com</p>
      <p><strong>Departamento:</strong> Coordenação de DSM</p>

      <h3>Estatísticas Gerais</h3>
      <a href=""><button>Demandas Pendentes: 3</button></a><br>
      <a href=""><button>Em Andamento: 7</button></a><br>
      <a href=""><button>Concluídos: 9</button></a>

      <h3>Relatórios</h3>
      <a href=""><button>Relatório Mensal</button></a><br>
      <a href=""><button>Relatório Semestral</button></a>
    </aside>
  </div>

    </> 
  )
}

export default CoodernadorConcluidas