import Book from "../../assets/img/login/book.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { PasswordInput } from "../../components/PasswordInput";

interface EditarCoordenadorDto {
  usuStrNome: string;
  usuStrEmail: string;
  cooStrCurso: string;
  usuStrSenha?: string;
}

function CoordenadorForm() {
  const navigate = useNavigate();
  const passwordHook = usePasswordValidation();
  const [alterarSenha, setAlterarSenha] = useState(false);
  const [cooIntId, setCooIntId] = useState<number | null>(null);
  const [usuIntId, setUsuIntId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditarCoordenadorDto>();

  useEffect(() => {
    async function carregarPerfil() {
      try {
        // busca perfil do coordenador logado
        const resCoo = await api.get('/coordenadores/perfil/me');
        const coo = resCoo.data;
        setCooIntId(coo.cooIntId);
        setUsuIntId(coo.usuario?.usuIntId ?? null);
        reset({
          usuStrNome: coo.usuario?.usuStrNome ?? '',
          usuStrEmail: coo.usuario?.usuStrEmail ?? '',
          cooStrCurso: coo.cooStrCurso ?? '',
        });
      } catch {
        navigate('/coordenador');
      } finally {
        setLoading(false);
      }
    }
    carregarPerfil();
  }, []);

  const onSubmit = async (data: EditarCoordenadorDto) => {
    if (alterarSenha) {
      passwordHook.setTouched(true);
      if (!passwordHook.isValid) {
        return;
      }
    }

    try {
      // atualiza dados do usuário base
      if (usuIntId) {
        await api.put(`/usuarios/${usuIntId}`, {
          usuStrNome: data.usuStrNome,
          usuStrEmail: data.usuStrEmail,
          ...(alterarSenha && passwordHook.password
            ? { usuStrSenha: passwordHook.password }
            : {}),
        });
      }

      // atualiza curso do coordenador
      if (cooIntId) {
        await api.put(`/coordenadores/${cooIntId}`, {
          cooStrCurso: data.cooStrCurso,
        });
      }

      navigate('/coordenador');
    } catch (error: unknown) {
      const mensagem = (error as { response?: { data?: { message?: unknown } } })?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join('\n')
          : mensagem ?? 'Erro ao atualizar perfil.'
      );
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-gray-500">Carregando perfil...</p>
    </div>
  );

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-6 sm:py-10 md:py-[60px] px-4 sm:px-6 font-inter bg-[#F1F7EE]">
      <div className="text-center mb-8 sm:mb-10 w-full">
        <h1 className="text-[#021926] text-2xl sm:text-3xl md:text-[2.4rem] font-semibold mb-2">
          Osíris
        </h1>
        <p className="text-sm sm:text-base md:text-[1.05rem] font-medium text-[#021926]">
          Editar perfil
        </p>
      </div>

      <div className="w-full sm:w-[680px] max-w-md sm:max-w-none bg-white border border-[#d3d3d3] rounded-xl p-6 sm:p-8 md:p-[50px] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
        <div className="flex justify-center mb-6 sm:mb-[25px]">
          <img
            src={Book}
            alt="Ícone Coordenador"
            className="w-16 sm:w-20 md:w-[90px] h-16 sm:h-20 md:h-[90px] rounded-full p-3 sm:p-4 md:p-[15px] bg-[#4f534e]"
          />
        </div>

        <h3 className="text-center text-lg sm:text-xl md:text-[1.35rem] font-semibold mb-2 text-[#021926]">
          Editar Perfil — Coordenador
        </h3>

        <p className="text-center text-xs sm:text-sm md:text-[0.95rem] text-gray-600 mb-6 sm:mb-[45px]">
          Atualize suas informações de perfil
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nome */}
          <div className="mb-5 sm:mb-[30px]">
            <label htmlFor="usuStrNome" className="block mb-2 text-sm sm:text-base font-medium text-[#021926]">
              Nome
            </label>
            <input
              {...register('usuStrNome', { required: 'Nome obrigatório' })}
              type="text"
              id="usuStrNome"
              placeholder="Digite seu nome completo"
              className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4f534e] transition"
            />
            {errors.usuStrNome && (
              <span className="text-red-500 text-xs mt-1">{errors.usuStrNome.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="mb-5 sm:mb-[30px]">
            <label htmlFor="usuStrEmail" className="block mb-2 text-sm sm:text-base font-medium text-[#021926]">
              E-mail
            </label>
            <input
              {...register('usuStrEmail', {
                required: 'E-mail obrigatório',
                pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' },
              })}
              type="email"
              id="usuStrEmail"
              placeholder="seu.email@exemplo.com"
              className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4f534e] transition"
            />
            {errors.usuStrEmail && (
              <span className="text-red-500 text-xs mt-1">{errors.usuStrEmail.message}</span>
            )}
          </div>

          {/* Curso */}
          <div className="mb-5 sm:mb-[30px]">
            <label htmlFor="cooStrCurso" className="block mb-2 text-sm sm:text-base font-medium text-[#021926]">
              Curso
            </label>
            <input
              {...register('cooStrCurso', { required: 'Curso obrigatório' })}
              type="text"
              id="cooStrCurso"
              placeholder="Ex: Análise e Desenvolvimento de Sistemas"
              className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#4f534e] transition"
            />
            {errors.cooStrCurso && (
              <span className="text-red-500 text-xs mt-1">{errors.cooStrCurso.message}</span>
            )}
          </div>

          {/* Toggle alterar senha */}
          <div className="flex items-center gap-3 mb-5 sm:mb-[30px]">
            <input
              type="checkbox"
              id="alterarSenha"
              checked={alterarSenha}
              onChange={e => setAlterarSenha(e.target.checked)}
              className="w-4 h-4 accent-[#4f534e] cursor-pointer"
            />
            <label htmlFor="alterarSenha" className="text-sm font-medium text-[#021926] cursor-pointer">
              Alterar senha
            </label>
          </div>

          {alterarSenha && (
            <PasswordInput
              id="senhaCoo"
              label="Nova Senha"
              hook={passwordHook}
              register={register('usuStrSenha')}
            />
          )}

          <div className="flex gap-3 mt-[20px]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 rounded-lg text-white text-[1.05rem] bg-[#4f534e] transition hover:bg-[#717271] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/coordenador')}
              className="flex-1 py-4 rounded-lg text-gray-700 text-[1.05rem] bg-gray-200 transition hover:bg-gray-300 active:scale-95 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CoordenadorForm;