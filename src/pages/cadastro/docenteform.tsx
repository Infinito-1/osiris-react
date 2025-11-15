import Prof from "../../assets/img/login/prof.png";

function DocenteForm() {
  return (
    <section className="flex flex-col items-center mt-[60px] font-inter">
      {/* TÍTULO E SUBTÍTULO */}
      <h1 className="text-[#021926] text-[2.5rem] font-semibold mb-2">
        Osíris
      </h1>

      <p className="text-[1.1rem] font-medium mb-[30px]">
        Acesse sua conta ou crie uma nova
      </p>

      <div
        className="
          w-[680px]
          max-[700px]:w-[90%]
          bg-white
          border border-[#d3d3d3]
          rounded-xl
          p-[50px]
          shadow-[0_4px_10px_rgba(0,0,0,0.08)]
          text-left
        "
      >
        {/* ÍCONE CENTRALIZADO */}
        <div className="flex justify-center mb-[25px]">
          <img
            src={Prof}
            alt="Ícone Docente"
            className="w-[70px] h-[70px] rounded-full p-[15px] bg-[#021926]"
          />
        </div>

        {/* TÍTULO */}
        <h3 className="text-center text-[1.4rem] font-semibold my-[10px] mb-[6px]">
          Sou Docente
        </h3>

        <p className="text-center text-[1rem] text-[#333] mb-[45px]">
          Tenho um grupo de alunos para orientar
        </p>

        {/* Linha 1 */}
        <div className="flex gap-[35px] mb-[30px] max-[700px]:flex-col">
          <div className="flex-1">
            <label htmlFor="nomeDoc" className="block mb-2 font-medium">
              Nome Completo
            </label>
            <input
              type="text"
              id="nomeDoc"
              className="
                w-full
                border border-gray-300
                rounded-lg
                p-3
                outline-none
                focus:ring-2 focus:ring-[#021926]
              "
            />
          </div>

          <div className="flex-1">
            <label htmlFor="emailDoc" className="block mb-2 font-medium">
              E-mail
            </label>
            <input
              type="email"
              id="emailDoc"
              className="
                w-full
                border border-gray-300
                rounded-lg
                p-3
                outline-none
                focus:ring-2 focus:ring-[#021926]
              "
            />
          </div>
        </div>

        {/* Linha 2 */}
        <div className="flex gap-[35px] mb-[30px] max-[700px]:flex-col">
          <div className="flex-1">
            <label htmlFor="semestreDoc" className="block mb-2 font-medium">
              Semestre Orientado
            </label>
            <input
              type="text"
              id="semestreDoc"
              className="
                w-full
                border border-gray-300
                rounded-lg
                p-3
                outline-none
                focus:ring-2 focus:ring-[#021926]
              "
            />
          </div>

          <div className="flex-1">
            <label htmlFor="disciplinaDoc" className="block mb-2 font-medium">
              Disciplina
            </label>
            <input
              type="text"
              id="disciplinaDoc"
              className="
                w-full
                border border-gray-300
                rounded-lg
                p-3
                outline-none
                focus:ring-2 focus:ring-[#021926]
              "
            />
          </div>
        </div>

        {/* Senha */}
        <div className="mb-[30px]">
          <label htmlFor="senhaDoc" className="block mb-2 font-medium">
            Senha
          </label>
          <input
            type="password"
            id="senhaDoc"
            className="
              w-full
              border border-gray-300
              rounded-lg
              p-3
              outline-none
              focus:ring-2 focus:ring-[#021926]
            "
          />
        </div>

        {/* Botão */}
        <button
          className="
            w-full
            py-4
            rounded-lg
            text-white
            text-[1.1rem]
            bg-[#021926]
            mt-[20px]
            transition-opacity
            hover:opacity-90
          "
        >
          Criar Conta
        </button>
      </div>
    </section>
  );
}

export default DocenteForm;
