import Hat from "../../assets/img/login/hat.png";
import { useNavigate } from "react-router-dom";

function EstudantesForm() {
  const navigate = useNavigate();

  return (
    <>
      <section className="login-section flex flex-col items-center justify-center min-h-screen py-6 sm:py-10 md:py-[60px] px-4 sm:px-6 font-inter text-[#021926] bg-[#F1F7EE]">
        <div className="text-center mb-8 sm:mb-10 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-[2.5rem] font-semibold mb-2">
            Osíris
          </h1>
          <p className="text-sm sm:text-base md:text-[1.1rem] font-medium">
            Acesse sua conta ou crie uma nova
          </p>
        </div>

        <div
          className="estudante-form text-left w-full sm:w-[680px] max-w-md sm:max-w-none bg-white border border-[#d3d3d3] rounded-xl p-6 sm:p-8 md:p-[50px] shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
          id="estudanteForm"
        >
          <div className="top-icon flex justify-center mb-6 sm:mb-[25px]">
            <img
              src={Hat}
              alt="Ícone Estudante"
              className="w-16 sm:w-20 md:w-[90px] h-16 sm:h-20 md:h-[90px] rounded-full p-3 sm:p-4 md:p-[15px] bg-[#5F747F]"
            />
          </div>

          <h3 className="text-center my-2 mb-2 text-lg sm:text-xl md:text-[1.4rem] font-semibold">
            Sou Estudante
          </h3>

          <p className="text-center text-sm sm:text-base md:text-[1rem] text-gray-600 mb-6 sm:mb-[45px] font-normal">
            Quero participar de projetos reais e ganhar experiência
          </p>

          <div className="form-group mb-5 sm:mb-[30px]">
            <label htmlFor="nomeRep" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
              Nome do Representante
            </label>
            <input
              type="text"
              id="nomeRep"
              placeholder="Digite o nome do representante"
              className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
            />
          </div>

          <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-[35px] mb-5 sm:mb-[30px]">
            <div className="form-group">
              <label htmlFor="emailStud" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                E-mail
              </label>
              <input
                type="email"
                id="emailStud"
                placeholder="seu.email@exemplo.com"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
              />
            </div>

            <div className="form-group">
              <label htmlFor="raStud" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                RA (Registro Acadêmico)
              </label>
              <input
                type="text"
                id="raStud"
                placeholder="Digite seu RA"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
              />
            </div>
          </div>

          <div className="form-group mb-5 sm:mb-[30px]">
            <label htmlFor="semestre" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
              Semestre Atual
            </label>
            <input
              type="text"
              id="semestre"
              placeholder="Ex: 4º semestre"
              className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
            />
          </div>

          <div className="form-group mb-5 sm:mb-[30px]">
            <label htmlFor="membros" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
              Membros do Grupo
            </label>
            <textarea
              id="membros"
              placeholder="Liste os nomes dos membros do seu grupo (um por linha)"
              className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition resize-none"
              rows={3}
            ></textarea>
          </div>

          <div className="form-group mb-6 sm:mb-[30px]">
            <label htmlFor="senhaStud" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
              Senha
            </label>
            <input
              type="password"
              id="senhaStud"
              placeholder="••••••••"
              className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
            />
          </div>

          <button
            className="w-full text-white bg-[#546873] py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-[1.1rem] rounded-lg font-medium mt-4 sm:mt-[20px] transition-all hover:bg-[#445561] active:scale-95"
            onClick={() => navigate("/aluno")}
          >
            Criar Conta
          </button>

          <div className="text-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">
              Já tem uma conta?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#546873] font-medium underline hover:no-underline transition"
              >
                Faça login aqui
              </button>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default EstudantesForm;
