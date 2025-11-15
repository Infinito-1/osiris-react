function CoordenadorForm() {
  return (
    <>
      <section className="login-section">
        <h1>Osíris</h1>
        <p>Acesse sua conta ou crie uma nova</p>

        <div
          id="coordenadorForm"
          className="
            coordenador-form
            text-left
            max-w-[680px]
            min-w-[500px]
            bg-white
            border border-[#d3d3d3]
            rounded-xl
            p-[50px]
            shadow-[0_4px_10px_rgba(0,0,0,0.08)]
          "
        >
          <div className="top-icon text-center mb-[25px]">
            <img
              src="../../assets/img/login/book.png"
              alt="Ícone Coordenador"
              className="
                w-[70px]
                h-[70px]
                rounded-full
                p-[15px]
                bg-[#9fa39e]
              "
            />
          </div>

          <h3 className="text-center my-[10px] mb-[6px] text-[1.4rem]">
            Sou Coordenador
          </h3>

          <p className="text-center text-[1rem] text-[#333] mb-[45px]">
            Preciso verificar demandas
          </p>

          {/* Nome */}
          <div className="form-group mb-[30px]">
            <label htmlFor="nomeCoo">Nome</label>
            <input
              type="text"
              id="nomeCoo"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Email */}
          <div className="form-group mb-[30px]">
            <label htmlFor="emailCoo">E-mail</label>
            <input
              type="email"
              id="emailCoo"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Curso */}
          <div className="form-group mb-[30px]">
            <label htmlFor="cursoCoo">Curso</label>
            <input
              type="text"
              id="cursoCoo"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Senha */}
          <div className="form-group mb-[30px]">
            <label htmlFor="senhaCoo">Senha</label>
            <input
              type="password"
              id="senhaCoo"
              className="w-full border rounded p-2"
            />
          </div>

          <button
            className="
              w-full
              text-white
              bg-[#9fa39e]
              py-4
              text-[1.1rem]
              rounded-lg
              mt-[20px]
              transition-opacity
              hover:opacity-90
            "
          >
            Criar Conta
          </button>
        </div>
      </section>
    </>
  );
}

export default CoordenadorForm;
