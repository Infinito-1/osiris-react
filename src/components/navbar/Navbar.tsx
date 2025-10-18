


function Navbar() {

  return (
    <>
      <nav>
        <div class="nav-left">
          <div class="logo"></div>
          <div class="nav-text">
            <h1>Osíris</h1>
            <span>Fatec Zona Leste</span>
          </div>
        </div>

        <div class="nav-center">
          <button>Projetos</button>
          <button>Como Funciona</button>
          <button>Grupos</button>
        </div>

        <div class="nav-right">
          <button class="login">Login</button>
          <button class="cadastrar">Cadastrar</button>
        </div>
      </nav>

    </>
  )
}

export default Navbar