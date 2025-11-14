import React from 'react'
import foguete from "../../assets/img/icones/foguete.svg"
import pessoas from "../../assets/img/icones/pessoas.svg"
import Filtro from "../../assets/img/icones/filtro.svg";
import Rectangle from "../../assets/img/icones/Rectangle.svg";
import Ellipse from "../../assets/img/icones/Ellipse.svg";
import Lupa from "../../assets/img/icones/lupa.svg";
import Person from "../../assets/img/icones/Person.svg";
import Tag from "../../assets/img/icones/Tag.svg";
import Pessoas from "../../assets/img/icones/pessoas.svg";
import ExclamationCircle from "../../assets/img/icones/ExclamationCircle.svg";
import EllipseCadastro from "../../assets/img/icones/Ellipse cadastro.svg";
import EllipseDescoberta from "../../assets/img/icones/Ellipse descoberta.svg";
import EllipseConexao from "../../assets/img/icones/Ellipse conexao.svg";
import EllipseLight from "../../assets/img/icones/Ellipse light.svg";
import Lightbulb from "../../assets/img/icones/Lightbulb.svg";
import EllipseMortar from "../../assets/img/icones/Ellipse  mortar.svg";
import MortarboardFill from "../../assets/img/icones/MortarboardFill.svg";
import EllipseBook from "../../assets/img/icones/Ellipse book.svg";


function Home() {
  return (
    <>
      <main>
        <section className="bg-[#021926] p-10">
            <h1 className="text-5xl justify-center font-semibold text-[#DAD4C8] mx-55 text-center">Conectamos <span className="text-[#A33E38]">Empreendedores</span> com <span className="text-[#A33E38]">Estudantes de Tecnologia</span></h1>
            <p className="text-[#DAD4C8] text-center py-5 text-2xl mx-30">Plataforma que une demandas reais de negócios com projetos acadêmicos da Fatec Zona Leste, criando oportunidades de aprendizado prático e soluções inovadoras.</p>

            <div className="flex gap-5 justify-center">
                <button className="text-white text-2x1 flex gap-1 bg-[#5F747F] rounded-2xl p-3 items-center">
                    <img className="size-6" src={foguete}/> 
                    <p>Cadastrar Projeto</p>
                </button>

                <button className="bg-[#F1F7EE] text-2x1 flex gap-1 rounded-2xl p-3 items-center">
                    <img className="size-4" src={pessoas}/> 
                    <p className="text-[#021926]">Formar Equipe</p>
                </button>
            </div>
        </section>

        <section className="bg=[#F1F7EE]">
            <div>
                <div>
                <img src={Filtro}/>
                <h3>Filtros</h3>
                </div>
                <h4>Tipo de Projeto</h4>
                <div>
                    <img src={Rectangle} />
                    <p>Sistema Web</p>
                </div>
                <div>
                    <img src={Rectangle} />
                    <p>Aplicativo Mobile</p>
                </div>
                <div>
                    <img src={Rectangle} />
                    <p>Landing Page</p>
                </div>
                <div>
                    <img src={Rectangle} />
                    <p>E-commerce</p>
                </div>
                <h4>Área de Negócios</h4>
                <div>
                    {/* <!-- dropdown -->
                    <!-- <img src="./assets/img/icones/setadown.svg" /> -->
                    <!-- <p>Todas as áreas</p> --> */}
                </div>
                <h4>Complexidade</h4>
                <div>
                    <img src={Ellipse} />
                    <p>Todas</p>
                </div>
                <div>
                    <img src={Ellipse} />
                    <p>Básica</p>
                </div>
                <div>
                    <img src={Ellipse} />
                    <p>Intermediária</p>
                </div>
                <div>
                    <img src={Ellipse} />
                    <p>Avançada</p>
                </div>
                <button>
                    <img src={Lupa}/>
                    <p>Aplicar Filtros</p>
                </button>
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

        <section>
            <h2>Como Funciona</h2>
            <p>Um processo simples e eficiente para conectar demandas reais com estudantes talentosos</p>

            <div>
                <div>
                    <img src={EllipseCadastro} />
                    <h3>1. Cadastro</h3>
                    <p>Empreendedores se cadastram e descrevem suas demandas com detalhes do projeto</p>
                </div>

                <div>
                    <img src={EllipseDescoberta} />
                    <h3>2. Descoberta</h3>
                    <p>Estudantes exploram projetos usando filtros para encontrar oportunidades ideais</p>
                </div>

                <div>
                    <img src={EllipseConexao} />
                    <h3>3. Conexão</h3>
                    <p>Grupos de alunos manifestam interesse e iniciam diálogo com empreendedores</p>
                </div>

                <div>
                    <img src={EllipseCadastro} />
                    <h3>4. Execução</h3>
                    <p>Desenvolvimento colaborativo do projeto</p>
                </div>
            </div>
        </section>

        <section>
            <h2>Faça Parte da Plataforma</h2>
            <p>Escolha como deseja participar do Osiris</p>

            {/* <!-- CARROSSEL DE CARDS DE Cadastro --> */}
            <div>
                <div>
                    <img src={EllipseLight} />
                    <img src={Lightbulb} />
                    <h3>Sou Empreendedor</h3>
                    <h5>Tenho uma demanda e preciso de uma solução digital</h5>

                    <ul>
                        <li>Publique seus projetos na plataforma</li>
                        <li>Receba propostas de grupos qualificados</li>
                        <li>Acompanhe o desenvolvimento do projeto</li>
                        <li>Acesso a estudantes especializados</li>
                    </ul>

                    <button>Cadastrar como Empreendedor</button>
                </div>
                <div>
                    <img src={EllipseMortar} />
                    <img src={MortarboardFill} />
                    <h3>Sou Estudante</h3>
                    <h5>Quero participar de projetos reais e ganhar experiência</h5>

                    <ul>
                        <li>Trabalhe em projetos reais do mercado</li>
                        <li>Ganhe experiência prática</li>
                        <li>Forme uma rede de contatos</li>
                        <li>Desenvolva seu portfólio</li>
                    </ul>

                    <button>Cadastrar como Estudante</button>
                </div>
                <div>
                    <img src={EllipseBook} />
                    <img src={EllipseBook} />
                    <h3>Sou Coordenador</h3>
                    <h5>Sou coordenador e preciso verificar a demanda</h5>

                    <ul>
                        <li>Verifique as demandas</li>
                        <li>Classifique as propostas</li>
                        <li>Acompanhe o desenvolvimento do projeto</li>
                        <li>Dê orientações gerais</li>
                    </ul>

                    <button>Cadastrar como Coodenador</button>
                </div>
                <div>
                    <img src={EllipseLight} />
                    <img src={Lightbulb} />
                    <h3>Sou Professor</h3>
                    <h5>Preciso acompanhar projetos e orientar alunos</h5>

                    <ul>
                        <li>Verifique os grupos</li>
                        <li>Dê orientações</li>
                        <li>Acompanhe o desenvolvimento dos projetos</li>
                        <li>Verrique o andamento das atividades</li>
                    </ul>

                    <button>Cadastrar como Professor</button>
                </div>
            </div>
        </section>
      </main>
    </>
  )
}

export default Home