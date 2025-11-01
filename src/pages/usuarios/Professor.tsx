function Professor() {
  return (
    <>
    <!-- Container principal -->
  <div class="container">
    <!-- Conteúdo principal -->
    <main>
      <h2>Dashboard do Professor</h2>

      <!-- Grupos Orientados -->
      <section>
        <h3>Grupos Orientados</h3>

        <div>
          <h4>Grupo: Os Fulaninhos</h4>
          <p><strong>Representante:</strong> Pedro Alves</p>
          <p><strong>Semestre:</strong> 3º</p>
          <p><strong>Projeto:</strong> Sistema de Gestão para Padaria</p>
          <a href=""><button>Ver Detalhes</button></a>
          <a href=""><button>Agendar Reunião</button></a>
        </div>

        <div>
          <h4>Grupo: Os Fulaninhos</h4>
          <p><strong>Representante:</strong> Pedro Alves</p>
          <p><strong>Semestre:</strong> 4º</p>
          <p><strong>Projeto:</strong> Sistema de Gestão para Padaria</p>
          <a href=""><button>Ver Detalhes</button></a>
          <a href=""><button>Agendar Reunião</button></a>
        </div>
      </section>

      <!-- Demandas Pendentes -->
      <section>
        <h3>Demandas Pendentes</h3>

        <div>
          <h4>App Vida Melhor</h4>
          <p><strong>Data de Entrega:</strong> 19/05/2025</p>
          <p><strong>Status:</strong> Aguardando Avaliação</p>
          <a href=""><button>Visualizar Projeto</button></a>
          <a href="./ProfessorAvaliar.html"><button>Avaliar</button></a>
        </div>
      </section>

      <!-- Projetos Entregues -->
      <section>
        <h3>Projetos Entregues</h3>

        <div>
          <h4>Projeto II</h4>
          <p><strong>Data de Entrega:</strong> 19/05/2025</p>
          <p><strong>Status:</strong> Avaliado</p>
          <a href=""><button>Visualizar Projeto</button></a>
        </div>

        <div>
          <h4>Projeto Final</h4>
          <p><strong>Data de Entrega:</strong> 20/05/2025</p>
          <p><strong>Status:</strong> Avaliado</p>
          <a href=""><button>Visualizar Projeto</button></a>
        </div>
      </section>
    </main>

    <!-- Barra lateral -->
    <aside>
      <h3>Minhas Informações</h3>
      <p><strong>Nome:</strong> Arthur</p>
      <p><strong>Email:</strong> arthur7@gmail.com</p>
      <p><strong>Função:</strong> Professor</p>
      <p><strong>Área:</strong> Estrutura de Dados</p>

      <h3>Estatísticas Gerais</h3>
      <a href=""><button>Grupos Orientando: 2</button></a><br>
      <a href=""><button>Entregas Pendentes: 1</button></a><br>
      <a href=""><button>Entregas Avaliadas: 1</button></a>

      <h3>Lembretes Enviados</h3>
      <ul>
        <li>Grupo Infinito - 1: Entrega do Projeto Final (20/05/2025) - Prazo: 30/01/2025</li>
        <li>Todos os Grupos: Apresentação do Vestiário (17/05/2025)</li>
      </ul>
    </aside>
  </div>

    </> 
  )
}

export default Professor