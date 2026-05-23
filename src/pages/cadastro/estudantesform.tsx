import Hat from "../../assets/img/login/hat.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { PasswordInput } from "../../components/PasswordInput";

interface CreateGrupoFormDto {
  usuStrNome: string;
  usuStrEmail: string;
  usuStrSenha: string;
  gruStrNome: string;
  gruStrDescricao: string;
  gruChaRa: string;
  gruIntTamanho: number;
  gruStrMembros?: string;
  semIntId: number;
}

interface Semestre {
  semIntId: number;
  semStrDescricao: string;
}

function EstudantesForm() {
  const navigate = useNavigate();
  const [semestres, setSemestres] = useState<Semestre[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateGrupoFormDto>();
  const passwordHook = usePasswordValidation();

  useEffect(() => {
    api.get("/semestres").then((res) => setSemestres(res.data));
  }, []);

  const onSubmit = async (data: CreateGrupoFormDto) => {
    passwordHook.setTouched(true);

    if (!passwordHook.isValid) {
      alert("Senha inválida");
      return;
    }

    try {
      // 1. Cria primeiro o usuário (limpo, apenas com campos de usuário)
      const userResponse = await api.post("/usuarios", {
        usuStrNome: data.usuStrNome,
        usuStrEmail: data.usuStrEmail,
        usuStrSenha: data.usuStrSenha,
        usuStrTipo: "Grupo",
      });

      // 2. Extrai o ID do usuário criado (ajuste conforme o que o seu backend retorna no JSON)
      const userId = userResponse.data.dados?.id || userResponse.data.id;

      // 3. Agora cria o grupo vinculando ao ID do usuário
      await api.post("/grupos", {
        usuIntId: userId, // Vínculo essencial
        gruStrNome: data.gruStrNome,
        gruStrDescricao: data.gruStrDescricao,
        gruChaRa: data.gruChaRa,
        gruIntTamanho: Number(data.gruIntTamanho),
        gruStrMembros: data.gruStrMembros,
        semIntId: Number(data.semIntId),
      });

      navigate("/dashboard_grupo");
    } catch (error: any) {
      console.error("Erro completo:", error.response?.data);
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join("\n")
          : mensagem ?? "Erro ao criar conta."
      );
    }
  };

  return (
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

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ── Linha 1: Nome de usuário + E-mail ── */}
          <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-[35px] mb-5 sm:mb-[30px]">
            <div className="form-group">
              <label htmlFor="usuStrNome" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                Nome de Usuário
              </label>
              <input
                {...register("usuStrNome", { required: "Nome de usuário obrigatório" })}
                type="text"
                id="usuStrNome"
                placeholder="Nome usado para login"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
              />
              {errors.usuStrNome && (
                <span className="text-red-500 text-xs mt-1">{errors.usuStrNome.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="usuStrEmail" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                E-mail Institucional
              </label>
              <input
                {...register("usuStrEmail", {
                  required: "E-mail obrigatório",
                  pattern: { value: /^\S+@\S+$/i, message: "E-mail inválido" },
                })}
                type="email"
                id="usuStrEmail"
                placeholder="seu.email@aluno.cps.sp.gov.br"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
              />
              {errors.usuStrEmail && (
                <span className="text-red-500 text-xs mt-1">{errors.usuStrEmail.message}</span>
              )}
            </div>
          </div>

          {/* ── Linha 2: Nome do grupo + Semestre ── */}
          <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-[35px] mb-5 sm:mb-[30px]">
            <div className="form-group">
              <label htmlFor="gruStrNome" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                Nome do Grupo
              </label>
              <input
                {...register("gruStrNome", { required: "Nome do grupo obrigatório" })}
                type="text"
                id="gruStrNome"
                placeholder="Nome público do grupo"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
              />
              {errors.gruStrNome && (
                <span className="text-red-500 text-xs mt-1">{errors.gruStrNome.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="semIntId" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                Semestre Atual
              </label>
              <select
                {...register("semIntId", { required: "Semestre obrigatório", valueAsNumber: true })}
                id="semIntId"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition bg-white"
              >
                <option value="">Selecione o semestre</option>
                {semestres.map((s) => (
                  <option key={s.semIntId} value={s.semIntId}>
                    {s.semStrDescricao}º semestre
                  </option>
                ))}
              </select>
              {errors.semIntId && (
                <span className="text-red-500 text-xs mt-1">{errors.semIntId.message}</span>
              )}
            </div>
          </div>

          {/* ── Linha 3: RA + Tamanho do grupo ── */}
          <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-[35px] mb-5 sm:mb-[30px]">
            <div className="form-group">
              <label htmlFor="gruChaRa" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                RA do Líder
              </label>
              <input
                {...register("gruChaRa", {
                  required: "RA obrigatório",
                  maxLength: { value: 13, message: "RA deve ter no máximo 13 caracteres" },
                })}
                type="text"
                id="gruChaRa"
                placeholder="Ex: 2023001234567"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
              />
              {errors.gruChaRa && (
                <span className="text-red-500 text-xs mt-1">{errors.gruChaRa.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="gruIntTamanho" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                Tamanho do Grupo
              </label>
              <input
                {...register("gruIntTamanho", {
                  required: "Tamanho obrigatório",
                  min: { value: 1, message: "Mínimo 1 membro" },
                  valueAsNumber: true,
                })}
                type="number"
                id="gruIntTamanho"
                placeholder="Nº de integrantes"
                min={1}
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
              />
              {errors.gruIntTamanho && (
                <span className="text-red-500 text-xs mt-1">{errors.gruIntTamanho.message}</span>
              )}
            </div>
          </div>

          {/* ── Descrição ── */}
          <div className="form-group mb-5 sm:mb-[30px]">
            <label htmlFor="gruStrDescricao" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
              Descrição do Grupo
            </label>
            <textarea
              {...register("gruStrDescricao", { required: "Descrição obrigatória" })}
              id="gruStrDescricao"
              placeholder="Descreva o grupo, seus objetivos e competências"
              className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition resize-none"
              rows={3}
            />
            {errors.gruStrDescricao && (
              <span className="text-red-500 text-xs mt-1">{errors.gruStrDescricao.message}</span>
            )}
          </div>

          {/* ── Membros ── */}
          <div className="form-group mb-5 sm:mb-[30px]">
            <label htmlFor="gruStrMembros" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
              Membros do Grupo
            </label>
            <textarea
              {...register("gruStrMembros")}
              id="gruStrMembros"
              placeholder="Liste os nomes dos membros (um por linha)"
              className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition resize-none"
              rows={3}
            />
          </div>

          {/* ── Senha ── */}
          <div className="form-group mb-6 sm:mb-[30px]">
            <PasswordInput
              id="senhaStud"
              label="Senha"
              hook={passwordHook}
              register={register("usuStrSenha", {
                required: "Senha obrigatória",
              })}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              text-white
              bg-[#546873]
              py-4
              text-[1.1rem]
              rounded-lg
              mt-[20px]
              hover:bg-[#495a63]
              transition
              cursor-pointer
              active:scale-95
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
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
              className="text-[#546873] font-medium underline hover:no-underline transition"
            >
              Faça login aqui
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export default EstudantesForm;