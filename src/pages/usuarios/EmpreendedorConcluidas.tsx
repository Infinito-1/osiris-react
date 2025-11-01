function EmpreendedorConcluidas() {
  return (
    <>
      <!-- Container principal -->
  <div class="container">
    <!-- Conteúdo Principal -->
    <main>
      <h2>Dashboard do Empreendedor</h2>
      <p>Gerencie suas demandas e projetos.</p>

      <!-- Seção: Demandas Concluídas -->
      <section id="concluidas">
        <h3>Demandas Concluídas</h3>

        <div>
          <h4>Sistema de Delivery</h4>
          <p><strong>Descrição:</strong> Plataforma para gerenciar entregas</p>
          <p><strong>Grupo:</strong> Infinito - 1</p>
          <p><strong>Status de conclusão:</strong> 100%</p>
          <progress value="100" max="100"></progress><br><br>
          <a href=""><button>Ver Projeto Final</button></a>
        </div>
      </section>
    </main>

    <!-- Barra Lateral -->
    <aside>
      <h3>Minhas Informações</h3>
      <p><strong>Nome:</strong> Carlos Oliveira</p>
      <p><strong>Email:</strong> carlos@emailpresa.com</p>
      <p><strong>Endereço:</strong> R. Inconfidentes</p>
      <p><strong>Bairro:</strong> Padre Pio Quinto</p>
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

export default EmpreendedorConcluidas