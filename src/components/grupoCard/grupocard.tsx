import React from 'react';
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
}

interface Props {
  grupo: Grupo;
}

export const GrupoCard: React.FC<Props> = ({ grupo }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-md flex flex-col transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">

            {/* Título */}
            <div className="flex items-center space-x-2 mb-3">
                <img src={pessoas} alt="Ícone de Pessoas" />
                <h3 className="text-xl font-semibold text-gray-800">
                    {grupo.nome}
                </h3>
            </div>

            {/* Descrição */}
            <p className="text-sm text-gray-600 mb-4 flex-grow">
                {grupo.descricao}
            </p>

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
                    className="bg-[#5F747F] text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[#53656e]"
                    onClick={() => navigate(`/perfil_grupo/${grupo.id}`)}
                >
                    Ver Detalhes
                </button>

                <button className="bg-[#782E29] text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[#6d2823]">
                    Solicitar Entrada
                </button>

            </div>
        </div>
    );
};