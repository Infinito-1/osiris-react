import foguete from "../../assets/img/icones/foguete.svg"
import pessoas from "../../assets/img/icones/pessoas.svg"
import Person from "../../assets/img/icones/Person.svg";
import Tag from "../../assets/img/icones/Tag.svg";
import Pessoas from "../../assets/img/icones/pessoas.svg";
import ExclamationCircle from "../../assets/img/icones/ExclamationCircle.svg";
import EllipseCadastro from "../../assets/img/icones/Ellipse cadastro.svg";
import EllipseDescoberta from "../../assets/img/icones/Ellipse descoberta.svg";
import EllipseExecucao from "../../assets/img/icones/Ellipse execucao.svg"
import EllipseConexao from "../../assets/img/icones/Ellipse conexao.svg";
import CarrosselHome from "../../components/carrosselHome/CarrosselHome";
import FiltroDemandas from "../../components/filtro/filtroDemandas";

function Home() {
  return (
    <>
      <main className="bg-[#F1F7EE]">
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

        <section>
            <div>
                <FiltroDemandas />
            </div>
            

            <div>
                <div>
                  <h2>Projetos Disponíveis</h2>
                  {/* <!-- dropdown
                  <img src="./assets/img/icones/setadown.svg"/>
                  <p>Mais recentes</p> -->

                  <!-- CARROSSEL DE DEMANDAS --> */}
                <div>
                    {/* <!-- MODELO DE CARD QUE RECEBERÁ OS DADOS --> */}
                    <div>
                      <h3>Título demanda</h3>
                      <h5>Nível dificuldade</h5>
                    </div>

                    <div>
                        <div>
                          <img src={Person}/>
                          <h5>Nome da empresa</h5>
                        </div>

                        <div>
                          <img src={Tag}/>
                          <h5>Tipo de Projeto</h5>
                        </div>

                        <p>DESCRIÇÃO DA DEMANDA. EX: "Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados."</p>

                        <button>
                            <img src={Pessoas}/>
                            <p>Manifestar Interesse</p>
                        </button>

                        <button>
                            <img src={ExclamationCircle}/>
                            <p>Ver Detalhes</p>
                        </button>
                    </div>
                  </div>
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