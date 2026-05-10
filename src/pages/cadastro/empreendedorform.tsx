import Lamp from "../../assets/img/login/lamp.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "../../api/axios";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { PasswordInput } from "../../components/PasswordInput";

interface CreateUsuarioDto {
  usuStrNome: string;
  usuStrEmail: string;
  usuStrSenha: string;
  usuStrTelefone?: string;
  usuStrTipo: "Empreendedor" | "Coordenador" | "Grupo";
}

function EmpreendedorForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUsuarioDto>();
  const passwordHook = usePasswordValidation();

  const onSubmit = async (data: CreateUsuarioDto) => {
    try {
      await api.post("/usuarios", {
        ...data,
        usuStrTipo: "Empreendedor",
      });
      navigate("/empreendedor");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join("\n")
          : mensagem ?? "Erro ao criar conta."
      );
    }
  };

  function handleSubmit(): void {
    passwordHook.setTouched(true);

    if (!passwordHook.isValid) return;

    navigate("/empreendedor");
  }

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
          id="empreendedorForm"
          className="empreendedor-form text-left w-full sm:w-[680px] max-w-md sm:max-w-none bg-white border border-[#d3d3d3] rounded-xl p-6 sm:p-8 md:p-[50px] shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
        >
          <div className="top-icon flex justify-center mb-6 sm:mb-[25px]">
            <img
              src={Lamp}
              alt="Ícone de lâmpada"
              className="w-16 sm:w-20 md:w-[90px] h-16 sm:h-20 md:h-[90px] rounded-full p-3 sm:p-4 md:p-[15px] bg-[#782e29]"
            />
          </div>

          <h3 className="text-center my-2 mb-2 text-lg sm:text-xl md:text-[1.4rem] font-semibold">
            Sou Empreendedor
          </h3>

          <p className="text-center text-sm sm:text-base md:text-[1rem] text-gray-600 mb-6 sm:mb-[45px] font-normal">
            Tenho uma demanda e preciso de uma solução digital
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-[35px] mb-5 sm:mb-[30px]">
              <div className="form-group">
                <label htmlFor="nomeEmp" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                  Nome Completo
                </label>
                <input
                  {...register("usuStrNome", { required: "Nome obrigatório" })}
                  type="text"
                  id="nomeEmp"
                  placeholder="Digite seu nome completo"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
                />
                {errors.usuStrNome && (
                  <span className="text-red-500 text-xs mt-1">{errors.usuStrNome.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="emailEmp" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                  E-mail
                </label>
                <input
                  {...register("usuStrEmail", {
                    required: "E-mail obrigatório",
                    pattern: { value: /^\S+@\S+$/i, message: "E-mail inválido" },
                  })}
                  type="email"
                  id="emailEmp"
                  placeholder="seu.email@exemplo.com"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
                />
                {errors.usuStrEmail && (
                  <span className="text-red-500 text-xs mt-1">{errors.usuStrEmail.message}</span>
                )}
              </div>
            </div>

            <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-[35px] mb-5 sm:mb-[30px]">
              <div className="form-group">
                <label htmlFor="telefoneEmp" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                  Telefone
                </label>
                <input
                  {...register("usuStrTelefone")}
                  type="text"
                  id="telefoneEmp"
                  placeholder="(11) 99999-9999"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
                />
              </div>

              {/*TODO: Campo de empresa por enquanto é visual apenas, não vai pro banco devido a não termos correspondecia até agora no código */}
              <div className="form-group">
                <label htmlFor="empresaEmp" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                  Empresa / Negócio
                </label>
                <input
                  type="text"
                  id="empresaEmp"
                  placeholder="Nome da sua empresa"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
                />
              </div>
            </div>

            
            <div className="form-group mb-6 sm:mb-[30px]">
              <label htmlFor="senhaEmp" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                Senha
              </label>
              <input
                {...register("usuStrSenha")}
                type="password"
                id="senhaEmp"
                placeholder="••••••••"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
              />
              
            </div>
            <PasswordInput
            id="senhaEmp"
            label="Senha"
            hook={passwordHook}
          />
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                text-white
                bg-[#782e29]
                py-4
                text-[1.1rem]
                rounded-lg
                mt-[20px]
                transition
                hover:bg-[#5e231f]
                cursor-pointer
                active:scale-95
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
              onClick={handleSubmit}
            >
              {isSubmitting ? "Criando conta..." : "Criar Conta"}
            </button>
          </form>

          <div className="text-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">
              Já tem uma conta?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-[#782e29] font-medium underline hover:no-underline transition"
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

export default EmpreendedorForm;