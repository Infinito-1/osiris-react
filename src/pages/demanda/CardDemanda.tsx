import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

interface CardDemandaProps {
  id: number;
  titulo: string;
  empreendedor: string;
  tipo: string;
  descricao: string;
  semestreRecomendado: string | null;
}

const CardDemanda: React.FC<CardDemandaProps> = ({
  id,
  titulo,
  empreendedor,
  tipo,
  descricao,
  semestreRecomendado,
}) => {
  const { isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();

  function handleManifestarInteresse() {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (usuario?.tipo === 'Grupo') {
      navigate(`/candidatura/${id}`); // ajuste a rota conforme existir
    }
  }
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-full flex flex-col">
      <h3 className="text-xl break-words font-semibold text-gray-800 mb-1">
        {titulo}
      </h3>
      <div className="flex flex-wrap items-center gap-1 text-sm text-gray-600 mb-2">
        <span>{empreendedor}</span>
        {tipo && (
          <>
            <span>/</span>
            <span>{tipo}</span>
          </>
        )}
        {semestreRecomendado && (
          <>
            <span>/</span>
            <span>A partir do {semestreRecomendado}º semestre</span>
          </>
        )}
      </div>
      <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
        {descricao}
      </p>

      <div className="flex flex-col space-y-2">
        {(!isAuthenticated || usuario?.tipo === 'Grupo') && (
          <button
            onClick={handleManifestarInteresse}
            className="flex items-center space-x-1 bg-[#792E29] text-white py-2 px-3 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-[#6d2823] cursor-pointer"
          >
            <span>Manifestar Interesse</span>
          </button>
        )}
        <Link to={`/projeto/${id}`}>
          <button className="cursor-pointer w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-300 shadow-md">
            Ver Detalhes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardDemanda;