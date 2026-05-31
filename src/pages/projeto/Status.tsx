import React, { useEffect, useState } from 'react';
import { getGrupoDashboard } from '../../services/grupos.service';

const Status: React.FC = () => {
  const [dados, setDados] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGrupoDashboard()
      .then(setDados)
      .catch(() => setDados(null))
      .finally(() => setLoading(false));
  }, []);

  const projeto = dados?.projetoAtual;

  return (
    <div className="flex justify-center w-full min-h-screen bg-[#F1F7EE] py-20">
      <div className="w-11/12 max-w-2xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl h-fit">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Status do Projeto
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Nome do projeto</label>
              <input
                type="text"
                value={projeto?.demanda ?? '—'}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none cursor-default"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Grupo</label>
              <input
                type="text"
                value={dados?.grupo ?? '—'}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none cursor-default"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Status atual</label>
                <input
                  type="text"
                  value={projeto?.status ?? '—'}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none cursor-default"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Empreendedor</label>
                <input
                  type="text"
                  value={projeto?.empreendedor ?? '—'}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none cursor-default"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Data de início</label>
              <input
                type="text"
                value={projeto?.dataInicio
                  ? new Date(projeto.dataInicio).toLocaleDateString('pt-BR')
                  : '—'}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none cursor-default"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;