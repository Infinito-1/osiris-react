function ProfessorLembrete() {
  return (
    <>
    <body>

  <section>
    <h2>Minhas Informações</h2>
    <p>Envie um aviso para o quadro de avisos dos alunos</p>

    <form>
      <!-- Destinatário -->
      <label for="destinatario">Destinatário</label><br>
      <select id="destinatario" name="destinatario">
        <option value="">Selecione um grupo</option>
      </select><br><br>

      <!-- Tipo de Aviso -->
      <label for="tipo">Tipo de Aviso</label><br>
      <select id="tipo" name="tipo">
        <option value="">Selecione o tipo</option>
      </select><br><br>

      <!-- Título -->
      <label for="titulo">Título</label><br>
      <input type="text" id="titulo" name="titulo" placeholder="Ex: Reunião de Orientação"><br><br>

      <!-- Mensagem -->
      <label for="mensagem">Mensagem</label><br>
      <textarea id="mensagem" name="mensagem" rows="5" placeholder="Digite sua mensagem..."></textarea><br><br>

      <!-- Botão de envio -->
      <button type="submit">Enviar Lembrete</button>
    </form>

    <br><br>

    <!-- Botão de retorno -->
    <a href="./Professor.html"><button>Voltar para o Início</button></a>
  </section>

</body>

    </> 
  )
}

export default ProfessorLembrete