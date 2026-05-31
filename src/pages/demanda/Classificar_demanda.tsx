import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getDemandaById } from '../../services/demanda.service';
import { classificarDemanda, aprovarDemanda } from '../../services/coordenador.service';
import { api } from '../../api/axios';

interface ClassificarDemandaFormDto {
  semestre: string;
  areaTecnica: string;
}

export default function ClassificarDemanda() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const demandaId = Number(searchParams.get('id'));

  const [descricao, setDescricao] = useState('');
  const [nomeDemanda, setNomeDemanda] = useState('');
  const [loading, setLoading] = useState(true);

  const [semestres, setSemestres] = useState<{ semIntId: number; semStrDescricao: string }[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClassificarDemandaFormDto>();

  useEffect(() => {
    if (!demandaId) return;
    getDemandaById(demandaId)
      .then(d => {
        setDescricao(d?.descricao ?? '');
        setNomeDemanda(d?.nome ?? '');
      })
      .finally(() => setLoading(false));
  }, [demandaId]);

  useEffect(() => {
    api.get('/semestres').then(res => setSemestres(res.data));
  }, []);

  const onSubmit = async (data: ClassificarDemandaFormDto) => {
    try {
      await classificarDemanda(demandaId, {
        semestre: data.semestre,
        areaTecnica: data.areaTecnica,
      });
      await aprovarDemanda(demandaId);
      navigate('/coordenador');
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join('\n')
          : mensagem ?? 'Erro ao classificar demanda.'
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
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Classificação da Demanda
        </h1>
        {nomeDemanda && (
          <p className="text-center text-gray-500 text-sm mb-8">{nomeDemanda}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Descrição — readonly */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Descrição da demanda
            </label>
            <textarea
              value={descricao}
              readOnly
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 cursor-default resize-none focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="semestre" className="text-sm font-medium text-gray-700">
              Semestre mínimo recomendado
            </label>
            <select
              {...register('semestre', { required: 'Semestre obrigatório' })}
              id="semestre"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] bg-white cursor-pointer"
            >
              <option value="">Selecione o semestre mínimo</option>
              {semestres.map(s => (
                <option key={s.semIntId} value={s.semStrDescricao}>
                  {s.semStrDescricao}º semestre
                </option>
              ))}
            </select>
            {errors.semestre && (
              <span className="text-red-500 text-xs">{errors.semestre.message}</span>
            )}
          </div>

          {/* Área técnica / requisitos */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="areaTecnica" className="text-sm font-medium text-gray-700">
              Requisitos técnicos exigidos
            </label>
            <input
              {...register('areaTecnica', { required: 'Área técnica obrigatória' })}
              id="areaTecnica"
              type="text"
              placeholder="Ex: React, Node.js, banco de dados relacional"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]"
            />
            {errors.areaTecnica && (
              <span className="text-red-500 text-xs">{errors.areaTecnica.message}</span>
            )}
          </div>

          

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#782E29] text-white py-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#6d2823] shadow-md cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publicando...' : 'Classificar e Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}