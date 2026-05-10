import React, { useEffect, useState } from 'react';
import pessoas from "../../assets/img/icones/pessoas.svg";
import Lupa from "../../assets/img/icones/lupa.svg";
import foguete from "../../assets/img/icones/foguete.svg";
import { getGruposByNome, getGrupos } from '../../services/grupos.service';
import { GrupoCard } from '../../components/grupoCard/grupocard';



const Grupos: React.FC = () => {

    const[grupos, setGrupos] = useState<any[]>([]);
    const[busca, setBusca] = useState('');

    useEffect(() => {
        async function listar(){
            const data= await getGrupos();
            setGrupos(data);
        }
        listar();
    }, []);

    async function buscaGrupo(e: React.FormEvent) {
    e.preventDefault();

    const data = await getGruposByNome(busca);
    setGrupos(data);
    }

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE]">
            {/* Seção do Cabeçalho (Fundo Azul Escuro) */}
            <section className="w-full bg-[#021926] text-[#FFFBF2] py-10 md:py-16 flex justify-center">
                <div className="w-11/12 max-w-6xl flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-1">Grupos</h1>
                    <p className="text-lg mb-8">Conheça os grupos de estudantes</p>

                    {/* Formulário de Busca */}
                    <form 
                        onSubmit={buscaGrupo}
                        className="flex items-center w-full max-w-xl bg-[#FFFBF2] rounded-full overflow-hidden mb-8 shadow-lg">
                        <input
                            type="text"
                            name="name"
                            placeholder="Busque um grupo"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            required
                            className="flex-grow py-3 px-6 border-none outline-none text-gray-800 placeholder-gray-500 text-base"
                        />
                        <button type="submit" className="p-3 focus:outline-none">
                            {/* O ícone precisa ser estilizado para uma cor escura */}
                            <img src={Lupa} alt="Buscar" className="w-5 h-5 filter invert(10%) sepia(10%) saturate(1000%) hue-rotate(180deg) brightness(50%)" />
                        </button>
                    </form>

                    {/* Botões de Ação (Cadastrar Projeto e Formar Equipe) */}
                    <div className="flex gap-4 mt-2 justify-center max-[500px]:flex-wrap">
                        <button className="flex items-center space-x-2 bg-[#5F747F] text-white py-3 px-5 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-[#556872]">
                            <img src={foguete} alt="Cadastrar Projeto" className="w-5 h-5" />
                            <p>Cadastrar Projeto</p>
                        </button>
                        <button className="flex items-center space-x-2 bg-[#F1F7EE] text-[#000000] py-3 px-5 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-[#c4c9c2]">
                            <img src={pessoas} alt="Formar Equipe" className="w-5 h-5" />
                            <p>Formar Equipe</p>
                        </button>
                    </div>
                </div>
            </section>

            {/* Seção da Lista de Grupos */}
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
