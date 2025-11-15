function Coordenador() {
  return (
    <>
    <!-- Botões de Abas -->
  <nav>
    <a href="./Coordenador.html"><button>Demandas Pendentes</button></a>
    <a href="./CoordenadorEmAndamento.html"><button>Em Andamento</button></a>
    <a href="./CoodernadorConcluidas.html"><button>Concluídos</button></a>
  </nav>

  <!-- Container principal -->
  <div class="container">
    <!-- Conteúdo Principal -->
    <main>
      <h2>Dashboard do Coordenador</h2>

      <!-- Seção: Demandas Pendentes -->
      <section id="pendentes">
        <h3>Demandas Pendentes</h3>

        <div>
          <h4>App de Gestão de Academia</h4>
          <p><strong>Descrição:</strong> Aplicativo para controle de treinos e frequência de alunos</p>
          <p><strong>Empreendedora:</strong> Raquel Queiroz</p>
          <p><strong>Empresa:</strong> Super Fit</p>
          <p><strong>Data de envio:</strong> 10/05/2024</p>
          <a href=""><button>Analisar e Classificar</button></a>
        </div>

        <div>
          <h4>App de Gestão de Academia</h4>
          <p><strong>Descrição:</strong> Aplicativo para controle de treinos e frequência de alunos</p>
          <p><strong>Empreendedora:</strong> Raquel Queiroz</p>
          <p><strong>Empresa:</strong> Super Fit</p>
          <p><strong>Data de envio:</strong> 10/05/2024</p>
          <a href=""><button>Analisar e Classificar</button></a>
        </div>

        <div>
          <h4>App de Gestão de Academia</h4>
          <p><strong>Descrição:</strong> Aplicativo para controle de treinos e frequência de alunos</p>
          <p><strong>Empreendedora:</strong> Raquel Queiroz</p>
          <p><strong>Empresa:</strong> Super Fit</p>
          <p><strong>Data de envio:</strong> 10/05/2024</p>
          <a href=""><button>Analisar e Classificar</button></a>
        </div>
      </section>
    </main>

    <!-- Barra Lateral -->
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

export default Coordenador