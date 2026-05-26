import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { criarDemanda } from '../../services/demanda.service';
import { useAuth } from '../../hooks/useAuth';
import { getPerfilEmpreendedor } from '../../services/empreendedores.service';

interface CadastrarDemandaFormDto {
  demStrNome: string;
  demStrDescricao: string;
  demBoolAceitaMudancaTipo: boolean;
  tipStrNomes: string;
}

export default function CadastrarDemanda() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastrarDemandaFormDto>();

  const onSubmit = async (data: CadastrarDemandaFormDto) => {
    try {
      const perfil = await getPerfilEmpreendedor();
      await criarDemanda({
        demStrNome: data.demStrNome,
        demStrDescricao: data.demStrDescricao,
        demBoolAceitaMudancaTipo: data.demBoolAceitaMudancaTipo,
        empIntId: perfil?.id, 
        tipStrNomes: data.tipStrNomes
          ? data.tipStrNomes.split(',').map(t => t.trim()).filter(Boolean)
          : [],
      });
      navigate('/empreendedor');
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join('\n')
          : mensagem ?? 'Erro ao cadastrar demanda.'
      );
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <div className="w-11/12 max-w-xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Cadastrar Demanda
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nome */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="demStrNome" className="text-sm font-medium text-gray-700">
              Nome da demanda / projeto a ser desenvolvido
            </label>
            <input
              {...register('demStrNome', { required: 'Nome obrigatório' })}
              id="demStrNome"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]"
            />
            {errors.demStrNome && (
              <span className="text-red-500 text-xs">{errors.demStrNome.message}</span>
            )}
          </div>

          {/* Descrição */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="demStrDescricao" className="text-sm font-medium text-gray-700">
              Descrição — detalhe suas necessidades
            </label>
            <textarea
              {...register('demStrDescricao', { required: 'Descrição obrigatória' })}
              id="demStrDescricao"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] resize-none"
            />
            {errors.demStrDescricao && (
              <span className="text-red-500 text-xs">{errors.demStrDescricao.message}</span>
            )}
          </div>

          {/* Tipos */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="tipStrNomes" className="text-sm font-medium text-gray-700">
              Tipo (separe por vírgula)
            </label>
            <input
              {...register('tipStrNomes')}
              id="tipStrNomes"
              type="text"
              placeholder="Ex: Site, Aplicativo Mobile"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]"
            />
          </div>

          {/* Aceita mudança de tipo */}
          <div className="flex items-center gap-3">
            <input
              {...register('demBoolAceitaMudancaTipo')}
              id="demBoolAceitaMudancaTipo"
              type="checkbox"
              className="w-4 h-4 accent-[#782E29] cursor-pointer"
            />
            <label htmlFor="demBoolAceitaMudancaTipo" className="text-sm font-medium text-gray-700 cursor-pointer">
              Aceita proposta de mudança no tipo?
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#782E29] text-white py-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#6d2823] shadow-md cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}