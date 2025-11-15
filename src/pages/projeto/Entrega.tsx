function Entrega() {
  return (
    <>
    <main>
      <h1>Entrega de Projeto</h1>

      <form>
        <label>Nome do projeto</label><br />
        <input type="text" /><br /><br />

        <label>Descrição breve sobre o que foi desenvolvido</label><br />
        <textarea></textarea><br /><br />

        <label>Grupo</label>
        <input type="text" />

        <label>Semestre</label>
        <input type="text" /><br /><br />

        <label>Professor orientador</label><br />
        <input type="text" /><br /><br />

        <label>Arquivo</label><br />
        <input type="file" /><br /><br />

        <button type="submit">Publicar</button>
      </form>
    </main>

    </> 
  )
}

export default Entrega