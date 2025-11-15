function EmpreendedorForm() {
  return (
    <>
      <section className="login-section flex flex-col items-center mt-[60px] font-inter text-[#021926]">
        {/* Título */}
        <h1 className="text-[2.5rem] font-semibold mb-[8px]">Osíris</h1>
        <p className="text-[1.1rem] font-medium mb-[30px]">
          Acesse sua conta ou crie uma nova
        </p>

        <div
          id="empreendedorForm"
          className="
            empreendedor-form
            text-left
            max-w-[680px]
            w-full
            bg-white
            border border-[#d3d3d3]
            rounded-xl
            p-[50px]
            shadow-[0_4px_10px_rgba(0,0,0,0.08)]
          "
        >
          {/* Ícone */}
          <div className="top-icon flex justify-center mb-[25px]">
            <img
              src="../../assets/img/login/lamp.png"
              alt="Ícone de lâmpada"
              className="
                w-[70px]
                h-[70px]
                rounded-full
                p-[15px]
                bg-[#782e29]
              "
            />
          </div>

          {/* Subtítulo */}
          <h3 className="text-center my-[10px] mb-[6px] text-[1.4rem] font-semibold">
            Sou Empreendedor
          </h3>

          <p className="text-center text-[1rem] text-[#333] mb-[45px] font-normal">
            Tenho uma demanda e preciso de uma solução digital
          </p>

          {/* Linha 1 */}
          <div className="form-row flex gap-[35px] mb-[30px] max-[700px]:flex-col max-[700px]:gap-[20px]">
            <div className="form-group flex-1">
              <label htmlFor="nomeEmp" className="font-medium">
                Nome Completo
              </label>
              <input
                type="text"
                id="nomeEmp"
                className="w-full border border-[#d3d3d3] rounded p-2 mt-1"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="emailEmp" className="font-medium">
                E-mail
              </label>
              <input
                type="email"
                id="emailEmp"
                className="w-full border border-[#d3d3d3] rounded p-2 mt-1"
              />
            </div>
          </div>

          {/* Linha 2 */}
          <div className="form-row flex gap-[35px] mb-[30px] max-[700px]:flex-col max-[700px]:gap-[20px]">
            <div className="form-group flex-1">
              <label htmlFor="telefoneEmp" className="font-medium">
                Telefone
              </label>
              <input
                type="text"
                id="telefoneEmp"
                className="w-full border border-[#d3d3d3] rounded p-2 mt-1"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="empresaEmp" className="font-medium">
                Empresa / Negócio
              </label>
              <input
                type="text"
                id="empresaEmp"
                className="w-full border border-[#d3d3d3] rounded p-2 mt-1"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="form-group mb-[30px]">
            <label htmlFor="senhaEmp" className="font-medium">
              Senha
            </label>
            <input
              type="password"
              id="senhaEmp"
              className="w-full border border-[#d3d3d3] rounded p-2 mt-1"
            />
          </div>

          <button
            className="
              w-full
              text-white
              bg-[#782e29]
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

export default EmpreendedorForm;
