/* eslint-disable @typescript-eslint/no-explicit-any */
import Hat from "../../assets/img/login/hat.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { api } from "../../api/axios";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { PasswordInput } from "../../components/PasswordInput";
import { getGrupoPerfil } from "../../services/grupos.service";

interface GrupoFormDto {
  usuStrNome: string;
  usuStrEmail: string;
  usuStrSenha?: string;
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

const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutos

function EstudantesForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modoEdicao = searchParams.get("editar") === "true";

  const [semestres, setSemestres] = useState<Semestre[]>([]);
  const [gruIntId, setGruIntId] = useState<number | null>(null);
  const [usuIntId, setUsuIntId] = useState<number | null>(null);
  const [alterarSenha, setAlterarSenha] = useState(false);
  const [loadingPerfil, setLoadingPerfil] = useState(modoEdicao);

  // — modal state —
  const [modalAberto, setModalAberto] = useState(false);
  const [emailCadastrado, setEmailCadastrado] = useState("");
  const [codigo, setCodigo] = useState("");
  const [confirmando, setConfirmando] = useState(false);
  const [erroConfirmacao, setErroConfirmacao] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(TIMEOUT_MS);
  const [expirado, setExpirado] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const expiracaoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GrupoFormDto>();
  const passwordHook = usePasswordValidation();

  useEffect(() => {
    api
      .get("/semestres")
      .then((res) => setSemestres(res.data))
      .catch((err) => console.error("Erro ao carregar semestres:", err));
  }, []);

  useEffect(() => {
    if (!modoEdicao) return;
    getGrupoPerfil()
      .then((perfil) => {
        setGruIntId(perfil?.id);
        setUsuIntId(perfil?.usuario?.id ?? null);
        reset({
          usuStrNome: perfil?.usuario?.nome ?? "",
          usuStrEmail: perfil?.usuario?.email ?? "",
          gruStrNome: perfil?.nome ?? "",
          gruStrDescricao: perfil?.descricao ?? "",
          gruChaRa: perfil?.ra ?? "",
          gruIntTamanho: perfil?.tamanho ?? 1,
          gruStrMembros: perfil?.membros ?? "",
          semIntId: perfil?.semestre ? Number(perfil.semestre) : undefined,
        });
      })
      .catch(() => navigate("/dashboard_grupo"))
      .finally(() => setLoadingPerfil(false));
  }, [modoEdicao]);

  // Inicia contagem regressiva ao abrir o modal
  useEffect(() => {
    if (!modalAberto || sucesso) return;

    setTempoRestante(TIMEOUT_MS);
    setExpirado(false);

    timerRef.current = setInterval(() => {
      setTempoRestante((t) => {
        if (t <= 1000) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1000;
      });
    }, 1000);

    expiracaoRef.current = setTimeout(() => {
      setExpirado(true);
      clearInterval(timerRef.current!);
    }, TIMEOUT_MS);

    return () => {
      clearInterval(timerRef.current!);
      clearTimeout(expiracaoRef.current!);
    };
  }, [modalAberto, sucesso]);

  const formatarTempo = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const seg = Math.floor((ms % 60000) / 1000);
    return `${min}:${seg.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: GrupoFormDto) => {
    if (!modoEdicao || alterarSenha) {
      passwordHook.setTouched(true);
      if (!passwordHook.isValid) {
        alert("Senha inválida");
        return;
      }
    }

    try {
      if (modoEdicao) {
        if (usuIntId) {
          await api.put(`/usuarios/${usuIntId}`, {
            usuStrNome: data.usuStrNome,
            usuStrEmail: data.usuStrEmail,
            ...(alterarSenha && passwordHook.password
              ? { usuStrSenha: passwordHook.password }
              : {}),
          });
        }
        if (gruIntId) {
          await api.put(`/grupos/${gruIntId}`, {
            gruStrNome: data.gruStrNome,
            gruStrDescricao: data.gruStrDescricao,
            gruChaRa: data.gruChaRa,
            gruIntTamanho: Number(data.gruIntTamanho),
            gruStrMembros: data.gruStrMembros,
            semIntId: Number(data.semIntId),
          });
        }
        navigate("/dashboard_grupo");
      } else {
        const userResponse = await api.post("/usuarios", {
          usuStrNome: data.usuStrNome,
          usuStrEmail: data.usuStrEmail,
          usuStrSenha: passwordHook.password,
          usuStrTipo: "Grupo",
        });

        const userId =
          userResponse.data.dados?.id || userResponse.data.id;

        await api.post("/grupos", {
          usuIntId: userId,
          gruStrNome: data.gruStrNome,
          gruStrDescricao: data.gruStrDescricao,
          gruChaRa: data.gruChaRa,
          gruIntTamanho: Number(data.gruIntTamanho),
          gruStrMembros: data.gruStrMembros,
          semIntId: Number(data.semIntId),
        });

        setEmailCadastrado(data.usuStrEmail);
        setCodigo("");
        setErroConfirmacao(null);
        setSucesso(false);
        setModalAberto(true);
      }
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join("\n")
          : mensagem ?? `Erro ao ${modoEdicao ? "atualizar" : "criar"} conta.`
      );
    }
  };

  const handleConfirmar = async () => {
    if (!codigo.trim()) return;
    setConfirmando(true);
    setErroConfirmacao(null);
    try {
      await api.get(`/usuarios/confirmar/${codigo.trim()}`);
      setSucesso(true);
      clearInterval(timerRef.current!);
      clearTimeout(expiracaoRef.current!);
      setTimeout(() => navigate("/login"), 2500);
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      setErroConfirmacao(
        typeof mensagem === "string" ? mensagem : "Código inválido ou expirado."
      );
    } finally {
      setConfirmando(false);
    }
  };

  const handleVoltarCadastro = () => {
    setModalAberto(false);
    setCodigo("");
    setErroConfirmacao(null);
    setExpirado(false);
  };

  const handleTentarNovamente = () => {
    setCodigo("");
    setErroConfirmacao(null);
  };

  if (loadingPerfil)
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
        <p className="text-gray-500">Carregando perfil...</p>
      </div>
    );

  return (
    <>
      <section className="login-section flex flex-col items-center justify-center min-h-screen py-6 sm:py-10 md:py-[60px] px-4 sm:px-6 font-inter text-[#021926] bg-[#F1F7EE]">
        <div className="text-center mb-8 sm:mb-10 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-[2.5rem] font-semibold mb-2">Osíris</h1>
          <p className="text-sm sm:text-base md:text-[1.1rem] font-medium">
            {modoEdicao ? "Editar perfil do grupo" : "Acesse sua conta ou crie uma nova"}
          </p>
        </div>

        <div className="estudante-form text-left w-full sm:w-[680px] max-w-md sm:max-w-none bg-white border border-[#d3d3d3] rounded-xl p-6 sm:p-8 md:p-[50px] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
          <div className="top-icon flex justify-center mb-6 sm:mb-[25px]">
            <img
              src={Hat} alt="Ícone Estudante"
              className="w-16 sm:w-20 md:w-[90px] h-16 sm:h-20 md:h-[90px] rounded-full p-3 sm:p-4 md:p-[15px] bg-[#5F747F]"
            />
          </div>

          <h3 className="text-center my-2 mb-2 text-lg sm:text-xl md:text-[1.4rem] font-semibold">
            {modoEdicao ? "Editar Perfil — Grupo" : "Sou Estudante"}
          </h3>
          <p className="text-center text-sm sm:text-base md:text-[1rem] text-gray-600 mb-6 sm:mb-[45px] font-normal">
            {modoEdicao
              ? "Atualize as informações do seu grupo"
              : "Quero participar de projetos reais e ganhar experiência"}
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nome + Email */}
            <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-[35px] mb-5 sm:mb-[30px]">
              <div className="form-group">
                <label htmlFor="usuStrNome" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                  Nome de Usuário
                </label>
                <input
                  {...register("usuStrNome", { required: "Nome de usuário obrigatório" })}
                  type="text" id="usuStrNome" placeholder="Nome usado para login"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
                />
                {errors.usuStrNome && <span className="text-red-500 text-xs mt-1">{errors.usuStrNome.message}</span>}
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
                  type="email" id="usuStrEmail" placeholder="seu.email@aluno.cps.sp.gov.br"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
                />
                {errors.usuStrEmail && <span className="text-red-500 text-xs mt-1">{errors.usuStrEmail.message}</span>}
              </div>
            </div>

            {/* Nome do grupo + Semestre */}
            <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-[35px] mb-5 sm:mb-[30px]">
              <div className="form-group">
                <label htmlFor="gruStrNome" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                  Nome do Grupo
                </label>
                <input
                  {...register("gruStrNome", { required: "Nome do grupo obrigatório" })}
                  type="text" id="gruStrNome" placeholder="Nome público do grupo"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
                />
                {errors.gruStrNome && <span className="text-red-500 text-xs mt-1">{errors.gruStrNome.message}</span>}
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
                {errors.semIntId && <span className="text-red-500 text-xs mt-1">{errors.semIntId.message}</span>}
              </div>
            </div>

            {/* RA + Tamanho */}
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
                  type="text" id="gruChaRa" placeholder="Ex: 2023001234567"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
                />
                {errors.gruChaRa && <span className="text-red-500 text-xs mt-1">{errors.gruChaRa.message}</span>}
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
                  type="number" id="gruIntTamanho" placeholder="Nº de integrantes" min={1}
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition"
                />
                {errors.gruIntTamanho && <span className="text-red-500 text-xs mt-1">{errors.gruIntTamanho.message}</span>}
              </div>
            </div>

            {/* Descrição */}
            <div className="form-group mb-5 sm:mb-[30px]">
              <label htmlFor="gruStrDescricao" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                Descrição do Grupo
              </label>
              <textarea
                {...register("gruStrDescricao", { required: "Descrição obrigatória" })}
                id="gruStrDescricao" placeholder="Descreva o grupo, seus objetivos e competências"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition resize-none"
                rows={3}
              />
              {errors.gruStrDescricao && <span className="text-red-500 text-xs mt-1">{errors.gruStrDescricao.message}</span>}
            </div>

            {/* Membros */}
            <div className="form-group mb-5 sm:mb-[30px]">
              <label htmlFor="gruStrMembros" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                Membros do Grupo
              </label>
              <textarea
                {...register("gruStrMembros")}
                id="gruStrMembros" placeholder="Liste os nomes dos membros (um por linha)"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#546873] transition resize-none"
                rows={3}
              />
            </div>

            {/* Senha */}
            {modoEdicao ? (
              <>
                <div className="flex items-center gap-3 mb-5 sm:mb-[30px]">
                  <input
                    type="checkbox" id="alterarSenha"
                    checked={alterarSenha}
                    onChange={(e) => setAlterarSenha(e.target.checked)}
                    className="w-4 h-4 accent-[#546873] cursor-pointer"
                  />
                  <label htmlFor="alterarSenha" className="text-sm font-medium text-[#021926] cursor-pointer">
                    Alterar senha
                  </label>
                </div>
                {alterarSenha && (
                  <div className="form-group mb-6 sm:mb-[30px]">
                    <PasswordInput id="senhaStud" label="Nova Senha" hook={passwordHook}
                      register={register("usuStrSenha")} />
                  </div>
                )}
              </>
            ) : (
              <div className="form-group mb-6 sm:mb-[30px]">
                <PasswordInput id="senhaStud" label="Senha" hook={passwordHook}
                  register={register("usuStrSenha", { required: "Senha obrigatória" })} />
              </div>
            )}

            <div className="flex gap-3 mt-[20px]">
              <button
                type="submit" disabled={isSubmitting}
                className="flex-1 text-white bg-[#546873] py-4 text-[1.1rem] rounded-lg hover:bg-[#495a63] transition cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? modoEdicao ? "Salvando..." : "Criando conta..."
                  : modoEdicao ? "Salvar Alterações" : "Criar Conta"}
              </button>
              {modoEdicao && (
                <button
                  type="button" onClick={() => navigate("/dashboard_grupo")}
                  className="flex-1 bg-gray-200 text-gray-800 py-4 text-[1.1rem] rounded-lg hover:bg-gray-300 transition cursor-pointer active:scale-95"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          {!modoEdicao && (
            <div className="text-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600">
                Já tem uma conta?{" "}
                <button type="button" onClick={() => navigate("/login")}
                  className="text-[#546873] font-medium underline hover:no-underline transition">
                  Faça login aqui
                </button>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal de confirmação de e-mail */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">

            {sucesso ? (
              /* — confirmado com sucesso — */
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Conta confirmada!</h2>
                <p className="text-gray-500 text-sm">
                  Seu e-mail foi verificado com sucesso. Redirecionando para o login...
                </p>
              </div>

            ) : expirado ? (
              /* — tempo esgotado — */
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Tempo esgotado</h2>
                <p className="text-gray-500 text-sm mb-6">
                  O prazo para confirmar o código expirou. Faça o cadastro novamente.
                </p>
                <button
                  onClick={handleVoltarCadastro}
                  className="w-full bg-[#546873] text-white py-2.5 rounded-md font-medium hover:bg-[#495a63] transition cursor-pointer"
                >
                  Voltar ao cadastro
                </button>
              </div>

            ) : erroConfirmacao ? (
              /* — código incorreto — */
              <>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Código incorreto</h2>
                  <p className="text-gray-500 text-sm">{erroConfirmacao}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleTentarNovamente}
                    className="flex-1 bg-[#546873] text-white py-2.5 rounded-md font-medium hover:bg-[#495a63] transition cursor-pointer active:scale-95"
                  >
                    Tentar novamente
                  </button>
                  <button
                    onClick={handleVoltarCadastro}
                    className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-md font-medium hover:bg-gray-200 transition cursor-pointer active:scale-95"
                  >
                    Voltar ao cadastro
                  </button>
                </div>
              </>

            ) : (
              /* — aguardando código — */
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Confirme seu e-mail
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Enviamos um código de 6 dígitos para{" "}
                  <strong className="text-gray-700">{emailCadastrado}</strong>.
                  Digite-o abaixo para ativar sua conta.
                </p>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={codigo}
                    onChange={(e) =>
                      setCodigo(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="000000"
                    maxLength={6}
                    className="flex-1 p-2.5 border border-gray-300 rounded-md text-gray-800 text-sm tracking-[0.3em] text-center focus:outline-none focus:ring-2 focus:ring-[#546873] transition"
                  />
                  <button
                    onClick={handleConfirmar}
                    disabled={confirmando || codigo.length < 6}
                    className="px-4 py-2 bg-[#546873] text-white rounded-md text-sm font-medium hover:bg-[#495a63] transition cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {confirmando ? "Verificando..." : "Confirmar"}
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-right mb-6">
                  Código expira em{" "}
                  <span className={tempoRestante < 60000 ? "text-red-500 font-medium" : "text-gray-500"}>
                    {formatarTempo(tempoRestante)}
                  </span>
                </p>

                <button
                  onClick={handleVoltarCadastro}
                  className="w-full bg-gray-700 text-white py-2.5 rounded-md font-medium hover:bg-gray-500 transition cursor-pointer"
                >
                  Voltar ao cadastro
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EstudantesForm;