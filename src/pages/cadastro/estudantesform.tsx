function EstudantesForm() {
  return (
    <>
      <section className="login-section">
        <h1>Osíris</h1>
        <p>Acesse sua conta ou crie uma nova</p>

        {/* Estudante */}

        <div
          className="
            estudante-form
            text-left
            max-w-[680px]
            bg-white
            border border-[#d3d3d3]
            rounded-xl
            p-[50px]
            shadow-[0_4px_10px_rgba(0,0,0,0.08)]
          "
          id="estudanteForm"
        >
          <div className="top-icon text-center mb-[25px]">
            <img
              src="../../assets/img/login/hat.png"
              alt="Ícone Estudante"
              className="
                w-[70px]
                h-[70px]
                rounded-full
                p-[15px]
                bg-[#6b7c85]
              "
            />
          </div>

          <h3 className="text-center my-[10px] mb-[6px] text-[1.4rem]">
            Sou Estudante
          </h3>

          <p className="text-center text-[1rem] text-[#333] mb-[45px]">
            Quero participar de projetos reais e ganhar experiência
          </p>

          <div className="form-group mb-[30px]">
            <label htmlFor="nomeRep">Nome do Representante</label>
            <input
              type="text"
              id="nomeRep"
              className="w-full border rounded p-2"
            />
          </div>

          <div className="form-row flex gap-[35px] mb-[30px]">
            <div className="form-group flex-1">
              <label htmlFor="emailStud">E-mail</label>
              <input
                type="email"
                id="emailStud"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="raStud">RA (Registro Acadêmico)</label>
              <input
                type="text"
                id="raStud"
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="form-group mb-[30px]">
            <label htmlFor="semestre">Semestre Atual</label>
            <input
              type="text"
              id="semestre"
              className="w-full border rounded p-2"
            />
          </div>

          <div className="form-group mb-[30px]">
            <label htmlFor="membros">Membros do Grupo</label>
            <textarea
              id="membros"
              className="w-full border rounded p-2 resize-none"
            ></textarea>
          </div>

          <div className="form-group mb-[30px]">
            <label htmlFor="senhaStud">Senha</label>
            <input
              type="password"
              id="senhaStud"
              className="w-full border rounded p-2"
            />
          </div>

          <button
            className="
              register-button estudante
              w-full
              text-white
              bg-[#546873]
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

export default EstudantesForm;
