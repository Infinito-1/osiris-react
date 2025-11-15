function DocenteForm() {
  return (
    <>
      <section className="login-section">
        <h1>Osíris</h1>
        <p>Acesse sua conta ou crie uma nova</p>

        <div
          id="docenteForm"
          className="
            docente-form
            text-left
            max-w-[680px]
            bg-white
            border border-[#d3d3d3]
            rounded-xl
            p-[50px]
            shadow-[0_4px_10px_rgba(0,0,0,0.08)]
          "
        >
          <div className="top-icon text-center mb-[25px]">
            <img
              src="../../assets/img/login/prof.png"
              alt="Ícone de docente"
              className="
                w-[70px]
                h-[70px]
                rounded-full
                p-[15px]
                bg-[#021926]
              "
            />
          </div>

          <h3 className="text-center my-[10px] mb-[6px] text-[1.4rem]">
            Sou Docente
          </h3>

          <p className="text-center text-[1rem] text-[#333] mb-[45px]">
            Tenho um grupo de alunos para orientar
          </p>

          {/* Linha 1 */}
          <div className="form-row flex gap-[35px] mb-[30px]">
            <div className="form-group flex-1">
              <label htmlFor="nomeDoc">Nome Completo</label>
              <input
                type="text"
                id="nomeDoc"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="emailDoc">E-mail</label>
              <input
                type="email"
                id="emailDoc"
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          {/* Linha 2 */}
          <div className="form-row flex gap-[35px] mb-[30px]">
            <div className="form-group flex-1">
              <label htmlFor="semestreDoc">Semestre Orientado</label>
              <input
                type="text"
                id="semestreDoc"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="disciplinaDoc">Disciplina</label>
              <input
                type="text"
                id="disciplinaDoc"
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="form-group mb-[30px]">
            <label htmlFor="senhaDoc">Senha</label>
            <input
              type="password"
              id="senhaDoc"
              className="w-full border rounded p-2"
            />
          </div>

          <button
            className="
              w-full
              text-white
              bg-[#021926]
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

export default DocenteForm;
