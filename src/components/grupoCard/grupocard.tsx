import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import pessoas from "../../assets/img/icones/pessoas.svg";
import Person from "../../assets/img/icones/Person.svg";

export interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  lider: string;
  tamanho: number;
  membros?: string;
  semestre: string;
  email?: string;
}

interface Props {
  grupo: Grupo;
}

export const GrupoCard: React.FC<Props> = ({ grupo }) => {
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [copiado, setCopiado] = useState(false);

  function handleCopiar() {
    if (!grupo.email) return;
    navigator.clipboard.writeText(grupo.email).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  }

  return (
    <>
      <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-md flex flex-col transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">

        {/* Título */}
        <div className="flex items-center space-x-2 mb-3">
          <img src={pessoas} alt="Ícone de Pessoas" />
          <h3 className="text-xl font-semibold text-gray-800">{grupo.nome}</h3>
        </div>

        {/* Descrição */}
        <p className="text-sm text-gray-600 mb-4 flex-grow">{grupo.descricao}</p>

        {/* Membros + semestre */}
        <div className="flex items-center space-x-1 mb-5">
          <img src={Person} alt="Ícone de Pessoa" />
          <h5 className="text-xs font-normal text-gray-600">
            {grupo.tamanho} Membros - {grupo.semestre}º semestre
          </h5>
        </div>

        {/* Botões */}
        <div className="flex flex-col space-y-2 mt-auto">
          <button
            className="bg-[#5F747F] text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[#53656e] cursor-pointer active:scale-95"
            onClick={() => navigate(`/perfil_grupo/${grupo.id}`)}
          >
            Ver Detalhes
          </button>

          <button
            className="bg-[#782E29] text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[#6d2823] cursor-pointer active:scale-95"
            onClick={() => setModalAberto(true)}
          >
            Entrar em Contato
          </button>
        </div>
      </div>

      {/* Modal de contato */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Entrar em Contato</h2>
            <p className="text-gray-500 text-sm mb-6">
              Entre em contato com o grupo <strong>{grupo.nome}</strong> pelo e-mail abaixo:
            </p>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                readOnly
                value={grupo.email ?? 'E-mail não disponível'}
                className="flex-1 p-2.5 border border-gray-300 rounded-md bg-gray-50 text-gray-800 text-sm focus:outline-none cursor-text select-all"
                onClick={e => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={handleCopiar}
                disabled={!grupo.email}
                className="px-4 py-2 bg-[#782E29] text-white rounded-md text-sm font-medium hover:bg-[#53656e] transition cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copiado ? 'Copiado!' : 'Copiar'}
              </button>
            </div>

            <button
              onClick={() => { setModalAberto(false); setCopiado(false); }}
              className="w-full bg-[#5F747F] text-white py-2.5 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};