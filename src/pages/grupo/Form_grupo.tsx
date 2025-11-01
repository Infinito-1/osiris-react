function From_grupo() {
  return (
    <>
        <main>
            <h2>Formulário de cadastro do grupo</h2>
            <form action="#" method="submit" id="formulario">
                <label for="grupo">Nome do grupo</label>
                <input id="grupo" type="text" name="grupo" placeholder="Digite o nome do grupo" required />

                <label for="semestre">Semestre</label>
                <select id="semestre" name="semestre" required>
                    <option value="1">1º Semestre</option>
                    <option value="2">2º Semestre</option>
                    <option value="3">3º Semestre</option>
                    <option value="4">4º Semestre</option>
                    <option value="5">5º Semestre</option>
                    <option value="6">6º Semestre</option>
                </select>

                <label for="representante">Representante</label>
                <input id="representante" type="text" name="representante" placeholder="Digite o nome do representante" required />

                <label for="ra1">RA</label>
                <input id="ra1" type="number" name="ra1" placeholder="Digite o RA" required />

                <label for="integrante2">Integrante</label>
                <input id="integrante2" type="text" name="integrante2" placeholder="Digite o nome do integrante" required />

                <label for="ra2">RA</label>
                <input id="ra2" type="number" name="ra2" placeholder="Digite o RA" required />

                <label for="integrante3">Integrante</label>
                <input id="integrante3" type="text" name="integrante3" placeholder="Digite o nome do integrante" required />

                <label for="ra3">RA</label>
                <input id="ra3" type="number" name="ra3" placeholder="Digite o RA" required />

                <label for="integrante4">Integrante</label>
                <input id="integrante4" type="text" name="integrante4" placeholder="Digite o nome do integrante" required />

                <label for="ra4">RA</label>
                <input id="ra4" type="number" name="ra4" placeholder="Digite o RA" required />

                <label for="integrante5">Integrante</label>
                <input id="integrante5" type="text" name="integrante5" placeholder="Digite o nome do integrante" required />

                <label for="ra5">RA</label>
                <input id="ra5" type="number" name="ra5" placeholder="Digite o RA" required />

                <button>Cadastrar</button>
            </form>
        </main>

    </> 
  )
}

export default From_grupo