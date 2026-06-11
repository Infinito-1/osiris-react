import Lamp from "../../assets/img/login/lamp.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { api } from "../../api/axios";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { PasswordInput } from "../../components/PasswordInput";

interface CreateEmpreendedorFormDto {
  usuStrNome: string;
  usuStrEmail: string;
  usuStrSenha: string;
  usuStrTelefone?: string;
  empStrEmpresa: string;
  empChaCnpj?: string;
}

const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutos

function EmpreendedorForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateEmpreendedorFormDto>();
  const passwordHook = usePasswordValidation();

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

  const onSubmit = async (data: CreateEmpreendedorFormDto) => {
    passwordHook.setTouched(true);
    if (!passwordHook.isValid) {
      alert("Senha inválida");
      return;
    }
    if (!data.empStrEmpresa?.trim()) {
      alert("Nome da empresa é obrigatório.");
      return;
    }

    try {
      const response = await api.post("/usuarios", {
        usuStrNome: data.usuStrNome,
        usuStrEmail: data.usuStrEmail,
        usuStrSenha: data.usuStrSenha,
        usuStrTelefone: data.usuStrTelefone,
        usuStrTipo: "Empreendedor",
      });

      const usuarioId = response.data.dados.id;

      await api.post("/empreendedores", {
        usuIntId: usuarioId,
        empStrEmpresa: data.empStrEmpresa,
        empChaCnpj: data.empChaCnpj || undefined,
      });

      setEmailCadastrado(data.usuStrEmail);
      setCodigo("");
      setErroConfirmacao(null);
      setSucesso(false);
      setModalAberto(true);
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join("\n")
          : mensagem ?? "Erro ao criar conta."
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

  return (
    <>
      <section className="login-section flex flex-col items-center justify-center min-h-screen py-6 sm:py-10 md:py-[60px] px-4 sm:px-6 font-inter text-[#021926] bg-[#F1F7EE]">
        <div className="text-center mb-8 sm:mb-10 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-[2.5rem] font-semibold mb-2">Osíris</h1>
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
                  type="text" id="nomeEmp" placeholder="Digite seu nome completo"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
                />
                {errors.usuStrNome && <span className="text-red-500 text-xs mt-1">{errors.usuStrNome.message}</span>}
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
                  type="email" id="emailEmp" placeholder="seu.email@exemplo.com"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
                />
                {errors.usuStrEmail && <span className="text-red-500 text-xs mt-1">{errors.usuStrEmail.message}</span>}
              </div>
            </div>

            <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-[35px] mb-5 sm:mb-[30px]">
              <div className="form-group">
                <label htmlFor="telefoneEmp" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                  Telefone
                </label>
                <input
                  {...register("usuStrTelefone")}
                  type="text" id="telefoneEmp" placeholder="(11) 99999-9999"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
                />
              </div>
              <div className="form-group">
                <label htmlFor="empresaEmp" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                  Empresa / Negócio
                </label>
                <input
                  {...register("empStrEmpresa", { required: "Nome da empresa obrigatório" })}
                  type="text" id="empresaEmp" placeholder="Nome da sua empresa"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
                />
                {errors.empStrEmpresa && <span className="text-red-500 text-xs mt-1">{errors.empStrEmpresa.message}</span>}
              </div>
            </div>

            <div className="form-row mb-5 sm:mb-[30px]">
              <div className="form-group">
                <label htmlFor="empChaCnpj" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                  CNPJ <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <input
                  {...register("empChaCnpj", {
                    minLength: { value: 14, message: "CNPJ deve ter 14 dígitos" },
                    maxLength: { value: 14, message: "CNPJ deve ter 14 dígitos" },
                  })}
                  type="text" id="empChaCnpj" placeholder="00000000000000"
                  className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
                />
                {errors.empChaCnpj && <span className="text-red-500 text-xs mt-1">{errors.empChaCnpj.message}</span>}
              </div>
            </div>

            <div className="form-group mb-6 sm:mb-[30px]">
              <PasswordInput
                id="senhaEmp" label="Senha" hook={passwordHook}
                register={register("usuStrSenha", {
                  required: "Senha obrigatória",
                  validate: () => passwordHook.isValid || "A senha não atende todos os requisitos.",
                })}
              />
            </div>

            <button
              type="submit" disabled={isSubmitting}
              className="w-full text-white bg-[#782e29] py-4 text-[1.1rem] rounded-lg mt-[20px] transition hover:bg-[#5e231f] cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Criando conta..." : "Criar Conta"}
            </button>
          </form>

          <div className="text-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">
              Já tem uma conta?{" "}
              <button type="button" onClick={() => navigate("/login")}
                className="text-[#782e29] font-medium underline hover:no-underline transition">
                Faça login aqui
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Modal de confirmação de e-mail */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">

            {sucesso ? (
              /* — estado: confirmado com sucesso — */
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
              /* — estado: tempo esgotado — */
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
                  className="w-full bg-[#782e29] text-white py-2.5 rounded-md font-medium hover:bg-[#5e231f] transition cursor-pointer"
                >
                  Voltar ao cadastro
                </button>
              </div>

            ) : erroConfirmacao ? (
              /* — estado: código incorreto — */
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
                    className="flex-1 bg-[#782e29] text-white py-2.5 rounded-md font-medium hover:bg-[#5e231f] transition cursor-pointer active:scale-95"
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
              /* — estado: aguardando código — */
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
                    onChange={(e) => setCodigo(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    className="flex-1 p-2.5 border border-gray-300 rounded-md text-gray-800 text-sm tracking-[0.3em] text-center focus:outline-none focus:ring-2 focus:ring-[#782e29] transition"
                  />
                  <button
                    onClick={handleConfirmar}
                    disabled={confirmando || codigo.length < 6}
                    className="px-4 py-2 bg-[#782e29] text-white rounded-md text-sm font-medium hover:bg-[#5e231f] transition cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {confirmando ? "Verificando..." : "Confirmar"}
                  </button>
                </div>

                {/* Contador regressivo */}
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

export default EmpreendedorForm;