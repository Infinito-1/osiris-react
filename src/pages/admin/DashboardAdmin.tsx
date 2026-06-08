/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";

type Aba = "candidaturas" | "usuarios" | "projetos" | "demandas";
type Papel = "Empreendedor" | "Coordenador" | "Grupo" | "Admin";

// ── Toast de feedback ─────────────────────────────────────────────────────────

const Toast: React.FC<{
  mensagem: string;
  tipo: "sucesso" | "erro";
  onFechar: () => void;
}> = ({ mensagem, tipo, onFechar }) => (
  <div
    className={`fixed bottom-6 right-6 z-50 p-4 rounded-lg shadow-2xl w-full max-w-sm border
    ${
      tipo === "sucesso"
        ? "bg-green-50 border-green-300 text-green-800"
        : "bg-red-50 border-red-300 text-red-800"
    }`}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">{tipo === "sucesso" ? "✅" : "❌"}</span>
        <p className="text-sm font-semibold">{mensagem}</p>
      </div>
      <button
        onClick={onFechar}
        className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
      >
        ✕
      </button>
    </div>
  </div>
);

// ── Modais ────────────────────────────────────────────────────────────────────

const ModalConfirmar: React.FC<{
  titulo: string;
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
  cor?: string;
  labelConfirmar?: string;
}> = ({
  titulo,
  mensagem,
  onConfirmar,
  onCancelar,
  cor = "#782E29",
  labelConfirmar = "Confirmar",
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-3">{titulo}</h2>
      <p className="text-gray-600 text-sm mb-6">{mensagem}</p>
      <div className="flex gap-3">
        <button
          onClick={onConfirmar}
          style={{ backgroundColor: cor }}
          className="flex-1 text-white py-3 rounded-md font-medium transition cursor-pointer hover:opacity-90"
        >
          {labelConfirmar}
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

const ModalAlterarPapel: React.FC<{
  usuario: any;
  onConfirmar: (papel: Papel) => Promise<void>;
  onCancelar: () => void;
}> = ({ usuario, onConfirmar, onCancelar }) => {
  const [papel, setPapel] = useState<Papel>(usuario.usuStrTipo);
  const [enviando, setEnviando] = useState(false);

  async function handleConfirmar() {
    setEnviando(true);
    await onConfirmar(papel);
    setEnviando(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Alterar Papel</h2>
        <p className="text-gray-500 text-sm mb-6">
          Usuário: <strong>{usuario.usuStrNome}</strong>
        </p>
        <select
          value={papel}
          onChange={(e) => setPapel(e.target.value as Papel)}
          className="w-full p-2 border border-gray-300 rounded-md mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
        >
          {(["Empreendedor", "Coordenador", "Grupo", "Admin"] as Papel[]).map(
            (p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ),
          )}
        </select>
        <div className="flex gap-3">
          <button
            onClick={handleConfirmar}
            disabled={enviando}
            className="flex-1 bg-[#782E29] text-white py-3 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer disabled:opacity-50"
          >
            {enviando ? "Salvando..." : "Confirmar"}
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

const ModalCriarUsuario: React.FC<{
  onConfirmar: (dto: any) => Promise<void>;
  onCancelar: () => void;
  enviando: boolean;
}> = ({ onConfirmar, onCancelar, enviando }) => {
  const [form, setForm] = useState({
    usuStrNome: "",
    usuStrEmail: "",
    usuStrSenha: "",
    usuStrTipo: "Empreendedor" as Papel,
    // Coordenador
    cooStrCurso: "",
    // Empreendedor
    empStrEmpresa: "",
    empChaCnpj: "",
    // Grupo
    gruStrNome: "",
    gruStrDescricao: "",
    gruChaRa: "",
    gruIntTamanho: 1,
    gruStrMembros: "",
    semIntId: 1,
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Criar Usuário</h2>
        <div className="space-y-4">
          {[
            { label: "Nome", key: "usuStrNome", type: "text" },
            { label: "Email", key: "usuStrEmail", type: "email" },
            { label: "Senha", key: "usuStrSenha", type: "password" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                value={(form as any)[key]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              value={form.usuStrTipo}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  usuStrTipo: e.target.value as Papel,
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29] bg-white"
            >
              {(
                ["Empreendedor", "Coordenador", "Grupo", "Admin"] as Papel[]
              ).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          {form.usuStrTipo === 'Coordenador' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
              <input
                type="text"
                value={form.cooStrCurso}
                onChange={(e) => setForm((f) => ({ ...f, cooStrCurso: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                placeholder="Ex: Engenharia de Software"
              />
            </div>
          )}

          {form.usuStrTipo === 'Empreendedor' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                <input
                  type="text"
                  value={form.empStrEmpresa}
                  onChange={(e) => setForm((f) => ({ ...f, empStrEmpresa: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                  placeholder="Ex: Tech Solutions LTDA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                <input
                  type="text"
                  value={form.empChaCnpj}
                  onChange={(e) => setForm((f) => ({ ...f, empChaCnpj: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                  placeholder="Ex: 12345678000195"
                />
              </div>
            </>
          )}

          {form.usuStrTipo === 'Grupo' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Grupo</label>
                <input type="text" value={form.gruStrNome}
                  onChange={(e) => setForm((f) => ({ ...f, gruStrNome: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                  placeholder="Ex: Grupo Alpha" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input type="text" value={form.gruStrDescricao}
                  onChange={(e) => setForm((f) => ({ ...f, gruStrDescricao: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                  placeholder="Ex: Sistema de match de projetos" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RA do Líder</label>
                <input type="text" value={form.gruChaRa}
                  onChange={(e) => setForm((f) => ({ ...f, gruChaRa: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                  placeholder="Ex: 1234567890123" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tamanho do Grupo</label>
                <input type="number" value={form.gruIntTamanho}
                  onChange={(e) => setForm((f) => ({ ...f, gruIntTamanho: Number(e.target.value) }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                  min={1} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Membros</label>
                <input type="text" value={form.gruStrMembros}
                  onChange={(e) => setForm((f) => ({ ...f, gruStrMembros: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                  placeholder="Ex: Pedro, Ana, Lucas" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID do Semestre</label>
                <input type="number" value={form.semIntId}
                  onChange={(e) => setForm((f) => ({ ...f, semIntId: Number(e.target.value) }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                  min={1} />
              </div>
            </>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onConfirmar(form)}
            disabled={
              enviando ||
              !form.usuStrNome ||
              !form.usuStrEmail ||
              !form.usuStrSenha
            }
            className="flex-1 bg-[#782E29] text-white py-3 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enviando ? "Criando..." : "Criar Usuário"}
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

const ModalEditarUsuario: React.FC<{
  usuario: any;
  onConfirmar: (id: number, dto: any) => Promise<void>;
  onCancelar: () => void;
  enviando: boolean;
}> = ({ usuario, onConfirmar, onCancelar, enviando }) => {
  const [form, setForm] = useState({
    usuStrNome: usuario.usuStrNome ?? "",
    usuStrEmail: usuario.usuStrEmail ?? "",
    usuStrTelefone: usuario.usuStrTelefone ?? "",
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Editar Usuário</h2>
        <div className="space-y-4">
          {[
            { label: "Nome", key: "usuStrNome", type: "text" },
            { label: "Email", key: "usuStrEmail", type: "email" },
            { label: "Telefone", key: "usuStrTelefone", type: "text" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                value={(form as any)[key]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onConfirmar(usuario.usuIntId, form)}
            disabled={enviando}
            className="flex-1 bg-[#782E29] text-white py-3 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer disabled:opacity-50"
          >
            {enviando ? "Salvando..." : "Salvar"}
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

// ── Subcomponentes ────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const cor = () => {
    switch (status?.toLowerCase()) {
      case "aceita":
      case "ativa":
      case "aprovada":
        return "bg-green-100 text-green-700 border-green-300";
      case "recusada":
      case "desativada":
      case "rejeitada":
        return "bg-red-100 text-red-700 border-red-300";
      case "pendente":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "desistente":
        return "bg-gray-100 text-gray-600 border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };
  return (
    <span
      className={`border text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide ${cor()}`}
    >
      {status}
    </span>
  );
};

const Tag = ({ text }: { text: string }) => (
  <span className="bg-[#021926] text-[#DAD4C8] text-[10px] px-3 py-1 rounded-full font-medium">
    {text}
  </span>
);

const TabsNavegacao = ({
  aba,
  setAba,
}: {
  aba: Aba;
  setAba: (a: Aba) => void;
}) => (
  <div className="grid grid-cols-4 w-full bg-[#5F747F] rounded-md p-1 shadow-sm gap-1">
    {(
      [
        ["candidaturas", "Candidaturas"],
        ["usuarios", "Usuários"],
        ["projetos", "Projetos"],
        ["demandas", "Demandas"],
      ] as const
    ).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setAba(key)}
        className={`py-2 rounded-md font-medium text-sm transition-all cursor-pointer ${
          aba === key
            ? "bg-white text-[#021926] shadow-sm"
            : "text-[#DAD4C8] hover:bg-white/10"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

const CardCandidatura = ({
  candidatura,
  onExcluir,
}: {
  candidatura: any;
  onExcluir: (id: number, nome: string) => void;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-4">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="admin-text text-base font-bold text-[#021926]">
          {candidatura.demanda?.demStrNome ?? "—"}
        </h3>
        <p className="text-gray-500 text-xs">ID: {candidatura.canIntId}</p>
      </div>
      <StatusBadge status={candidatura.canStrStatus} />
    </div>
    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
          Grupo
        </p>
        <p className="font-medium text-gray-900">
          {candidatura.grupo?.gruStrNome ?? "—"}
        </p>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
          Aprovação
        </p>
        <p className="font-medium text-gray-900">
          {candidatura.canBoolAprovacao ? "✓ Aprovada" : "✗ Pendente"}
        </p>
      </div>
    </div>
    <button
      onClick={() =>
        onExcluir(
          candidatura.canIntId,
          candidatura.demanda?.demStrNome ?? "candidatura",
        )
      }
      className="px-4 py-1.5 border border-[#782E29] text-[#782E29] rounded text-sm font-medium hover:bg-red-50 transition cursor-pointer"
    >
      Remover
    </button>
  </div>
);

const CardUsuario = ({
  usuario,
  onAlterarPapel,
  onDesativar,
  onEditar,
}: {
  usuario: any;
  onAlterarPapel: (u: any) => void;
  onDesativar: (id: number, nome: string) => void;
  onEditar: (u: any) => void;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-4">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="admin-text text-base font-bold text-[#021926]">
          {usuario.usuStrNome}
        </h3>
        <p className="text-gray-500 text-sm">{usuario.usuStrEmail}</p>
      </div>
      <Tag text={usuario.usuStrTipo} />
    </div>
    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
          ID
        </p>
        <p className="font-medium text-gray-900">{usuario.usuIntId}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
          Status
        </p>
        <p className="font-medium text-gray-900">
          {usuario.usuBoolAtivo ? "Ativo" : "Inativo"}
        </p>
      </div>
    </div>
    <div className="flex gap-2">
      <button
        onClick={() => onAlterarPapel(usuario)}
        className="px-4 py-1.5 border border-[#5F747F] text-[#5F747F] rounded text-sm font-medium hover:bg-[#5F747F] hover:text-white transition cursor-pointer"
      >
        Alterar Papel
      </button>
      <button
        onClick={() => onEditar(usuario)}
        className="px-4 py-1.5 border border-[#5F747F] text-[#5F747F] rounded text-sm font-medium hover:bg-[#5F747F] hover:text-white transition cursor-pointer"
      >
        Editar
      </button>
      <button
        onClick={() => onDesativar(usuario.usuIntId, usuario.usuStrNome)}
        className="px-4 py-1.5 border border-[#782E29] text-[#782E29] rounded text-sm font-medium hover:bg-red-50 transition cursor-pointer"
      >
        Desativar
      </button>
    </div>
  </div>
);

const CardProjeto = ({
  projeto,
  onDesativar,
  onReativar,
  onExcluir,
  onEditar,
}: {
  projeto: any;
  onDesativar: (id: number, nome: string) => void;
  onReativar: (id: number) => void;
  onExcluir: (id: number, nome: string) => void;
  onEditar: (id: number) => void;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-4">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="admin-text text-base font-bold text-[#021926]">
          {projeto.candidatura?.demanda?.demStrNome ?? projeto.proStrDescricao}
        </h3>
        <p className="text-gray-500 text-xs">ID: {projeto.proIntId}</p>
      </div>
      <StatusBadge status={projeto.proBoolAtivo ? "Ativo" : "Desativado"} />
    </div>
    {projeto.candidatura?.grupo && (
      <p className="text-sm text-gray-600 mb-1">
        Grupo:{" "}
        <span className="font-medium">
          {projeto.candidatura.grupo.gruStrNome}
        </span>
      </p>
    )}
    <p className="text-xs text-gray-500 mb-3">
      Início: {new Date(projeto.proDateInicio).toLocaleDateString("pt-BR")}
    </p>
    {projeto.proStrMotivoDesativacao && (
      <div className="bg-red-50 border border-red-200 rounded p-2 mb-3 text-xs text-red-700">
        <strong>Motivo:</strong> {projeto.proStrMotivoDesativacao}
      </div>
    )}
    <div className="flex gap-2 flex-wrap">
      {projeto.proBoolAtivo ? (
        <button
          onClick={() =>
            onDesativar(
              projeto.proIntId,
              projeto.candidatura?.demanda?.demStrNome ??
                projeto.proStrDescricao,
            )
          }
          className="px-4 py-1.5 border border-[#782E29] text-[#782E29] rounded text-sm font-medium hover:bg-red-50 transition cursor-pointer"
        >
          Desativar
        </button>
      ) : (
        <button
          onClick={() => onReativar(projeto.proIntId)}
          className="px-4 py-1.5 border border-[#40531D] text-[#40531D] rounded text-sm font-medium hover:bg-green-50 transition cursor-pointer"
        >
          Reativar
        </button>
      )}
      <button
        onClick={() => onEditar(projeto.proIntId)}
        className="px-4 py-1.5 border border-[#5F747F] text-[#5F747F] rounded text-sm font-medium hover:bg-[#5F747F] hover:text-white transition cursor-pointer"
      >
        Editar
      </button>
      <button
        onClick={() =>
          onExcluir(
            projeto.proIntId,
            projeto.candidatura?.demanda?.demStrNome ?? projeto.proStrDescricao,
          )
        }
        className="px-4 py-1.5 border border-gray-400 text-gray-600 rounded text-sm font-medium hover:bg-gray-100 transition cursor-pointer"
      >
        Excluir
      </button>
    </div>
  </div>
);

const CardDemanda = ({
  demanda,
  onDesativar,
  onExcluir,
  onEditar,
}: {
  demanda: any;
  onDesativar: (id: number, nome: string) => void;
  onExcluir: (id: number, nome: string) => void;
  onEditar: (id: number) => void;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-4">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="admin-text text-base font-bold text-[#021926]">
          {demanda.demStrNome}
        </h3>
        <p className="text-gray-500 text-xs">ID: {demanda.demIntId}</p>
      </div>
      <StatusBadge status={demanda.demBoolAtivo ? "Ativa" : "Desativada"} />
    </div>
    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
      {demanda.demStrDescricao}
    </p>
    <div className="flex gap-2 flex-wrap">
      {demanda.demBoolAtivo ? (
        <button
          onClick={() => onDesativar(demanda.demIntId, demanda.demStrNome)}
          className="px-4 py-1.5 border border-[#782E29] text-[#782E29] rounded text-sm font-medium hover:bg-red-50 transition cursor-pointer"
        >
          Desativar
        </button>
      ) : (
        <button
          onClick={() =>
            api
              .put(`/admin/demanda/${demanda.demIntId}/reativar`)
              .then(() => window.location.reload())
          }
          className="px-4 py-1.5 border border-[#40531D] text-[#40531D] rounded text-sm font-medium hover:bg-green-50 transition cursor-pointer"
        >
          Reativar
        </button>
      )}
      <button
        onClick={() => onEditar(demanda.demIntId)}
        className="px-4 py-1.5 border border-[#5F747F] text-[#5F747F] rounded text-sm font-medium hover:bg-[#5F747F] hover:text-white transition cursor-pointer"
      >
        Editar
      </button>
      <button
        onClick={() => onExcluir(demanda.demIntId, demanda.demStrNome)}
        className="px-4 py-1.5 border border-gray-400 text-gray-600 rounded text-sm font-medium hover:bg-gray-100 transition cursor-pointer"
      >
        Excluir
      </button>
    </div>
  </div>
);

const EstatisticasGerais = ({ stats }: { stats: any }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
    <h3 className="admin-text text-lg font-bold text-[#021926] mb-2">
      Estatísticas
    </h3>
    {[
      {
        label: "Usuários",
        valor: stats?.totalUsuarios ?? 0,
        cor: "bg-[#5F747F] text-[#DAD4C8]",
      },
      {
        label: "Demandas",
        valor: stats?.totalDemandas ?? 0,
        cor: "bg-[#021926] text-[#DAD4C8]",
      },
      {
        label: "Projetos",
        valor: stats?.totalProjetos ?? 0,
        cor: "bg-[#40531D] text-white",
      },
      {
        label: "Admins",
        valor: stats?.totalAdmins ?? 0,
        cor: "bg-[#782E29] text-[#DAD4C8]",
      },
    ].map(({ label, valor, cor }) => (
      <div
        key={label}
        className={`w-full py-2 ${cor} rounded flex justify-between px-4 font-medium text-sm`}
      >
        <span>{label}</span>
        <span className="font-bold">{valor}</span>
      </div>
    ))}
  </div>
);

// ── Componente principal ──────────────────────────────────────────────────────

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [aba, setAba] = useState<Aba>("candidaturas");
  const [candidaturas, setCandidaturas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [projetos, setProjetos] = useState<any[]>([]);
  const [demandas, setDemandas] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todas");
  const [filtroTipoUsuario, setFiltroTipoUsuario] = useState("Todos");
  const [toast, setToast] = useState<{
    mensagem: string;
    tipo: "sucesso" | "erro";
  } | null>(null);

  // Modais
  const [modalExcluirCan, setModalExcluirCan] = useState<{
    id: number;
    nome: string;
    totalProjetos?: number;
    carregando?: boolean;
  } | null>(null);
  const [modalDesativarUsu, setModalDesativarUsu] = useState<{
    id: number;
    nome: string;
  } | null>(null);
  const [modalAlterarPapel, setModalAlterarPapel] = useState<any | null>(null);
  const [modalCriarUsuario, setModalCriarUsuario] = useState(false);
  const [modalDesativarProjeto, setModalDesativarProjeto] = useState<{
    id: number;
    nome: string;
  } | null>(null);
  const [modalExcluirProjeto, setModalExcluirProjeto] = useState<{
    id: number;
    nome: string;
  } | null>(null);
  const [modalDesativarDemanda, setModalDesativarDemanda] = useState<{
    id: number;
    nome: string;
  } | null>(null);
  const [modalExcluirDemanda, setModalExcluirDemanda] = useState<{
    id: number;
    nome: string;
  } | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [modalEditarUsuario, setModalEditarUsuario] = useState<any | null>(
    null,
  );

  // Handler:
  async function handleEditarUsuario(id: number, dto: any) {
    setEnviando(true);
    try {
      await api.put(`/usuarios/${id}`, dto);
      setUsuarios((prev) =>
        prev.map((u) => (u.usuIntId === id ? { ...u, ...dto } : u)),
      );
      setModalEditarUsuario(null);
      mostrarToast("Usuário atualizado.", "sucesso");
    } catch (error: any) {
      mostrarToast(error?.response?.data?.message ?? "Erro ao editar.", "erro");
    } finally {
      setEnviando(false);
    }
  }

  function mostrarToast(mensagem: string, tipo: "sucesso" | "erro") {
    setToast({ mensagem, tipo });
    setTimeout(() => setToast(null), 3500);
  }

  async function carregar() {
    try {
      const [cands, usus, projs, dems, statsData] = await Promise.all([
        api.get("/candidaturas").then((r) => r.data),
        api.get("/usuarios").then((r) => r.data),
        api.get("/projetos/todosStatus").then((r) => r.data),
        api.get("/demandas").then((r) => r.data),
        api.get("/admin/estatisticas").then((r) => r.data),
      ]);
      setCandidaturas(cands);
      setUsuarios(usus);
      setProjetos(projs);
      setDemandas(dems);
      setStats(statsData);
    } catch {
      setErro("Não foi possível carregar o painel.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

async function handleExcluirCandidatura() {
  if (!modalExcluirCan) return;
  try {
    await api.delete(`/admin/candidatura/${modalExcluirCan.id}`);
    setCandidaturas((prev) =>
      prev.filter((c) => c.canIntId !== modalExcluirCan.id),
    );
    setModalExcluirCan(null);
    mostrarToast("Candidatura removida.", "sucesso");
  } catch (error: any) {
    mostrarToast(
      error?.response?.data?.message ?? "Erro ao remover.",
      "erro",
    );
  }
}

async function abrirModalExcluirCandidatura(id: number, nome: string) {
  setModalExcluirCan({ id, nome, carregando: true });
  try {
    const { data } = await api.get(`/admin/candidatura/${id}/impacto`);
    setModalExcluirCan({ id, nome, totalProjetos: data.totalProjetos, carregando: false });
  } catch {
    setModalExcluirCan({ id, nome, totalProjetos: 0, carregando: false });
  }
}

  async function handleDesativarUsuario() {
    if (!modalDesativarUsu) return;
    try {
      await api.delete(`/admin/usuario/${modalDesativarUsu.id}`);
      setUsuarios((prev) =>
        prev.filter((u) => u.usuIntId !== modalDesativarUsu.id),
      );
      setModalDesativarUsu(null);
      mostrarToast("Usuário desativado.", "sucesso");
    } catch (error: any) {
      mostrarToast(
        error?.response?.data?.message ?? "Erro ao desativar.",
        "erro",
      );
    }
  }

  async function handleAlterarPapel(papel: Papel) {
    if (!modalAlterarPapel) return;
    try {
      await api.put(`/admin/usuario/${modalAlterarPapel.usuIntId}/papel`, {
        novoPapel: papel,
      });
      setUsuarios((prev) =>
        prev.map((u) =>
          u.usuIntId === modalAlterarPapel.usuIntId
            ? { ...u, usuStrTipo: papel }
            : u,
        ),
      );
      setModalAlterarPapel(null);
      mostrarToast(`Papel alterado para ${papel}.`, "sucesso");
    } catch (error: any) {
      const m = error?.response?.data?.message;
      mostrarToast(
        Array.isArray(m) ? m.join(" ") : (m ?? "Erro ao alterar papel."),
        "erro",
      );
    }
  }

  async function handleCriarUsuario(dto: any) {
    setEnviando(true);
    try {
      await api.post("/admin/usuario", dto);
      setModalCriarUsuario(false);
      mostrarToast("Usuário criado com sucesso.", "sucesso");
      await carregar();
    } catch (error: any) {
      const m = error?.response?.data?.message;
      mostrarToast(
        Array.isArray(m) ? m.join(" ") : (m ?? "Erro ao criar usuário."),
        "erro",
      );
    } finally {
      setEnviando(false);
    }
  }

  async function handleDesativarProjeto() {
    if (!modalDesativarProjeto) return;
    try {
      await api.put(`/projetos/${modalDesativarProjeto.id}/desativar`, {});
      setProjetos((prev) =>
        prev.map((p) =>
          p.proIntId === modalDesativarProjeto.id
            ? { ...p, proBoolAtivo: false, proBoolDesativadoCoordenador: true }
            : p,
        ),
      );
      setModalDesativarProjeto(null);
      mostrarToast("Projeto desativado.", "sucesso");
    } catch (error: any) {
      mostrarToast(
        error?.response?.data?.message ?? "Erro ao desativar.",
        "erro",
      );
    }
  }

  async function handleReativarProjeto(id: number) {
    try {
      await api.put(`/projetos/${id}/reativar`);
      setProjetos((prev) =>
        prev.map((p) =>
          p.proIntId === id
            ? { ...p, proBoolAtivo: true, proBoolDesativadoCoordenador: false }
            : p,
        ),
      );
      mostrarToast("Projeto reativado.", "sucesso");
    } catch (error: any) {
      mostrarToast(
        error?.response?.data?.message ?? "Erro ao reativar.",
        "erro",
      );
    }
  }

  async function handleExcluirProjeto() {
    if (!modalExcluirProjeto) return;
    try {
      await api.delete(`/admin/projeto/${modalExcluirProjeto.id}`);
      setProjetos((prev) =>
        prev.filter((p) => p.proIntId !== modalExcluirProjeto.id),
      );
      setModalExcluirProjeto(null);
      mostrarToast("Projeto excluído.", "sucesso");
    } catch (error: any) {
      mostrarToast(
        error?.response?.data?.message ?? "Erro ao excluir.",
        "erro",
      );
    }
  }

  async function handleDesativarDemanda() {
    if (!modalDesativarDemanda) return;
    try {
      await api.put(`/demandas/desativar/${modalDesativarDemanda.id}`);
      setDemandas((prev) =>
        prev.map((d) =>
          d.demIntId === modalDesativarDemanda.id
            ? { ...d, demBoolAtivo: false }
            : d,
        ),
      );
      setModalDesativarDemanda(null);
      mostrarToast("Demanda desativada.", "sucesso");
    } catch (error: any) {
      mostrarToast(
        error?.response?.data?.message ?? "Erro ao desativar.",
        "erro",
      );
    }
  }

  async function handleExcluirDemanda() {
    if (!modalExcluirDemanda) return;
    try {
      await api.delete(`/admin/demanda/${modalExcluirDemanda.id}`);
      setDemandas((prev) =>
        prev.filter((d) => d.demIntId !== modalExcluirDemanda.id),
      );
      setModalExcluirDemanda(null);
      mostrarToast("Demanda excluída.", "sucesso");
    } catch (error: any) {
      mostrarToast(
        error?.response?.data?.message ?? "Erro ao excluir.",
        "erro",
      );
    }
  }

  // Filtrar usuários
  const usuariosFiltrados =
    filtroTipoUsuario === "Todos"
      ? usuarios
      : usuarios.filter((u) => u.usuStrTipo === filtroTipoUsuario);

  const candidaturasFiltradas =
    filtroStatus === "Todas"
      ? candidaturas
      : candidaturas.filter(
          (c) => c.canStrStatus?.toLowerCase() === filtroStatus.toLowerCase(),
        );

  if (loading)
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
        <p className="text-gray-500">Carregando painel...</p>
      </div>
    );

  if (erro)
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
        <p className="text-red-600">{erro}</p>
      </div>
    );

  return (
    <>
      {/* Toast */}
      {toast && (
        <Toast
          mensagem={toast.mensagem}
          tipo={toast.tipo}
          onFechar={() => setToast(null)}
        />
      )}

      {/* Modais */}
      {modalExcluirCan && (
        <ModalConfirmar
          titulo="Remover Candidatura"
          mensagem={`Remover a candidatura para "${modalExcluirCan.nome}"?`}
          onConfirmar={handleExcluirCandidatura}
          onCancelar={() => setModalExcluirCan(null)}
          labelConfirmar="Remover"
        />
      )}
      {modalDesativarUsu && (
        <ModalConfirmar
          titulo="Desativar Usuário"
          mensagem={`Desativar "${modalDesativarUsu.nome}"? Ele perderá acesso à plataforma.`}
          onConfirmar={handleDesativarUsuario}
          onCancelar={() => setModalDesativarUsu(null)}
          labelConfirmar="Desativar"
        />
      )}
      {modalAlterarPapel && (
        <ModalAlterarPapel
          key={modalAlterarPapel.usuIntId}
          usuario={modalAlterarPapel}
          onConfirmar={handleAlterarPapel}
          onCancelar={() => setModalAlterarPapel(null)}
        />
      )}
      {modalCriarUsuario && (
        <ModalCriarUsuario
          onConfirmar={handleCriarUsuario}
          onCancelar={() => setModalCriarUsuario(false)}
          enviando={enviando}
        />
      )}
      {modalDesativarProjeto && (
        <ModalConfirmar
          titulo="Desativar Projeto"
          mensagem={`Desativar o projeto "${modalDesativarProjeto.nome}"?`}
          onConfirmar={handleDesativarProjeto}
          onCancelar={() => setModalDesativarProjeto(null)}
          labelConfirmar="Desativar"
        />
      )}
      {modalExcluirProjeto && (
        <ModalConfirmar
          titulo="Excluir Projeto"
          mensagem={`Excluir permanentemente "${modalExcluirProjeto.nome}"? Esta ação não pode ser desfeita.`}
          onConfirmar={handleExcluirProjeto}
          onCancelar={() => setModalExcluirProjeto(null)}
          labelConfirmar="Excluir"
          cor="#7f1d1d"
        />
      )}
      {modalDesativarDemanda && (
        <ModalConfirmar
          titulo="Desativar Demanda"
          mensagem={`Desativar "${modalDesativarDemanda.nome}"?`}
          onConfirmar={handleDesativarDemanda}
          onCancelar={() => setModalDesativarDemanda(null)}
          labelConfirmar="Desativar"
        />
      )}
      {modalExcluirDemanda && (
        <ModalConfirmar
          titulo="Excluir Demanda"
          mensagem={`Excluir permanentemente "${modalExcluirDemanda.nome}"?`}
          onConfirmar={handleExcluirDemanda}
          onCancelar={() => setModalExcluirDemanda(null)}
          labelConfirmar="Excluir"
          cor="#7f1d1d"
        />
      )}

      {modalEditarUsuario && (
        <ModalEditarUsuario
          key={modalEditarUsuario.usuIntId}
          usuario={modalEditarUsuario}
          onConfirmar={handleEditarUsuario}
          onCancelar={() => setModalEditarUsuario(null)}
          enviando={enviando}
        />
      )}

      <div className="w-full min-h-screen bg-[#F1F7EE] py-10 font-sans">
        <div className="w-11/12 max-w-6xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
              Painel de Administrador
            </h1>
            <p className="text-gray-600 font-light">
              Gerencie usuários, candidaturas, projetos e demandas
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <TabsNavegacao aba={aba} setAba={setAba} />

              {/* Candidaturas */}
              {aba === "candidaturas" && (
                <div>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {[
                      "Todas",
                      "Pendente",
                      "Aceita",
                      "Recusada",
                      "Desistente",
                    ].map((s) => (
                      <button
                        key={s}
                        onClick={() => setFiltroStatus(s)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition cursor-pointer ${
                          filtroStatus === s
                            ? "bg-[#782E29] text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {candidaturasFiltradas.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                      Nenhuma candidatura encontrada.
                    </div>
                  ) : (
                    candidaturasFiltradas.map((c) => (
                      <CardCandidatura
                        key={c.canIntId}
                        candidatura={c}
                        onExcluir={(id, nome) =>
                          abrirModalExcluirCandidatura( id, nome )
                        }
                      />
                    ))
                  )}
                </div>
              )}

              {/* Usuários */}
              {aba === "usuarios" && (
                <div>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {[
                      "Todos",
                      "Empreendedor",
                      "Coordenador",
                      "Grupo",
                      "Admin",
                    ].map((t) => (
                      <button
                        key={t}
                        onClick={() => setFiltroTipoUsuario(t)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition cursor-pointer ${
                          filtroTipoUsuario === t
                            ? "bg-[#782E29] text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {usuariosFiltrados.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                      Nenhum usuário encontrado.
                    </div>
                  ) : (
                    usuariosFiltrados.map((u) => (
                      <CardUsuario
                        key={u.usuIntId}
                        usuario={u}
                        onAlterarPapel={setModalAlterarPapel}
                        onDesativar={(id, nome) =>
                          setModalDesativarUsu({ id, nome })
                        }
                        onEditar={setModalEditarUsuario}
                      />
                    ))
                  )}
                </div>
              )}

              {/* Projetos */}
              {aba === "projetos" && (
                <div>
                  {projetos.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                      Nenhum projeto encontrado.
                    </div>
                  ) : (
                    projetos.map((p) => (
                      <CardProjeto
                        key={p.proIntId}
                        projeto={p}
                        onDesativar={(id, nome) =>
                          setModalDesativarProjeto({ id, nome })
                        }
                        onReativar={handleReativarProjeto}
                        onExcluir={(id, nome) =>
                          setModalExcluirProjeto({ id, nome })
                        }
                        onEditar={(id) => navigate(`/projeto/${id}`)}
                      />
                    ))
                  )}
                </div>
              )}

              {/* Demandas */}
              {aba === "demandas" && (
                <div>
                  {demandas.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                      Nenhuma demanda encontrada.
                    </div>
                  ) : (
                    demandas.map((d) => (
                      <CardDemanda
                        key={d.demIntId}
                        demanda={d}
                        onDesativar={(id, nome) =>
                          setModalDesativarDemanda({ id, nome })
                        }
                        onExcluir={(id, nome) =>
                          setModalExcluirDemanda({ id, nome })
                        }
                        onEditar={(id) =>
                          navigate(`/cadastrar_demanda?id=${id}`)
                        }
                      />
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="admin-text text-lg font-bold text-[#021926] mb-4">
                  Ações Rápidas
                </h3>
                <button
                  onClick={() => setModalCriarUsuario(true)}
                  className="w-full py-2 px-4 bg-[#782E29] text-white rounded-md text-sm font-medium hover:bg-[#6d2823] transition cursor-pointer"
                >
                  + Criar Usuário
                </button>
              </div>
              <EstatisticasGerais stats={stats} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
