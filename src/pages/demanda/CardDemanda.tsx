import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { desativarDemanda } from '../../services/demanda.service';
import { getPerfilEmpreendedor } from '../../services/empreendedores.service';

interface CardDemandaProps {
  id: number;
  titulo: string;
  empreendedor: string;
  empId?: number; // id do empreendedor dono
  tipo: string;
  descricao: string;
  semestreRecomendado: string | null;
  onDesativar?: (id: number) => void;
}

const CardDemanda: React.FC<CardDemandaProps> = ({
  id,
  titulo,
  empreendedor,
  empId,
  tipo,
  descricao,
  semestreRecomendado,
  onDesativar,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, usuario } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const [empIntIdLogado, setEmpIntIdLogado] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated && usuario?.tipo === 'Empreendedor') {
      getPerfilEmpreendedor()
        .then(p => setEmpIntIdLogado(p?.id ?? null))
        .catch(() => setEmpIntIdLogado(null));
    }
  }, [isAuthenticated, usuario]);

  // fecha menu ao clicar fora
  useEffect(() => {
    function handleClickFora(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  const ehDono =
    isAuthenticated &&
    usuario?.tipo === 'Empreendedor' &&
    empIntIdLogado !== null &&
    empId === empIntIdLogado;

  const mostrarBotaoInteresse = !isAuthenticated || usuario?.tipo === 'Grupo';

  function handleManifestarInteresse() {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/candidatura/${id}`);
  }

  async function handleDesativar() {
    if (!confirm('Deseja desativar esta demanda?')) return;
    try {
      await desativarDemanda(id);
      onDesativar?.(id);
    } catch {
      alert('Erro ao desativar demanda.');
    }
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-full flex flex-col relative">

      {/* Header com menu hambúrguer para dono */}
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-xl break-words font-semibold text-gray-800 flex-1 pr-2">
          {titulo}
        </h3>
        {ehDono && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuAberto(prev => !prev)}
              className="p-1.5 rounded-md hover:bg-gray-100 transition cursor-pointer"
              aria-label="Opções"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {menuAberto && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={() => { setMenuAberto(false); navigate(`/demandas/${id}?editar=true`); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => { setMenuAberto(false); handleDesativar(); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  Desativar
                </button>
              </div>
            )}
          </div>
        )}
      </div>

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

      <p className="text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-3">
        {descricao}
      </p>

      <div className="flex flex-col space-y-2">
        {mostrarBotaoInteresse && (
          <button
            onClick={handleManifestarInteresse}
            className="w-full bg-[#782E29] text-white py-2 px-4 rounded-md text-base font-medium transition hover:bg-[#6d2823] shadow-md cursor-pointer"
          >
            Manifestar Interesse
          </button>
        )}
        <Link to={`/demandas/${id}`} className="w-full">
          <button className="cursor-pointer w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-base font-medium transition hover:bg-gray-300 shadow-md">
            Ver Detalhes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardDemanda;