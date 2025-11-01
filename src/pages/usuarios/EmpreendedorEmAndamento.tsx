function EmpreendedorEmAndamento() {
  return (
    <>
    <!-- Container principal -->
  <div class="container">
    <!-- Conteúdo Principal -->
    <main>
      <h2>Dashboard do Empreendedor</h2>
      <p>Gerencie suas demandas e projetos.</p>

      <!-- Seção: Demandas -->
      <section id="demandas">
        <h3>Demandas Abertas</h3>

        <div>
          <h4>Site Institucional</h4>
          <p><strong>Descrição:</strong> Website para divulgar produtos e história de empresa</p>
          <p><strong>Grupo:</strong> Os Fulaninhos</p>
          <p><strong>Status de conclusão:</strong> 65%</p>
          <progress value="65" max="100"></progress><br><br>
          <a href=""><button>Ver Detalhes Completos</button></a>
        </div>
      </section>
    </main>

    <!-- Barra Lateral -->
    <aside>
      <h3>Minhas Informações</h3>
      <p><strong>Nome:</strong> Carlos Oliveira</p>
      <p><strong>Email:</strong> carlos@empresa.com</p>
      <p><strong>Função:</strong> Empreendedor</p>
      <p><strong>Grupo:</strong> Os Fulaninhos</p>
      <p><strong>Telefone:</strong> (11) 98765-4321</p>
      <a href=""><button>Editar</button></a>

      <h3>Estatísticas</h3>
      <a href=""><button>Demandas Abertas: 3</button></a><br>
      <a href=""><button>Em Andamento: 2</button></a><br>
      <a href=""><button>Concluídas: 1</button></a>
    </aside>
  </div>


    </> 
  )
}

export default EmpreendedorEmAndamento