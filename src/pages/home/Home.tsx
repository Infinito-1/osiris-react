import React, { useState, useMemo } from 'react';
import foguete from "../../assets/img/icones/foguete.svg"
import pessoas from "../../assets/img/icones/pessoas.svg"
import Person from "../../assets/img/icones/Person.svg";
import Tag from "../../assets/img/icones/Tag.svg";
import ExclamationCircle from "../../assets/img/icones/ExclamationCircle.svg";
import EllipseCadastro from "../../assets/img/icones/Ellipse cadastro.svg";
import EllipseDescoberta from "../../assets/img/icones/Ellipse descoberta.svg";
import EllipseExecucao from "../../assets/img/icones/Ellipse execucao.svg"
import EllipseConexao from "../../assets/img/icones/Ellipse conexao.svg";
import CarrosselHome from "../../components/carrosselHome/CarrosselHome";
import FiltroDemandas from "../../components/filtro/filtroDemandas";

// Reutilizando as interfaces e dados de exemplo de Demandas.tsx para consistência
interface Demanda {
    titulo: string;
    empreendedor: string;
    tipo: 'Sistema Web' | 'Aplicativo Mobile' | 'Landing Page' | 'E-commerce';
    complexidade: 'Básica' | 'Intermediária' | 'Avançada';
    descricao: string;
}

interface Filtros {
    tipos: string[];
    area: string;
    complexidade: string;
}

const ALL_DEMANDAS: Demanda[] = [
    {
        titulo: "Sistema de Gestão para Clínica Veterinária",
        empreendedor: "Amanda Alves",
        tipo: "Sistema Web",
        complexidade: "Intermediária",
        descricao: "Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados."
    },
    {
        titulo: "Aplicativo de Receitas Saudáveis",
        empreendedor: "Bruno Costa",
        tipo: "Aplicativo Mobile",
        complexidade: "Avançada",
        descricao: "Criação de um aplicativo mobile com receitas, lista de compras e contador de calorias. Integração com API de nutrição."
    },
    {
        titulo: "Landing Page para Consultoria Financeira",
        empreendedor: "Carla Dias",
        tipo: "Landing Page",
        complexidade: "Básica",
        descricao: "Desenvolvimento de uma landing page de alta conversão para um novo serviço de consultoria financeira."
    },
    {
        titulo: "E-commerce de Produtos Artesanais",
        empreendedor: "Daniela Esteves",
        tipo: "E-commerce",
        complexidade: "Intermediária",
        descricao: "Implementação de uma loja virtual completa para venda de produtos artesanais, com carrinho de compras e integração de pagamento."
    },
    {
        titulo: "Sistema de Agendamento Online",
        empreendedor: "Eduardo Ferreira",
        tipo: "Sistema Web",
        complexidade: "Avançada",
        descricao: "Plataforma web para agendamento de serviços, com múltiplos usuários e gestão de disponibilidade."
    },
    {
        titulo: "Aplicativo de Monitoramento de Exercícios",
        empreendedor: "Fernanda Gomes",
        tipo: "Aplicativo Mobile",
        complexidade: "Intermediária",
        descricao: "App para rastrear atividades físicas, com mapas e histórico de desempenho."
    },
];

// Componente CardDemanda simplificado para a Home (substituindo o placeholder)
const CardDemandaHome: React.FC<Demanda> = ({ titulo, empreendedor, tipo, complexidade, descricao }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold  mb-2">{titulo}</h3>
            <h5 className="text-sm font-medium text-[#792E29] mb-3">Complexidade: {complexidade}</h5>

            <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center text-gray-700">
                    <img src={Person} alt="Empreendedor" className="w-4 h-4 mr-1" />
                    <span className="text-sm">{empreendedor}</span>
                </div>
                <div className="flex items-center text-gray-700">
                    <img src={Tag} alt="Tipo de Projeto" className="w-4 h-4 mr-1" />
                    <span className="text-sm">{tipo}</span>
                </div>
            </div>

            <p className="text-gray-500 text-sm mb-4 line-clamp-3">{descricao}</p>

            <div className="flex space-x-2">
                <button className="flex items-center space-x-1 bg-[#792E29] text-white py-2 px-3 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-[#6d2823]">
                    <span>Manifestar Interesse</span>
                </button>
                <button className="flex items-center space-x-1 bg-white text-[#021926] py-2 px-3 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-[#9098a3] border border-gray-300">
                    <img src={ExclamationCircle} alt="Ver Detalhes" className="w-3 h-3" />
                    <span>Ver Detalhes</span>
                </button>
            </div>
        </div>
    );
};


function Home() {
    const [filtros, setFiltros] = useState<Filtros>({
        tipos: [],
        area: 'Todas as áreas',
        complexidade: 'Todas',
    });

    const handleFiltroChange = (novosFiltros: Filtros) => {
        setFiltros(novosFiltros);
    };

    const demandasFiltradas = useMemo(() => {
        return ALL_DEMANDAS.filter(demanda => {
            // Filtro por Tipo de Projeto (checkboxes)
            const tipoMatch = filtros.tipos.length === 0 || filtros.tipos.includes(demanda.tipo);

            // Filtro por Complexidade (radio)
            const complexidadeMatch = filtros.complexidade === 'Todas' || demanda.complexidade === filtros.complexidade;

            // Filtro por Área de Negócio (select) - Não implementado nos dados de exemplo
            // const areaMatch = filtros.area === 'Todas as áreas' || demanda.area === filtros.area;

            return tipoMatch && complexidadeMatch; // && areaMatch;
        });
    }, [filtros]);

  return (
    <>
      <main className="bg-[#F1F7EE]">
      <main className="w-full min-h-screen bg-[#F1F7EE]">
        <section className="bg-[#021926] p-10">
            <h1 className="text-5xl justify-center font-semibold text-[#DAD4C8] w-[70%] mx-auto text-center">Conectamos <span className="text-[#A33E38]">Empreendedores</span> com <span className="text-[#A33E38]">Estudantes de Tecnologia</span></h1>
            <p className="text-[#DAD4C8] text-center py-5 text-2xl w-[80%] mx-auto">Plataforma que une demandas reais de negócios com projetos acadêmicos da Fatec Zona Leste, criando oportunidades de aprendizado prático e soluções inovadoras.</p>

            <div className="flex gap-5 justify-center">
                <button className="text-white text-2x1 flex gap-1 bg-[#5F747F] rounded-2xl p-3 items-center cursor-pointer transition-opacity duration-300 hover:opacity-70">
                    <img className="size-6" src={foguete}/>
                    <p>Cadastrar Projeto</p>
                </button>

                <button className="bg-[#F1F7EE] text-2x1 flex gap-1 rounded-2xl p-3 items-center cursor-pointer transition-opacity duration-300 hover:opacity-70">
                    <img className="size-4" src={pessoas}/>
                    <p className="text-[#021926]">Formar Equipe </p>
                </button>
            </div>
        </section>

        <section className="bg=[#F1F7EE] py-10">
            <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Coluna de Filtros */}
                <div className="lg:col-span-1">
                    <FiltroDemandas onFiltroChange={handleFiltroChange} currentFiltros={filtros} />
                </div>

                {/* Coluna de Cards */}
                <div className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Projetos Disponíveis ({demandasFiltradas.length})</h2>
                        <select className="p-2 border border-gray-300 rounded-md focus:outline-none bg-white">
                            <option>Mais recentes</option>
                            {/* Adicione outras opções de ordenação aqui */}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {demandasFiltradas.map((demanda, index) => (
                            <CardDemandaHome key={index} {...demanda} />
                        ))}
                    </div>
                    {demandasFiltradas.length === 0 && (
                        <p className="text-center text-gray-500 text-lg mt-10">Nenhum projeto encontrado com os filtros selecionados.</p>
                    )}
                </div>
            </div>
        </section>

        <section className="text-center py-5">
            <h2 className="text-3xl font-semibold">Como Funciona</h2>
            <p className="text-2xl w-[50%] mx-auto">Um processo simples e eficiente para conectar demandas reais com estudantes talentosos</p>

            <div className="mx-[10%] my-10">

                <div className="flex gap-15 justify-center">
                    <div className="justify-center w-[25%] p-2 hover:scale-110">
                        <img className="size-25 mx-auto" src={EllipseCadastro} />
                        <h3 className="font-semibold text-lg">1. Cadastro</h3>
                        <p>Empreendedores se cadastram e descrevem suas demandas com detalhes do projeto</p>
                    </div>

                    <div className="justify-center w-[25%] hover:scale-110">
                        <img className="size-25 mx-auto" src={EllipseDescoberta} />
                        <h3 className="font-semibold text-lg">2. Descoberta</h3>
                        <p>Estudantes exploram projetos usando filtros para encontrar oportunidades ideais</p>
                    </div>

                    <div className="justify-center w-[25%] hover:scale-110">
                        <img className="size-25 mx-auto" src={EllipseConexao} />
                        <h3 className="font-semibold text-lg">3. Conexão</h3>
                        <p>Grupos de alunos manifestam interesse e iniciam diálogo com empreendedores</p>
                    </div>

                    <div className="justify-center w-[25%] hover:scale-110">
                        <img className="size-25 mx-auto" src={EllipseExecucao} />
                        <h3 className="font-semibold text-lg">4. Execução</h3>
                        <p>Desenvolvimento colaborativo do projeto</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="text-center py-5">
            <h2 className="text-3xl font-semibold">Faça Parte da Plataforma</h2>
            <p className="text-2xl w-[50%] mx-auto mb-2">Escolha como deseja participar do Osiris</p>

            <div className="">
                <CarrosselHome />
            </div>

        </section>
      </main>
    </>
  )
}

export default Home
