

export interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  lider: string;
  tamanho: number;
  membros?: string;
  semestre?: string;
}

const GrupoCard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-md flex flex-col transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center space-x-2 mb-3">
                <img src={pessoas} alt="Ícone de Pessoas"/>
                <h3 className="text-xl font-semibold text-gray-800">Os Fulaninhos</h3>
            </div>

            <p className="text-sm text-gray-600 mb-4 flex-grow">
                Especialistas em desenvolvimento de aplicações web modernas, utilizando tecnologias como React, Node.js e bancos de dados.
            </p>

            <div className="flex items-center space-x-1 mb-5">
                <img src={Person} alt="Ícone de Pessoa" />
                <h5 className="text-xs font-normal text-gray-600"> 3 Membros - 3º Semestre </h5>
            </div>

            <div className="flex flex-col space-y-2 mt-auto">
                <button className="bg-[#5F747F] text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[#53656e]"
                onClick={() => navigate("/perfil_grupo")}
                >
                Ver Detalhes</button>
                <button className="bg-[#782E29] text-white py-2 px-4 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[#6d2823]">Solicitar Entrada</button>
            </div>
        </div>
    );
};