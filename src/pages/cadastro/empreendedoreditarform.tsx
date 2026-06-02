import Lamp from "../../assets/img/login/lamp.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { PasswordInput } from "../../components/PasswordInput";

interface EditarEmpreendedorDto {
  usuStrNome: string;
  usuStrEmail: string;
  usuStrTelefone?: string;
  empStrEmpresa: string;
  empChaCnpj?: string;
}

function EmpreendedorEditarForm() {
  const navigate = useNavigate();
  const passwordHook = usePasswordValidation();
  const [alterarSenha, setAlterarSenha] = useState(false);
  const [empIntId, setEmpIntId] = useState<number | null>(null);
  const [usuIntId, setUsuIntId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditarEmpreendedorDto>();

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const res = await api.get('/empreendedores/perfil/me');
        const emp = res.data;
        setEmpIntId(emp.empIntId);
        setUsuIntId(emp.usuario?.usuIntId ?? null);
        reset({
          usuStrNome: emp.usuario?.usuStrNome ?? '',
          usuStrEmail: emp.usuario?.usuStrEmail ?? '',
          usuStrTelefone: emp.usuario?.usuStrTelefone ?? '',
          empStrEmpresa: emp.empStrEmpresa ?? '',
          empChaCnpj: emp.empChaCnpj ?? '',
        });
      } catch {
        navigate('/empreendedor');
      } finally {
        setLoading(false);
      }
    }
    carregarPerfil();
  }, []);

  const onSubmit = async (data: EditarEmpreendedorDto) => {
    if (alterarSenha) {
      passwordHook.setTouched(true);
      if (!passwordHook.isValid) return;
    }

    try {
      if (usuIntId) {
        await api.put(`/usuarios/${usuIntId}`, {
          usuStrNome: data.usuStrNome,
          usuStrEmail: data.usuStrEmail,
          usuStrTelefone: data.usuStrTelefone,
          ...(alterarSenha && passwordHook.password
            ? { usuStrSenha: passwordHook.password }
            : {}),
        });
      }

      if (empIntId) {
        await api.put(`/empreendedores/${empIntId}`, {
          empStrEmpresa: data.empStrEmpresa,
          empChaCnpj: data.empChaCnpj || undefined,
        });
      }

      navigate('/empreendedor');
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
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
    <section className="login-section flex flex-col items-center justify-center min-h-screen py-6 sm:py-10 md:py-[60px] px-4 sm:px-6 font-inter text-[#021926] bg-[#F1F7EE]">
      <div className="text-center mb-8 sm:mb-10 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-[2.5rem] font-semibold mb-2">Osíris</h1>
        <p className="text-sm sm:text-base md:text-[1.1rem] font-medium">Editar perfil</p>
      </div>

      <div className="empreendedor-form text-left w-full sm:w-[680px] max-w-md sm:max-w-none bg-white border border-[#d3d3d3] rounded-xl p-6 sm:p-8 md:p-[50px] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
        <div className="top-icon flex justify-center mb-6 sm:mb-[25px]">
          <img
            src={Lamp}
            alt="Ícone de lâmpada"
            className="w-16 sm:w-20 md:w-[90px] h-16 sm:h-20 md:h-[90px] rounded-full p-3 sm:p-4 md:p-[15px] bg-[#782e29]"
          />
        </div>

        <h3 className="text-center my-2 mb-2 text-lg sm:text-xl md:text-[1.4rem] font-semibold">
          Editar Perfil — Empreendedor
        </h3>
        <p className="text-center text-sm sm:text-base md:text-[1rem] text-gray-600 mb-6 sm:mb-[45px] font-normal">
          Atualize suas informações de perfil
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nome + Email */}
          <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-[35px] mb-5 sm:mb-[30px]">
            <div className="form-group">
              <label htmlFor="usuStrNome" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                Nome Completo
              </label>
              <input
                {...register('usuStrNome', { required: 'Nome obrigatório' })}
                type="text"
                id="usuStrNome"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
              />
              {errors.usuStrNome && (
                <span className="text-red-500 text-xs mt-1">{errors.usuStrNome.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="usuStrEmail" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                E-mail
              </label>
              <input
                {...register('usuStrEmail', {
                  required: 'E-mail obrigatório',
                  pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' },
                })}
                type="email"
                id="usuStrEmail"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
              />
              {errors.usuStrEmail && (
                <span className="text-red-500 text-xs mt-1">{errors.usuStrEmail.message}</span>
              )}
            </div>
          </div>

          {/* Telefone + Empresa */}
          <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-[35px] mb-5 sm:mb-[30px]">
            <div className="form-group">
              <label htmlFor="usuStrTelefone" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                Telefone
              </label>
              <input
                {...register('usuStrTelefone')}
                type="text"
                id="usuStrTelefone"
                placeholder="(11) 99999-9999"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
              />
            </div>

            <div className="form-group">
              <label htmlFor="empStrEmpresa" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
                Empresa / Negócio
              </label>
              <input
                {...register('empStrEmpresa', { required: 'Empresa obrigatória' })}
                type="text"
                id="empStrEmpresa"
                className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
              />
              {errors.empStrEmpresa && (
                <span className="text-red-500 text-xs mt-1">{errors.empStrEmpresa.message}</span>
              )}
            </div>
          </div>

          {/* CNPJ */}
          <div className="form-group mb-5 sm:mb-[30px]">
            <label htmlFor="empChaCnpj" className="block text-sm sm:text-base font-medium mb-2 text-[#021926]">
              CNPJ <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              {...register('empChaCnpj', {
                minLength: { value: 14, message: 'CNPJ deve ter 14 dígitos' },
                maxLength: { value: 14, message: 'CNPJ deve ter 14 dígitos' },
              })}
              type="text"
              id="empChaCnpj"
              placeholder="00000000000000"
              className="w-full border border-[#d3d3d3] rounded-lg p-2.5 sm:p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#782e29] transition"
            />
            {errors.empChaCnpj && (
              <span className="text-red-500 text-xs mt-1">{errors.empChaCnpj.message}</span>
            )}
          </div>

          {/* Toggle alterar senha */}
          <div className="flex items-center gap-3 mb-5 sm:mb-[30px]">
            <input
              type="checkbox"
              id="alterarSenha"
              checked={alterarSenha}
              onChange={e => setAlterarSenha(e.target.checked)}
              className="w-4 h-4 accent-[#782e29] cursor-pointer"
            />
            <label htmlFor="alterarSenha" className="text-sm font-medium text-[#021926] cursor-pointer">
              Alterar senha
            </label>
          </div>

          {alterarSenha && (
            <div className="form-group mb-6 sm:mb-[30px]">
              <PasswordInput
                id="senhaEmp"
                label="Nova Senha"
                hook={passwordHook}
                register={register('usuStrSenha' as any)}
              />
            </div>
          )}

          <div className="flex gap-3 mt-[20px]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 text-white bg-[#782e29] py-4 text-[1.1rem] rounded-lg transition hover:bg-[#5e231f] cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/empreendedor')}
              className="flex-1 bg-gray-200 text-gray-700 py-4 text-[1.1rem] rounded-lg transition hover:bg-gray-300 cursor-pointer active:scale-95"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EmpreendedorEditarForm;