function ProfessorAvaliar() {
  return (
    <>
    <body>

  <section>
    <h2>Avaliar Entrega</h2>
    <p>Grupo Teste - App Yoga Mobile</p>

    <form>
      <!-- Status -->
      <label for="status">Status</label><br>
      <select id="status" name="status">
        <option value="">Selecione</option>
        <!-- Adicione opções como "Aprovado", "Reprovado", etc. -->
      </select><br><br>

      <!-- Nota -->
      <label for="nota">Nota</label><br>
      <input type="number" id="nota" name="nota" step="0.1" value="8.5"><br><br>

      <!-- Feedback -->
      <label for="feedback">Feedback</label><br>
      <textarea id="feedback" name="feedback" rows="5" placeholder="Comentários sobre o projeto..."></textarea><br><br>

      <!-- Botão de envio -->
      <button type="submit">Enviar Avaliação</button>
    </form>

    <br><br>

    <!-- Botão de retorno -->
    <a href=""><button>Voltar para o Início</button></a>
  </section>

</body>

    </> 
  )
}

export default ProfessorAvaliar