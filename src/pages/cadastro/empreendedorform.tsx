function EmpreendedorForm() {
  return (
    <>
      <section className="login-section">
        <h1>Osíris</h1>
        <p>Acesse sua conta ou crie uma nova</p>

        <div
          id="empreendedorForm"
          className="
            empreendedor-form
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

          <h3 className="text-center my-[10px] mb-[6px] text-[1.4rem]">
            Sou Empreendedor
          </h3>

          <p className="text-center text-[1rem] text-[#333] mb-[45px]">
            Tenho uma demanda e preciso de uma solução digital
          </p>

          {/* Linha 1 */}
          <div className="form-row flex gap-[35px] mb-[30px]">
            <div className="form-group flex-1">
              <label htmlFor="nomeEmp">Nome Completo</label>
              <input
                type="text"
                id="nomeEmp"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="emailEmp">E-mail</label>
              <input
                type="email"
                id="emailEmp"
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          {/* Linha 2 */}
          <div className="form-row flex gap-[35px] mb-[30px]">
            <div className="form-group flex-1">
              <label htmlFor="telefoneEmp">Telefone</label>
              <input
                type="text"
                id="telefoneEmp"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="empresaEmp">Empresa / Negócio</label>
              <input
                type="text"
                id="empresaEmp"
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="form-group mb-[30px]">
            <label htmlFor="senhaEmp">Senha</label>
            <input
              type="password"
              id="senhaEmp"
              className="w-full border rounded p-2"
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
