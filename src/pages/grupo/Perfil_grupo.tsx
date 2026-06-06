import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Person from "../../assets/img/icones/Person.svg";
import calendario from "../../assets/img/icones/calendario.svg";
import pin from "../../assets/img/icones/pin.svg";
import { getGrupoById } from "../../services/grupos.service";
import { getProjetos } from "../../services/projeto.service";
import { useAuth } from "../../hooks/useAuth";

interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  lider: string;
  ra: string;
  tamanho: number;
  membros: string;
  semestre: string | null;
  email?: string;
  usuario?: { id: number; nome: string; email: string } | null;
}

interface Historico {
  id: number;
  descricao: string;
  status: string;
  data: string;
  link: string | null;
  linkGithub: string | null;
  linkDeploy: string | null;
}

interface Projeto {
  id: number;
  descricao: string;
  dataInicio: string;
  ativo: boolean;
  desativadoCoordenador: boolean;
  historicos: Historico[];
  candidatura: {
    demanda: { nome: string } | null;
  } | null;
}

function getLinksUnicos(h: Historico | null) {
  if (!h) return [];
  const mapa = new Map<string, string>();
  if (h.linkGithub) mapa.set(h.linkGithub, "GitHub");
  if (h.linkDeploy && !mapa.has(h.linkDeploy)) mapa.set(h.linkDeploy, "Deploy");
  if (h.link && !mapa.has(h.link)) mapa.set(h.link, "Conheça");
  return Array.from(mapa.entries()).map(([url, label]) => ({ url, label }));
}

const SobreGrupo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, usuario } = useAuth();

  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const ehDono =
    isAuthenticated &&
    usuario?.tipo === "Grupo" &&
    grupo?.usuario?.email === usuario?.email;

  function handleCopiar() {
    if (!grupo?.email) return;
    navigator.clipboard.writeText(grupo.email).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  }

  useEffect(() => {
    async function carregar() {
      try {
        const grupoData = await getGrupoById(Number(id));
        setGrupo(grupoData);

        const todos = await getProjetos();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const doGrupo = todos.filter((p: any) => {
          const grupoIdViaCandidatura = p.candidatura?.grupo?.id;
          const grupoIdDireto = p.grupo?.id; // caso projeto sem candidatura
          return (
            (grupoIdViaCandidatura === Number(id) ||
              grupoIdDireto === Number(id)) &&
            p.ativo
          );
        });
        setProjetos(doGrupo);
      } catch {
        setErro("Não foi possível carregar os dados do grupo.");
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id, isAuthenticated]);

  if (loading)
    return <p className="text-center py-20 text-gray-500">Carregando...</p>;
  if (erro) return <p className="text-center py-20 text-red-600">{erro}</p>;
  if (!grupo) return null;

  const membrosLista = grupo.membros
    ? grupo.membros.split("\n").filter(Boolean)
    : [];

  // projetos: ativo primeiro, depois histórico
  const projetosAtivos = projetos.filter((p) => p.ativo);
  const projetosPassados = projetos.filter(
    (p) => !p.ativo && !p.desativadoCoordenador,
  );

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <div className="w-11/12 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          {grupo.nome}
        </h1>

        <div className="flex justify-center items-center space-x-4 text-gray-600 mb-8">
          <div className="flex items-center space-x-1">
            <img
              src={Person}
              alt="Membros"
              className="w-4 h-4 filter brightness-50"
            />
            <h5 className="text-sm">{grupo.tamanho} Membros</h5>
          </div>
          {grupo.semestre && (
            <div className="flex items-center space-x-1">
              <img
                src={calendario}
                alt="Semestre"
                className="w-4 h-4 filter brightness-50"
              />
              <h5 className="text-sm">{grupo.semestre}º semestre</h5>
            </div>
          )}
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2 bg-white border border-gray-300 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-800">
                Sobre o Grupo
              </h3>
              {ehDono && (
                <button
                  onClick={() => navigate("/cadastro/estudante?editar=true")}
                  className="text-sm px-4 py-1.5 border border-[#546873] text-[#546873] rounded-md hover:bg-[#546873] hover:text-white transition cursor-pointer"
                >
                  Editar grupo
                </button>
              )}
            </div>
            <p className="text-base text-gray-600 mb-6">{grupo.descricao}</p>

            {membrosLista.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Integrantes
                </h3>
                <ul className="list-disc list-inside text-base text-gray-600 mb-6 ml-4">
                  {membrosLista.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Informações do Grupo
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <p className="font-medium text-gray-800">Representante:</p>
                <p className="text-gray-600">{grupo.lider ?? "—"}</p>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <p className="font-medium text-gray-800">RA:</p>
                <p className="text-gray-600">{grupo.ra}</p>
              </div>
              {grupo.semestre && (
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-800">Semestre:</p>
                  <p className="text-gray-600">{grupo.semestre}º</p>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-3 mt-8">
              {!ehDono && (
                <button
                  className="bg-[#782E29] text-white py-2 px-4 rounded-md text-base font-medium transition hover:bg-[#6d2823] cursor-pointer active:scale-95"
                  onClick={() => setModalAberto(true)}
                >
                  Entrar em Contato
                </button>
              )}
            </div>
          </div>

          {/* Portfólio / Projetos */}
          <div className="lg:col-span-1 bg-white border border-gray-300 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <img
                  src={pin}
                  alt="Portfólio"
                  className="w-5 h-5 filter brightness-50"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  Portfólio
                </h3>
              </div>
              {ehDono && (
                <button
                  onClick={() => navigate("/entrega")}
                  className="text-xs px-3 py-1 bg-[#546873] text-white rounded-md hover:bg-[#495a63] transition cursor-pointer"
                >
                  + Novo Projeto
                </button>
              )}
            </div>

            {projetos.length === 0 ? (
              <p className="text-sm text-gray-500">
                Nenhum projeto no portfólio ainda.
              </p>
            ) : (
              <>
                {/* projeto atual primeiro */}
                {projetosAtivos.map((p) => {
                  const ultimoH = p.historicos[p.historicos.length - 1] ?? null;
                  const links = getLinksUnicos(ultimoH);
                  return (
                    <div
                      key={p.id}
                      className="mb-6 border-gray-200 border shadow-sm p-4"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-base font-semibold text-gray-800">
                          {p.candidatura?.demanda?.nome ?? p.descricao}
                        </h4>
                        {ehDono && (
                          <button
                            onClick={() => navigate(`/projeto/${p.id}`)}
                            className="text-xs px-2 py-1 border border-[#546873] text-[#546873] rounded hover:bg-[#546873] hover:text-white transition cursor-pointer ml-2 shrink-0"
                          >
                            Editar
                          </button>
                        )}
                      </div>

                      <div className="flex justify-between">
                        {links.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {links.map(({ url, label }) => (
                              <a
                                key={url}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-[#5F747F] text-white rounded-md text-sm font-medium shadow-sm hover:bg-[#53656e] transition cursor-pointer"
                              >
                                {label}
                              </a>
                            ))}
                          </div>
                        )}
                        <span className="text-[10px] bg-[#c6d8e2] text-[#5F747F] px-2 py-1 rounded-full font-medium mt-2">
                          Status: {ultimoH?.status ?? "Em andamento"}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* projetos passados */}
                {projetosPassados.length > 0 && (
                  <>
                    <hr className="my-4 border-gray-200" />
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-3">
                      Anteriores
                    </p>
                    {projetosPassados.map((p) => {
                      const ultimoH =
                        p.historicos[p.historicos.length - 1] ?? null;
                      const links = getLinksUnicos(ultimoH);
                      return (
                        <div key={p.id} className="mb-5 opacity-80">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-semibold text-gray-700">
                              {p.candidatura?.demanda?.nome ?? p.descricao}
                            </h4>
                            {ehDono && (
                              <button
                                onClick={() => navigate(`/projeto/${p.id}`)}
                                className="text-xs px-2 py-1 border border-gray-400 text-gray-600 rounded hover:bg-gray-100 transition cursor-pointer ml-2 shrink-0"
                              >
                                Editar
                              </button>
                            )}
                          </div>
                          {links.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-1">
                              {links.map(({ url, label }) => (
                                <a
                                  key={url}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 bg-gray-400 text-white rounded-md text-xs font-medium hover:bg-gray-500 transition cursor-pointer"
                                >
                                  {label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      {/* Modal contato */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Entrar em Contato
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Entre em contato com o grupo <strong>{grupo.nome}</strong> pelo
              e-mail abaixo:
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                readOnly
                value={grupo.email ?? "E-mail não disponível"}
                className="flex-1 p-2.5 border border-gray-300 rounded-md bg-gray-50 text-gray-800 text-sm focus:outline-none cursor-text"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={handleCopiar}
                disabled={!grupo.email}
                className="px-4 py-2 bg-[#782E29] text-white rounded-md text-sm font-medium hover:bg-[#6d2823] transition cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copiado ? "Copiado!" : "Copiar"}
              </button>
            </div>
            <button
              onClick={() => {
                setModalAberto(false);
                setCopiado(false);
              }}
              className="w-full bg-[#5F747F] text-white py-2.5 rounded-md font-medium hover:bg-[#53656e] transition cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SobreGrupo;
