/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  criarNovoGrupo,
  getGrupoDashboard,
  getMeusGrupos,
  reativarGrupo,
} from "../../services/grupos.service";
import { toggleProjeto } from "../../services/projeto.service";
import { desistirCandidatura } from "../../services/candidatura.service";
import { api } from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

// ── Tipos ─────────────────────────────────────────────────────────────────────

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
  motivoDesativacao: string | null;
  historicos: Historico[];
  candidatura: {
    id: number;
    status: string;
    grupo: { nome: string; lider: string } | null;
    demanda: { id: number; nome: string; descricao: string } | null;
  } | null;
}

interface Candidatura {
  id: number;
  demanda: string;
  status: string;
  aprovacao: boolean;
}

interface Metricas {
  totalCandidaturasEnviadas: number;
  candidaturasAceitas: number;
}

interface DashboardDados {
  grupo: string;
  lider: string;
  ra: string;
  semestre: string | null;
  membros: string | null;
  tamanho: number;
  metricas: Metricas;
  candidaturas: Candidatura[];
}

interface GrupoResumido {
  id: number;
  nome: string;
  semestre: string | null;
  ativo: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getLinksUnicos(h: Historico | null) {
  if (!h) return [];
  const mapa = new Map<string, string>();
  if (h.linkGithub) mapa.set(h.linkGithub, "GitHub");
  if (h.linkDeploy && !mapa.has(h.linkDeploy)) mapa.set(h.linkDeploy, "Deploy");
  if (h.link && !mapa.has(h.link)) mapa.set(h.link, "Conheça");
  return Array.from(mapa.entries()).map(([url, label]) => ({ url, label }));
}

const statusCor = (status: string) => {
  switch (status) {
    case "Aceita":
      return "bg-green-100 text-green-800";
    case "Recusada":
      return "bg-red-100 text-red-800";
    case "Pendente":
      return "bg-yellow-100 text-yellow-800";
    case "Desistente":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// ── Subcomponentes ────────────────────────────────────────────────────────────

const InformacoesGrupo: React.FC<{
  dados: DashboardDados;
  meusGrupos: GrupoResumido[];
  onNovoGrupo: () => void;
  onReativarGrupo: (id: number) => void;
}> = ({ dados, meusGrupos, onNovoGrupo, onReativarGrupo }) => {
  const navigate = useNavigate();
  const membrosLista = dados.membros
    ? dados.membros.split("\n").filter(Boolean)
    : [];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Informações do Grupo
        </h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Nome do Grupo</span>
            <br />
            {dados.grupo}
          </p>
          <p>
            <span className="font-medium">Representante</span>
            <br />
            {dados.lider}
          </p>
          <p>
            <span className="font-medium">RA</span>
            <br />
            {dados.ra}
          </p>
          {dados.semestre && (
            <p>
              <span className="font-medium">Semestre</span>
              <br />
              {dados.semestre}
            </p>
          )}
          {membrosLista.length > 0 && (
            <>
              <p className="font-medium pt-2">Membros</p>
              <ul className="list-disc list-inside ml-4 text-gray-600">
                {membrosLista.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => navigate("/cadastro/estudante?editar=true")}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-[#782E29] hover:text-white transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span>Editar Grupo</span>
          </button>
          <button
            onClick={onNovoGrupo}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 mt-2 bg-[#782E29] text-white rounded-md hover:bg-[#782e29d8] transition cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Novo Grupo</span>
          </button>
        </div>
      </div>

      {meusGrupos.length > 1 && (
        <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Meus Grupos
          </h3>
          <div className="space-y-2">
            {meusGrupos.map((g) => (
              <div
                key={g.id}
                className={`flex items-center justify-between p-2 rounded-md text-sm ${g.ativo ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"}`}
              >
                <div>
                  <p className="font-medium text-gray-800">{g.nome}</p>
                  {g.semestre && (
                    <p className="text-xs text-gray-500">{g.semestre}</p>
                  )}
                </div>
                <div>
                  {!g.ativo && (
                  <button
                    onClick={() => onReativarGrupo(g.id)}
                    className="text-xs px-2 py-1 border border-[#40531D] text-[#40531D] rounded-md hover:bg-green-50 transition cursor-pointer"
                  >
                    Reativar
                  </button>
                )}
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${g.ativo ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}
                  >
                    {g.ativo ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CardProjeto: React.FC<{
  projeto: Projeto;
  onToggle: (id: number) => void;
}> = ({ projeto, onToggle }) => {
  const navigate = useNavigate();
  const ultimoHistorico =
    projeto.historicos[projeto.historicos.length - 1] ?? null;
  const links = getLinksUnicos(ultimoHistorico);

  return (
    <div
      className={`bg-white border rounded-lg p-6 shadow-md ${!projeto.ativo ? "border-gray-200 opacity-80" : "border-gray-300"}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {projeto.candidatura?.demanda?.nome ?? projeto.descricao}
        </h3>
        <span
          className={`text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide ${
            !projeto.ativo
              ? projeto.desativadoCoordenador
                ? "bg-red-100 text-red-700"
                : "bg-gray-200 text-gray-600"
              : "bg-[#c6d8e2] text-[#5F747F]"
          }`}
        >
          {!projeto.ativo
            ? projeto.desativadoCoordenador
              ? "Desativado pelo Coord."
              : "Desativado"
            : (ultimoHistorico?.status ?? "Em andamento")}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3">{projeto.descricao}</p>

      {projeto.motivoDesativacao && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3 text-sm text-red-700">
          <strong>Motivo:</strong> {projeto.motivoDesativacao}
        </div>
      )}

      <p className="text-xs text-gray-500 mb-4">
        Início: {new Date(projeto.dataInicio).toLocaleDateString("pt-BR")}
      </p>

      {links.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {links.map(({ url, label }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#5F747F] text-white rounded-md text-xs font-medium hover:bg-[#53656e] transition cursor-pointer"
            >
              {label}
            </a>
          ))}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => navigate(`/projeto/${projeto.id}`)}
          className="px-4 py-1.5 bg-[#5F747F] text-white rounded-md text-sm font-medium hover:bg-[#53656e] transition cursor-pointer"
        >
          Editar
        </button>
        {projeto.candidatura?.demanda?.id && (
          <button
            onClick={() =>
              navigate(`/demandas/${projeto.candidatura!.demanda!.id}`)
            }
            className="px-4 py-1.5 border border-[#5F747F] text-[#5F747F] rounded-md text-sm font-medium hover:bg-[#5F747F] hover:text-white transition cursor-pointer"
          >
            Ver Demanda
          </button>
        )}
        {!projeto.desativadoCoordenador && (
          <button
            onClick={() => onToggle(projeto.id)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition cursor-pointer border ${
              projeto.ativo
                ? "border-gray-400 text-gray-700 hover:bg-gray-100"
                : "border-[#40531D] text-[#40531D] hover:bg-green-50"
            }`}
          >
            {projeto.ativo ? "Desativar" : "Reativar"}
          </button>
        )}
        {projeto.desativadoCoordenador && !projeto.ativo && (
          <button
            onClick={() => navigate(`/projeto/${projeto.id}`)}
            className="px-4 py-1.5 border border-[#782E29] text-[#782E29] rounded-md text-sm font-medium hover:bg-red-50 transition cursor-pointer"
          >
            Solicitar Revisão
          </button>
        )}
      </div>
    </div>
  );
};

const CandidaturasGrupo: React.FC<{
  candidaturas: Candidatura[];
  projetos: Projeto[];
  onDesistir: (id: number) => void;
}> = ({ candidaturas, projetos, onDesistir }) => {
  const navigate = useNavigate();
  const candidaturasComProjetoAtivo = new Set(
    projetos
      .filter((p) => p.ativo && p.candidatura?.id)
      .map((p) => p.candidatura!.id),
  );
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 4;
  const totalPaginas = Math.max(
    1,
    Math.ceil(candidaturas.length / itensPorPagina),
  );
  const slice = candidaturas.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina,
  );

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">Candidaturas</h3>
      <p className="text-sm text-gray-600 mb-4">
        Projetos para os quais seu grupo se candidatou
      </p>
      {candidaturas.length === 0 ? (
        <p className="text-sm text-gray-500">
          Nenhuma candidatura enviada ainda.
        </p>
      ) : (
        <div className="space-y-3">
          {slice.map((c) => {
            const temProjetoAtivo = candidaturasComProjetoAtivo.has(c.id);
            const podeSubmeter =
              !temProjetoAtivo &&
              (c.status === "Pendente" || c.status === "Recusada");
            const podeDesistir =
              c.status === "Pendente" || c.status === "Aceita";

            return (
              <div key={c.id} className="border border-gray-200 rounded-md p-3">
                <p className="font-medium text-gray-800 mb-2 text-sm">
                  {c.demanda}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusCor(c.status)}`}
                  >
                    {c.status}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {podeSubmeter && (
                      <button
                        onClick={() => navigate(`/entrega?canIntId=${c.id}`)}
                        className="text-xs px-3 py-1 bg-[#782E29] text-white rounded-md hover:bg-[#6d2823] transition cursor-pointer"
                      >
                        Submeter Projeto
                      </button>
                    )}
                    {temProjetoAtivo && (
                      <span className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-md">
                        Projeto enviado
                      </span>
                    )}
                    {podeDesistir && (
                      <button
                        onClick={() => onDesistir(c.id)}
                        className="text-xs px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition cursor-pointer"
                      >
                        Desistir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {candidaturas.length > itensPorPagina && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={() => setPagina((p) => p - 1)}
            disabled={pagina === 1}
            className={`text-gray-500 ${pagina === 1 ? "opacity-50 cursor-not-allowed" : "hover:text-gray-800 cursor-pointer"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="font-medium select-none">
            {pagina}{" "}
            <span className="text-gray-400 text-sm">/ {totalPaginas}</span>
          </span>
          <button
            onClick={() => setPagina((p) => p + 1)}
            disabled={pagina === totalPaginas}
            className={`text-gray-500 ${pagina === totalPaginas ? "opacity-50 cursor-not-allowed" : "hover:text-gray-800 cursor-pointer"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

const MetricasGrupo: React.FC<{ metricas: Metricas }> = ({ metricas }) => (
  <div className="grid grid-cols-2 gap-4 mb-8">
    <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-md text-center">
      <p className="text-3xl font-bold text-[#5F747F]">
        {metricas.totalCandidaturasEnviadas}
      </p>
      <p className="text-sm text-gray-600 mt-1">Candidaturas Enviadas</p>
    </div>
    <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-md text-center">
      <p className="text-3xl font-bold text-[#782E29]">
        {metricas.candidaturasAceitas}
      </p>
      <p className="text-sm text-gray-600 mt-1">Projetos Aprovados</p>
    </div>
  </div>
);

const ModalNovoGrupo: React.FC<{
  onConfirmar: (dto: any) => Promise<void>;
  onCancelar: () => void;
  enviando: boolean;
}> = ({ onConfirmar, onCancelar, enviando }) => {
  const [etapa, setEtapa] = useState<"confirmar" | "form">("confirmar");
  const [semestres, setSemestres] = useState<
    { semIntId: number; semStrDescricao: string }[]
  >([]);
  const [form, setForm] = useState({
    gruStrNome: "",
    gruStrDescricao: "",
    gruIntTamanho: 1,
    gruStrMembros: "",
    semIntId: 0,
  });

  useEffect(() => {
    if (etapa === "form") {
      api.get("/semestres").then((r) => setSemestres(r.data));
    }
  }, [etapa]);

  if (etapa === "confirmar")
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Criar Novo Grupo
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Ao criar um novo grupo, o grupo atual será{" "}
            <strong>desativado</strong>. Todas as candidaturas e projetos
            futuros serão vinculados ao novo grupo. Deseja continuar?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setEtapa("form")}
              className="flex-1 bg-[#782E29] text-white py-3 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer"
            >
              Continuar
            </button>
            <button
              onClick={onCancelar}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 overflow-y-auto py-8">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Dados do Novo Grupo
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Grupo
            </label>
            <input
              type="text"
              placeholder="Nome público do grupo"
              value={form.gruStrNome}
              onChange={(e) =>
                setForm((f) => ({ ...f, gruStrNome: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              placeholder="Descreva o grupo e seus objetivos"
              value={form.gruStrDescricao}
              rows={3}
              onChange={(e) =>
                setForm((f) => ({ ...f, gruStrDescricao: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tamanho
              </label>
              <input
                type="number"
                min={1}
                value={form.gruIntTamanho}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    gruIntTamanho: Number(e.target.value),
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semestre
              </label>
              <select
                value={form.semIntId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, semIntId: Number(e.target.value) }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm bg-white"
              >
                <option value={0}>Selecione</option>
                {semestres.map((s) => (
                  <option key={s.semIntId} value={s.semIntId}>
                    {s.semStrDescricao}º semestre
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Membros{" "}
              <span className="text-gray-400 font-normal">
                (um por linha, opcional)
              </span>
            </label>
            <textarea
              placeholder="Lista de membros"
              value={form.gruStrMembros}
              rows={3}
              onChange={(e) =>
                setForm((f) => ({ ...f, gruStrMembros: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] text-sm resize-none"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onConfirmar(form)}
            disabled={
              enviando ||
              !form.gruStrNome ||
              !form.gruStrDescricao ||
              !form.semIntId
            }
            className="flex-1 bg-[#782E29] text-white py-3 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enviando ? "Criando..." : "Criar Grupo"}
          </button>
          <button
            onClick={onCancelar}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Componente principal ──────────────────────────────────────────────────────

const DashboardGrupo: React.FC = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<DashboardDados | null>(null);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [meusGrupos, setMeusGrupos] = useState<GrupoResumido[]>([]);
  const [modalNovoGrupo, setModalNovoGrupo] = useState(false);
  const [modalReativar, setModalReativar] = useState<number | null>(null);
  const [criandoGrupo, setCriandoGrupo] = useState(false);
  const { usuario } = useAuth();

  async function carregar() {
    try {
      const [dash, grupos] = await Promise.all([
        getGrupoDashboard(),
        getMeusGrupos(),
      ]);
      setDashboard(dash);
      setProjetos(dash.projetos ?? []);
      setMeusGrupos(grupos);
    } catch {
      setErro("Não foi possível carregar o dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleToggle(id: number) {
    try {
      const atualizado = await toggleProjeto(id);
      if (!atualizado) return;
      setProjetos((prev) => prev.map((p) => (p.id === id ? atualizado : p)));
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join("\n")
          : (mensagem ?? "Erro ao alterar projeto."),
      );
    }
  }

  async function handleDesistir(canIntId: number) {
    if (!confirm("Tem certeza que deseja desistir desta candidatura?")) return;
    try {
      await desistirCandidatura(canIntId);
      setDashboard((prev) =>
        prev
          ? {
              ...prev,
              candidaturas: prev.candidaturas.map((c) =>
                c.id === canIntId ? { ...c, status: "Desistente" } : c,
              ),
            }
          : prev,
      );
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join("\n")
          : (mensagem ?? "Erro ao desistir."),
      );
    }
  }

  async function handleNovoGrupo(dto: any) {
    setCriandoGrupo(true);
    try {
      await criarNovoGrupo({
        ...dto,
        gruChaRa: dashboard!.ra,
        usuIntId: usuario!.id,
      });
      setModalNovoGrupo(false);
      setLoading(true);
      await carregar();
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join("\n")
          : (mensagem ?? "Erro ao criar grupo."),
      );
    } finally {
      setCriandoGrupo(false);
    }
  }

  async function handleReativarGrupo(gruIntId: number) {
    try {
      await reativarGrupo(gruIntId, usuario!.id);
      setModalReativar(null);
      setLoading(true);
      await carregar();
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(Array.isArray(mensagem) ? mensagem.join('\n') : mensagem ?? 'Erro ao reativar grupo.');
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
        <p className="text-gray-500">Carregando dashboard...</p>
      </div>
    );

  if (erro || !dashboard)
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
        <p className="text-red-600">{erro || "Erro ao carregar dashboard."}</p>
      </div>
    );

  const projetosAtivos = projetos.filter((p) => p.ativo);
  const projetosInativos = projetos.filter((p) => !p.ativo);

  return (
    <div className="flex flex-col items-center w-full bg-[#F1F7EE] py-10 pb-20 font-sans">
      <div className="w-11/12 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          Dashboard do Grupo {dashboard.grupo}
        </h1>
        <p className="text-base text-gray-600 text-center mb-8">
          Gerencie seu grupo e acompanhe o progresso do projeto
        </p>

        <MetricasGrupo metricas={dashboard.metricas} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Projetos ativos */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Projetos Ativos
                </h2>
                <button
                  onClick={() => navigate("/entrega")}
                  className="px-4 py-2 bg-[#782E29] text-white rounded-md text-sm font-medium hover:bg-[#6d2823] transition cursor-pointer"
                >
                  + Novo Projeto
                </button>
              </div>
              {projetosAtivos.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500 shadow-sm">
                  Nenhum projeto ativo. Cadastre um novo projeto.
                </div>
              ) : (
                <div className="space-y-4">
                  {projetosAtivos.map((p) => (
                    <CardProjeto
                      key={p.id}
                      projeto={p}
                      onToggle={handleToggle}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Projetos inativos */}
            {projetosInativos.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Projetos Anteriores
                </h2>
                <div className="space-y-4">
                  {projetosInativos.map((p) => (
                    <CardProjeto
                      key={p.id}
                      projeto={p}
                      onToggle={handleToggle}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Candidaturas */}
            <CandidaturasGrupo
              candidaturas={dashboard.candidaturas}
              projetos={projetos}
              onDesistir={handleDesistir}
            />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <InformacoesGrupo
              dados={dashboard}
              meusGrupos={meusGrupos}
              onNovoGrupo={() => setModalNovoGrupo(true)}
              onReativarGrupo={(id) => setModalReativar(id)}
            />
          </div>
        </div>
      </div>

      {modalNovoGrupo && (
        <ModalNovoGrupo
          onConfirmar={handleNovoGrupo}
          onCancelar={() => setModalNovoGrupo(false)}
          enviando={criandoGrupo}
        />
      )}

      {modalReativar !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Reativar Grupo</h2>
            <p className="text-gray-600 text-sm mb-6">
              Ao reativar este grupo, o grupo atual será <strong>desativado</strong>. Deseja continuar?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleReativarGrupo(modalReativar)}
                className="flex-1 bg-[#782E29] text-white py-3 rounded-md font-medium hover:bg-[#782e2981] transition cursor-pointer"
              >
                Confirmar
              </button>
              <button
                onClick={() => setModalReativar(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardGrupo;
