function Empreendedor() {
  return (
    <>
     <!-- Container principal -->
  <div class="container">
    <!-- Conteúdo Principal -->
    <main>
      <h2>Dashboard do Empreendedor</h2>

      <!-- Seção: Demandas Abertas -->
      <section id="abertas">
        <h3>Demandas Abertas</h3>

        <div>
          <h4>Sistema de Gestão de Estoque</h4>
          <p><strong>Descrição:</strong> Sistema para ajudar a gerenciar entradas e saídas de produtos</p>
          <p><strong>Status:</strong> Aberta</p>
          <p><strong>Grupos Interessados:</strong> 3</p>
          <a href=""><button>Editar</button></a>
          <a href=""><button>Excluir</button></a>
        </div>

        <div>
          <h4>Sistema de Gestão de Estoque</h4>
          <p><strong>Descrição:</strong> Sistema para ajudar a gerenciar entradas e saídas de produtos</p>
          <p><strong>Status:</strong> Em Andamento</p>
          <p><strong>Grupos Interessados:</strong> 3</p>
          <a href=""><button>Editar</button></a>
          <a href=""><button>Excluir</button></a>
        </div>
      </section>
    </main>

    <!-- Barra Lateral -->
    <aside>
      <h3>Minhas Informações</h3>
      <p><strong>Nome:</strong> Carlos Oliveira</p>
      <p><strong>Email:</strong> carlos@email.com</p>
      <p><strong>Empresa:</strong> Empresa X</p>
      <p><strong>Telefone:</strong> (11) 98765-4321</p>
      <a href=""><button>Editar</button></a>

      <h3>Estatísticas</h3>
      <a href=""><button>Demandas Abertas: 3</button></a><br>
      <a href=""><button>Em Andamento: 3</button></a><br>
      <a href=""><button>Concluídas: 3</button></a>
    </aside>
  </div>

    </> 
  )
}

export default Empreendedor