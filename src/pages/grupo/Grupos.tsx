import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import foguete from "../../assets/img/icones/foguete.svg";
import send from "../../assets/img/icones/send.svg";
import { getGruposByNome, getGrupos } from '../../services/grupos.service';
import { GrupoCard } from '../../components/grupoCard/grupocard';
import { useAuth } from '../../hooks/useAuth';

const BotaoComTooltip: React.FC<{
  label: string;
  icone: string;
  iconeAlt: string;
  onClick: () => void;
  tooltip?: string;
  className: string;
}> = ({ label, icone, iconeAlt, onClick, tooltip, className }) => {
  const [tooltipVisivel, setTooltipVisivel] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClick() {
    if (tooltip) {
      setTooltipVisivel(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setTooltipVisivel(false), 2500);
    } else {
      onClick();
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`flex items-center space-x-2 py-3 px-5 rounded-lg text-base font-medium transition-colors duration-200 cursor-pointer ${className}`}
      >
        <img src={icone} alt={iconeAlt} className="w-5 h-5" />
        <p>{label}</p>
      </button>
      {tooltip && tooltipVisivel && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded-md px-3 py-2 whitespace-nowrap z-10 shadow-lg">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
};

const Grupos: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, usuario } = useAuth();
  const [grupos, setGrupos] = useState<any[]>([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    getGrupos().then(setGrupos).catch(() => setGrupos([]));
  }, []);

  async function buscaGrupo(e: React.FormEvent) {
    e.preventDefault();
    if (!busca.trim()) {
      const data = await getGrupos();
      setGrupos(data);
      return;
    }
    const data = await getGruposByNome(busca);
    setGrupos(data);
  }

  function getCadastrarProjetoProps() {
    if (!isAuthenticated) return { onClick: () => navigate('/login'), tooltip: undefined };
    if (usuario?.tipo === 'Grupo') return { onClick: () => navigate('/entrega'), tooltip: undefined };
    return { onClick: () => {}, tooltip: 'Disponível apenas para grupos' };
  }

  function getEnviarDemandaProps() {
    if (!isAuthenticated) return { onClick: () => navigate('/login'), tooltip: undefined };
    if (usuario?.tipo === 'Empreendedor') return { onClick: () => navigate('/cadastrar_demanda'), tooltip: undefined };
    return { onClick: () => {}, tooltip: 'Disponível apenas para empreendedores' };
  }

  const projetoProps = getCadastrarProjetoProps();
  const demandaProps = getEnviarDemandaProps();

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE]">
      <section className="w-full bg-[#021926] text-[#FFFBF2] py-10 md:py-16 flex justify-center">
        <div className="w-11/12 max-w-6xl flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-1">Grupos</h1>
          <p className="text-lg mb-8">Conheça os grupos de estudantes</p>

          {/* Busca */}
          <form
            onSubmit={buscaGrupo}
            className="w-11/12 max-w-2xl mx-auto mb-8"
          >
            <div className="relative flex items-center w-full bg-[#FFFBF2] rounded-full overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Busque um grupo"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full p-3 pl-5 rounded-full text-gray-800 focus:outline-none"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Botões */}
          <div className="flex gap-4 mt-2 justify-center max-[500px]:flex-wrap">
            <BotaoComTooltip
              label="Cadastrar Projeto"
              icone={foguete}
              iconeAlt="Cadastrar Projeto"
              onClick={projetoProps.onClick}
              tooltip={projetoProps.tooltip}
              className="bg-[#5F747F] text-white hover:bg-[#556872]"
            />
            <BotaoComTooltip
              label="Enviar Demanda"
              icone={send}
              iconeAlt="Enviar Demanda"
              onClick={demandaProps.onClick}
              tooltip={demandaProps.tooltip}
              className="bg-[#F1F7EE] text-[#000000] hover:bg-[#c4c9c2]"
            />
          </div>
        </div>
      </section>

      <section className="w-11/12 max-w-6xl py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {grupos.map((grupo) => (
            <GrupoCard key={grupo.id} grupo={grupo} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Grupos;