import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDemandaById } from "../../services/demanda.service";
import { useAuth } from "../../hooks/useAuth";

interface InfoFieldProps {
  label: string;
  value: string | null | undefined;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => (
  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
    <p className="text-base font-medium text-gray-800">{label}</p>
    <p className="text-base text-gray-600">{value ?? '—'}</p>
  </div>
);

interface pageParams extends Record<string, string> {
  id: string;
}

const Projeto: React.FC = () => {
  const { id } = useParams<pageParams>();
  const navigate = useNavigate();
  const { isAuthenticated, usuario } = useAuth();

  const [demanda, setDemanda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!id) return;
    getDemandaById(Number(id))
      .then(setDemanda)
      .catch(() => setErro('Demanda não encontrada.'))
      .finally(() => setLoading(false));
  }, [id]);

  function handleManifestarInteresse() {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (usuario?.tipo === 'Grupo') {
      navigate(`/candidatura/${id}`);
    }
  }

  const mostrarBotao = !isAuthenticated || usuario?.tipo === 'Grupo';

  if (loading) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-gray-500">Carregando projeto...</p>
    </div>
  );

  if (erro || !demanda) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-red-600">{erro || 'Erro ao carregar projeto.'}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <header className="w-full py-8 text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">{demanda.nome}</h1>
        <p className="text-lg mt-1 text-gray-600">
          {demanda.empreendedor?.empresa ?? '—'}
          {demanda.tipos?.length > 0 && ` / ${demanda.tipos[0]}`}
        </p>
      </header>

      <div className="w-11/12 max-w-4xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
        {/* Descrição */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Descrição do Projeto
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            {demanda.descricao}
          </p>
        </section>

        {/* Sobre o Empreendedor */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Sobre o Empreendedor
          </h2>
          <div className="space-y-4">
            <InfoField
              label="Nome:"
              value={demanda.empreendedor?.usuario?.nome}
            />
            <InfoField
              label="Empresa:"
              value={demanda.empreendedor?.empresa}
            />
            <InfoField
              label="E-mail:"
              value={demanda.empreendedor?.usuario?.email}
            />
          </div>
        </section>

        {/* Detalhes técnicos */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Detalhes Técnicos
          </h2>
          <div className="space-y-4">
            {demanda.semestreRecomendado && (
              <InfoField
                label="Semestre mínimo recomendado:"
                value={`A partir do ${demanda.semestreRecomendado}º semestre`}
              />
            )}
            {demanda.areaTecnica && (
              <InfoField
                label="Área técnica / Requisitos:"
                value={demanda.areaTecnica}
              />
            )}
            {demanda.tipos?.length > 0 && (
              <InfoField
                label="Tipos:"
                value={demanda.tipos.join(', ')}
              />
            )}
            <InfoField
              label="Aceita mudança de tipo:"
              value={demanda.aceitaMudancaTipo ? 'Sim' : 'Não'}
            />
          </div>
        </section>

        {/* Botões */}
        <section className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
          {mostrarBotao && (
            <button
              onClick={handleManifestarInteresse}
              className="flex-1 bg-[#782E29] text-white py-3 px-6 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#6d2823] shadow-md cursor-pointer"
            >
              Manifestar Interesse
            </button>
          )}
          <button className="flex-1 bg-[#5F747F] text-white py-3 px-6 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#53656e] shadow-md cursor-pointer">
            Entrar em Contato
          </button>
        </section>
      </div>
    </div>
  );
};

export default Projeto;