function Aluno() {
  return (
    <>
    <!-- Container principal -->
  <div class="container">
    <!-- Conteúdo principal -->
    <main>
      <h2>Dashboard do Aluno</h2>

      <!-- Quadro de Avisos -->
      <section>
        <h3>Quadro de Avisos</h3>
        <p>Fique por dentro de todas as notícias e avisos enviados pela coordenação e professores.</p>

        <ul id="avisos">
          <li><strong>Entrega de Projeto:</strong> 17/05/2023</li>
          <li><strong>Palestra de Tecnologia:</strong> 19/05/2023</li>
          <li><strong>Entrega de Relatório:</strong> 25/05/2023</li>
          <li><strong>Calendário de provas:</strong> até 30/05</li>
        </ul>

        <!-- Controle de navegação estilo carrossel -->
        <div>
          <button id="anteriorAviso">&lt;</button>
          <span id="indicadorPagina">1</span>
          <button id="proximoAviso">&gt;</button>
        </div>
      </section>

      <!-- Meu Portfólio -->
      <section>
        <h3>Meu Portfólio</h3>

        <div>
          <h4>Sistema de Gestão para Padaria</h4>
          <p><strong>Status:</strong> Entregue</p>
          <a href=""><button>Ver Projeto</button></a>
        </div>

        <div>
          <h4>Sistema de Gestão para Petshop</h4>
          <p><strong>Status:</strong> Entregue</p>
          <a href=""><button>Ver Projeto</button></a>
        </div>

        <div>
          <h4>Sistema de Gestão para Oficina</h4>
          <p><strong>Status:</strong> Em desenvolvimento</p>
          <a href=""><button>Ver Projeto</button></a>
        </div>
      </section>
    </main>

    <!-- Barra lateral -->
    <aside>
      <h3>Minhas Informações</h3>
      <p><strong>Nome:</strong> João Santos</p>
      <p><strong>Email:</strong> joao.santos@fatec.sp.gov.br</p>
      <p><strong>RA:</strong> 123456789</p>
      <p><strong>Curso:</strong> Sistemas para Internet</p>
      <a href=""><button>Editar</button></a>

      <h3>Meu Grupo</h3>
      <p><strong>Nome do Grupo:</strong> Osiris</p>
      <p><strong>Membros:</strong> João Santos, Ana Rodrigues, Lucas Almeida</p>
      <a href=""><button>Acessar Dashboard do Grupo</button></a><br>
      <a href=""><button>Cadastrar Grupo</button></a>
      <a href=""><button>Grupos em aberto</button></a>
    </aside>
  </div>

  <!-- Rodapé -->
  <footer>
    <nav>
      
    </nav>
  </footer>

  <!-- Script para lógica futura do carrossel -->
  <script>
    /*
    const avisos = [
      [
        "Entrega de Projeto: 17/05/2023",
        "Palestra de Tecnologia: 19/05/2023"
      ],
      [
        "Entrega de Relatório: 25/05/2023",
        "Calendário de provas: até 30/05"
      ]
    ];

    let paginaAtual = 0;

    function atualizarAvisos() {
      const lista = document.getElementById("avisos");
      lista.innerHTML = avisos[paginaAtual]
        .map(item => `<li><strong>${item}</strong></li>`)
        .join("");
      document.getElementById("indicadorPagina").textContent = paginaAtual + 1;
    }

    document.getElementById("proximoAviso").addEventListener("click", function() {
      paginaAtual = (paginaAtual + 1) % avisos.length;
      atualizarAvisos();
    });

    document.getElementById("anteriorAviso").addEventListener("click", function() {
      paginaAtual = (paginaAtual - 1 + avisos.length) % avisos.length;
      atualizarAvisos();
    });
    */
  </script>


    </> 
  )
}

export default Aluno