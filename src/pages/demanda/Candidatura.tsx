import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDemandaById } from '../../services/demanda.service';
import { criarCandidatura } from '../../services/candidatura.service';

interface pageParams extends Record<string, string> {
  id: string; // demanda id
}

const Candidatura: React.FC = () => {
  const { id } = useParams<pageParams>();
  const navigate = useNavigate();

  const [demanda, setDemanda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    if (!id) return;
    getDemandaById(Number(id))
      .then(setDemanda)
      .catch(() => setErro('Demanda não encontrada.'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleCandidatar() {
    if (!confirm('Confirmar candidatura para esta demanda?')) return;
    setEnviando(true);
    try {
      await criarCandidatura(Number(id));
      setSucesso(true);
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      setErro(
        Array.isArray(mensagem)
          ? mensagem.join('\n')
          : mensagem ?? 'Erro ao enviar candidatura.'
      );
    } finally {
      setEnviando(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-gray-500">Carregando demanda...</p>
    </div>
  );

  if (sucesso) return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#F1F7EE] gap-4">
      <div className="bg-white border border-gray-200 rounded-lg p-10 shadow-md text-center max-w-md">
        <div className="text-green-600 text-5xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Candidatura enviada!</h2>
        <p className="text-gray-600 mb-6">
          Sua candidatura para <strong>{demanda?.nome}</strong> foi registrada com status <strong>Pendente</strong>. Aguarde a avaliação do coordenador.
        </p>
        <button
          onClick={() => navigate('/dashboard_grupo')}
          className="w-full bg-[#546873] text-white py-3 rounded-md font-medium hover:bg-[#495a63] transition cursor-pointer"
        >
          Ir para o Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <div className="w-11/12 max-w-2xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Manifestar Interesse
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          Confirme sua candidatura para a demanda abaixo
        </p>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-4 mb-6 text-sm">
            {erro}
          </div>
        )}

        {demanda && (
          <div className="bg-[#F1F7EE] border border-gray-200 rounded-lg p-6 mb-8 space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">{demanda.nome}</h2>
            <p className="text-gray-600 text-sm">{demanda.descricao}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {demanda.tipos?.map((t: string, i: number) => (
                <span key={i} className="bg-[#021926] text-white text-[10px] px-3 py-1 rounded-full font-medium">
                  {t}
                </span>
              ))}
              {demanda.semestreRecomendado && (
                <span className="bg-[#546873] text-white text-[10px] px-3 py-1 rounded-full font-medium">
                  A partir do {demanda.semestreRecomendado}º semestre
                </span>
              )}
            </div>

            {demanda.empreendedor && (
              <p className="text-sm text-gray-500 pt-1">
                Empreendedor: <span className="font-medium text-gray-700">{demanda.empreendedor.empresa}</span>
              </p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleCandidatar}
            disabled={enviando}
            className="flex-1 bg-[#782E29] text-white py-3 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enviando ? 'Enviando...' : 'Confirmar Candidatura'}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Candidatura;