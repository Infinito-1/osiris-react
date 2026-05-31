import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { desativarDemanda } from '../../services/demanda.service';
import { criarCandidatura } from '../../services/candidatura.service';
import { getPerfilEmpreendedor } from '../../services/empreendedores.service';
import { getGrupoById, getGrupoPerfil } from '../../services/grupos.service';

interface CardDemandaProps {
  id: number;
  titulo: string;
  empreendedor: string;
  empId?: number;
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
  const [gruIntIdLogado, setGruIntIdLogado] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // estados do modal
  const [modalAberto, setModalAberto] = useState(false);
  const [etapa, setEtapa] = useState<'confirmar' | 'sucesso'>('confirmar');
  const [enviando, setEnviando] = useState(false);
  const [erroCandidatura, setErroCandidatura] = useState('');
  const [canIntId, setCanIntId] = useState<number | null>(null);

  useEffect(() => {
    if (isAuthenticated && usuario?.tipo === 'Empreendedor') {
      getPerfilEmpreendedor()
        .then(p => setEmpIntIdLogado(p?.id ?? null))
        .catch(() => setEmpIntIdLogado(null));
    }
    if (isAuthenticated && usuario?.tipo === 'Grupo') {
    // Supondo que você tenha uma função para buscar o ID do grupo logado
      getGrupoPerfil().then(g => setGruIntIdLogado(g?.id ?? null));
    }
  }, [isAuthenticated, usuario]);

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
    setEtapa('confirmar');
    setErroCandidatura('');
    setModalAberto(true);
  }

  async function handleConfirmarCandidatura() {
    setEnviando(true);
    setErroCandidatura('');
    try {
      const candidatura = await criarCandidatura(id, gruIntIdLogado!);
      setCanIntId(candidatura?.id);
      setEtapa('sucesso');
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      setErroCandidatura(
        Array.isArray(mensagem)
          ? mensagem.join('\n')
          : mensagem ?? 'Erro ao enviar candidatura.'
      );
    } finally {
      setEnviando(false);
    }
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
    <>
      <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-full flex flex-col relative">
        {/* Header */}
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
                    onClick={() => { setMenuAberto(false); navigate(`/cadastrar_demanda?id=${id}`); }}
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
          {tipo && <><span>/</span><span>{tipo}</span></>}
          {semestreRecomendado && <><span>/</span><span>A partir do {semestreRecomendado}º semestre</span></>}
        </div>

        <p className="text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-3">{descricao}</p>

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

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">

            {etapa === 'confirmar' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Manifestar Interesse</h2>
                <p className="text-gray-600 text-sm mb-1">Você está se candidatando para:</p>
                <p className="font-semibold text-gray-800 mb-6">{titulo}</p>

                {erroCandidatura && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-3 mb-4 text-sm">
                    {erroCandidatura}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleConfirmarCandidatura}
                    disabled={enviando}
                    className="flex-1 bg-[#782E29] text-white py-3 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {enviando ? 'Enviando...' : 'Confirmar'}
                  </button>
                  <button
                    onClick={() => setModalAberto(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}

            {etapa === 'sucesso' && (
              <>
                <div className="text-green-600 text-5xl text-center mb-4">✓</div>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Candidatura enviada!</h2>
                <p className="text-gray-600 text-sm text-center mb-6">
                  Sua candidatura para <strong>{titulo}</strong> foi registrada. Deseja cadastrar o projeto agora?
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setModalAberto(false);
                      navigate(`/entrega${canIntId ? `?canIntId=${canIntId}` : ''}`);
                    }}
                    className="w-full bg-[#546873] text-white py-3 rounded-md font-medium hover:bg-[#495a63] transition cursor-pointer"
                  >
                    Cadastrar projeto agora
                  </button>
                  <button
                    onClick={() => {
                      setModalAberto(false);
                      navigate('/dashboard_grupo');
                    }}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer"
                  >
                    Fazer depois
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default CardDemanda;