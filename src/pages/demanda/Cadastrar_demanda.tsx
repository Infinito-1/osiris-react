import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { criarDemanda, getDemandaById } from '../../services/demanda.service';
import { api } from '../../api/axios';
import { getPerfilEmpreendedor } from '../../services/empreendedores.service';

interface DemandaFormDto {
  demStrNome: string;
  demStrDescricao: string;
  demBoolAceitaMudancaTipo: boolean;
  demBoolExibirContato: boolean;
  tipStrNomes: string;
}

export default function CadastrarDemanda() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const demandaId = searchParams.get('id');
  const modoEdicao = !!demandaId;

  const [empIntId, setEmpIntId] = useState<number | null>(null);
  const [loading, setLoading] = useState(modoEdicao);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DemandaFormDto>({
    defaultValues: {
      demBoolAceitaMudancaTipo: false,
      demBoolExibirContato: false,
    },
  });

  // busca empIntId do empreendedor logado
  useEffect(() => {
    getPerfilEmpreendedor()
      .then(p => setEmpIntId(p?.id ?? null))
      .catch(() => setEmpIntId(null));
  }, []);

  // se modo edição, carrega dados da demanda
  useEffect(() => {
    if (!modoEdicao) return;
    getDemandaById(Number(demandaId))
      .then(d => {
        reset({
          demStrNome: d.nome ?? '',
          demStrDescricao: d.descricao ?? '',
          demBoolAceitaMudancaTipo: d.aceitaMudancaTipo ?? false,
          demBoolExibirContato: d.exibirContato ?? false,
          tipStrNomes: d.tipos?.join(', ') ?? '',
        });
      })
      .catch(() => navigate('/empreendedor'))
      .finally(() => setLoading(false));
  }, [demandaId]);

  const onSubmit = async (data: DemandaFormDto) => {
    const tipos = data.tipStrNomes
      ? data.tipStrNomes.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    try {
      if (modoEdicao) {
        await api.put(`/demandas/${demandaId}`, {
          demStrNome: data.demStrNome,
          demStrDescricao: data.demStrDescricao,
          demBoolAceitaMudancaTipo: data.demBoolAceitaMudancaTipo,
          demBoolExibirContato: data.demBoolExibirContato,
          tipStrNomes: tipos,
          empIntId: empIntId ?? undefined,
        });
      } else {
        if (!empIntId) {
          alert('Perfil de empreendedor não encontrado.');
          return;
        }
        await criarDemanda({
          demStrNome: data.demStrNome,
          demStrDescricao: data.demStrDescricao,
          demBoolAceitaMudancaTipo: data.demBoolAceitaMudancaTipo,
          demBoolExibirContato: data.demBoolExibirContato,
          empIntId,
          tipStrNomes: tipos,
        });
      }
      navigate('/empreendedor');
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join('\n')
          : mensagem ?? `Erro ao ${modoEdicao ? 'atualizar' : 'cadastrar'} demanda.`
      );
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-gray-500">Carregando demanda...</p>
    </div>
  );

  return (
    <div className="flex justify-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <div className="w-11/12 max-w-xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          {modoEdicao ? 'Editar Demanda' : 'Cadastrar Demanda'}
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

          {/* Exibir contato */}
          <div className="flex items-center gap-3">
            <input
              {...register('demBoolExibirContato')}
              id="demBoolExibirContato"
              type="checkbox"
              className="w-4 h-4 accent-[#782E29] cursor-pointer"
            />
            <label htmlFor="demBoolExibirContato" className="text-sm font-medium text-gray-700 cursor-pointer">
              Autorizar exibição do meu contato para grupos interessados
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#782E29] text-white py-3 rounded-md text-lg font-medium transition hover:bg-[#6d2823] shadow-md cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? modoEdicao ? 'Salvando...' : 'Publicando...'
                : modoEdicao ? 'Salvar Alterações' : 'Publicar'}
            </button>
            {modoEdicao && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md text-lg font-medium transition hover:bg-gray-300 shadow-md cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}