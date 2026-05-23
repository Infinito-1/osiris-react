// pages/SobreGrupo/SobreGrupo.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Person from "../../assets/img/icones/Person.svg";
import calendario from "../../assets/img/icones/calendario.svg";
import pin from "../../assets/img/icones/pin.svg";
import { getGrupoById } from '../../services/grupos.service';

interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  lider: string;
  ra: string;
  tamanho: number;
  membros: string;
  portfolio: string;
  semestre: string | null;
}

const PortfolioItem: React.FC<{ texto: string }> = ({ texto }) => (
  <div className="mb-6">
    <h4 className="text-lg font-semibold text-gray-800">{texto}</h4>
    <div className="flex space-x-3 mt-2">
      <button className="bg-[#782E29] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#6d2823] transition-colors">
        Deploy
      </button>
      <button className="bg-[#5F747F] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#53656e] transition-colors">
        GitHub
      </button>
    </div>
  </div>
);

const SobreGrupo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const data = await getGrupoById(Number(id));
        setGrupo(data);
      } catch {
        setErro('Não foi possível carregar os dados do grupo.');
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id]);

  if (loading) return <p className="text-center py-20">Carregando...</p>;
  if (erro)    return <p className="text-center py-20 text-red-600">{erro}</p>;
  if (!grupo)  return null;

  const membrosLista = grupo.membros
    ? grupo.membros.split('\n').filter(Boolean)
    : [];

  const portfolioItens = grupo.portfolio
    ? grupo.portfolio.split('\n').filter(Boolean)
    : [];

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <div className="w-11/12 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          {grupo.nome}
        </h1>

        <div className="flex justify-center items-center space-x-4 text-gray-600 mb-8">
          <div className="flex items-center space-x-1">
            <img src={Person} alt="Membros" className="w-4 h-4 filter brightness-50" />
            <h5 className="text-sm">{grupo.tamanho} Membros</h5>
          </div>
          {grupo.semestre && (
            <div className="flex items-center space-x-1">
              <img src={calendario} alt="Semestre" className="w-4 h-4 filter brightness-50" />
              <h5 className="text-sm">{grupo.semestre}</h5>
            </div>
          )}
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-gray-300 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Sobre o Grupo</h3>
            <p className="text-base text-gray-600 mb-6">{grupo.descricao}</p>

            {membrosLista.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Integrantes</h3>
                <ul className="list-disc list-inside text-base text-gray-600 mb-6 ml-4">
                  {membrosLista.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </>
            )}

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Informações do Grupo</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <p className="font-medium text-gray-800">Representante:</p>
                <p className="text-gray-600">{grupo.lider ?? '—'}</p>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <p className="font-medium text-gray-800">RA:</p>
                <p className="text-gray-600">{grupo.ra}</p>
              </div>
              {grupo.semestre && (
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-800">Semestre:</p>
                  <p className="text-gray-600">{grupo.semestre}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-3 mt-8">
              <button className="bg-[#782E29] text-white py-3 px-5 rounded-md text-lg font-medium hover:bg-[#6d2823] transition-colors">
                Solicitar Entrada
              </button>
              <button className="bg-[#5F747F] text-white py-3 px-5 rounded-md text-lg font-medium hover:bg-[#53656e] transition-colors">
                Enviar Mensagem
              </button>
            </div>
          </div>

          <div className="lg:col-span-1 bg-white border border-gray-300 rounded-lg p-6 shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <img src={pin} alt="Portfólio" className="w-5 h-5 filter brightness-50" />
              <h3 className="text-xl font-semibold text-gray-800">Portfólio</h3>
            </div>
            {portfolioItens.length > 0
              ? portfolioItens.map((item, i) => <PortfolioItem key={i} texto={item} />)
              : <p className="text-sm text-gray-500">Nenhum projeto no portfólio ainda.</p>
            }
          </div>
        </section>
      </div>
    </div>
  );
};

export default SobreGrupo;