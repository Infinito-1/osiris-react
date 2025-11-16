import Hat from "../../assets/img/login/hat.png";

function EstudantesForm() {
  return (
    <>
      <section className="login-section flex flex-col items-center font-inter text-[#021926] bg-[#F1F7EE]">
        {/* Título */}
        <h1 className="text-[2.5rem] font-semibold mb-[8px] mt-[60px]">Osíris</h1>
        <p className="text-[1.1rem] font-medium mb-[30px]">
          Acesse sua conta ou crie uma nova
        </p>

        <div
          className="
            estudante-form
            text-left
            max-w-[680px]
            w-full
            bg-white
            border border-[#d3d3d3]
            rounded-xl
            p-[50px]
            shadow-[0_4px_10px_rgba(0,0,0,0.08)]
          "
          id="estudanteForm"
        >
          {/* Ícone */}
          <div className="top-icon flex justify-center mb-[25px]">
            <img
              src={Hat}
              alt="Ícone Estudante"
              className="
                w-[90px]
                h-[90px]
                rounded-full
                p-[15px]
                bg-[#5F747F]
              "
            />
          </div>

          {/* Subtítulo */}
          <h3 className="text-center my-[10px] mb-[6px] text-[1.4rem] font-semibold">
            Sou Estudante
          </h3>

          <p className="text-center text-[1rem] text-[#333] mb-[45px] font-normal">
            Quero participar de projetos reais e ganhar experiência
          </p>

          {/* Nome do representante */}
          <div className="form-group mb-[30px]">
            <label htmlFor="nomeRep" className="font-medium">
              Nome do Representante
            </label>
            <input
              type="text"
              id="nomeRep"
              className="w-full border border-[#d3d3d3] rounded p-2 mt-1"
            />
          </div>

          {/* Linha de Email e RA */}
          <div className="form-row flex gap-[35px] mb-[30px] max-[700px]:flex-col max-[700px]:gap-[20px]">
            <div className="form-group flex-1">
              <label htmlFor="emailStud" className="font-medium">
                E-mail
              </label>
              <input
                type="email"
                id="emailStud"
                className="w-full border border-[#d3d3d3] rounded p-2 mt-1"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="raStud" className="font-medium">
                RA (Registro Acadêmico)
              </label>
              <input
                type="text"
                id="raStud"
                className="w-full border border-[#d3d3d3] rounded p-2 mt-1"
              />
            </div>
          </div>

          {/* Semestre */}
          <div className="form-group mb-[30px]">
            <label htmlFor="semestre" className="font-medium">
              Semestre Atual
            </label>
            <input
              type="text"
              id="semestre"
              className="w-full border border-[#d3d3d3] rounded p-2 mt-1"
            />
          </div>

          {/* Membros do Grupo */}
          <div className="form-group mb-[30px]">
            <label htmlFor="membros" className="font-medium">
              Membros do Grupo
            </label>
            <textarea
              id="membros"
              className="w-full border border-[#d3d3d3] rounded p-2 mt-1 resize-none"
              rows={3}
            ></textarea>
          </div>

          {/* Senha */}
          <div className="form-group mb-[30px]">
            <label htmlFor="senhaStud" className="font-medium">
              Senha
            </label>
            <input
              type="password"
              id="senhaStud"
              className="w-full border border-[#d3d3d3] rounded p-2 mt-1"
            />
          </div>

          {/* Botão */}
          <button
            className="
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
