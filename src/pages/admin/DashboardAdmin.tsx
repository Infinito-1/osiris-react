import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StatusBadge = ({ text, status }: { text: string; status?: string }) => {
  const getStatusColor = (s?: string) => {
    switch (s?.toLowerCase()) {
      case "ativa":
        return "bg-green-100 text-green-700 border-green-300";
      case "desativada":
        return "bg-red-100 text-red-700 border-red-300";
      case "pendente":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <span
      className={`border text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide ${getStatusColor(
        status
      )}`}
    >
      {text}
    </span>
  );
};

const Tag = ({ text }: { text: string }) => (
  <span className="bg-[#021926] text-[#DAD4C8] text-[10px] px-3 py-1 rounded-full font-medium">
    {text}
  </span>
);

const TabsNavegacao = ({
  abaAtiva,
  setAbaAtiva,
}: {
  abaAtiva: "candidaturas" | "usuarios";
  setAbaAtiva: (aba: "candidaturas" | "usuarios") => void;
}) => {
  return (
    <div className="flex w-full bg-[#5F747F] rounded-md p-1 shadow-sm">
      <button
        className={`flex-1 py-2 rounded-md font-medium text-sm transition-all ${
          abaAtiva === "candidaturas"
            ? "bg-white text-[#021926] shadow-sm"
            : "text-[#DAD4C8] hover:bg-white/10"
        }`}
        onClick={() => setAbaAtiva("candidaturas")}
      >
        Candidaturas
      </button>

      <button
        className={`flex-1 py-2 rounded-md font-medium text-sm transition-all ${
          abaAtiva === "usuarios"
            ? "bg-white text-[#021926] shadow-sm"
            : "text-[#DAD4C8] hover:bg-white/10"
        }`}
        onClick={() => setAbaAtiva("usuarios")}
      >
        Utilizadores
      </button>
    </div>
  );
};

const CardCandidatura = ({
  candidatura,
  onDesativar,
  onAtivar,
}: {
  candidatura: any;
  onDesativar: (id: number) => void;
  onAtivar: (id: number) => void;
}) => {
  const isAtiva = candidatura.canStrStatus?.toLowerCase() === "ativa";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4 hover:border-gray-300 transition-colors">

      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-[#021926]">
            {candidatura.demanda?.demStrNome || "Demanda sem nome"}
          </h3>
          <p className="text-gray-600 text-sm">
            ID: {candidatura.canIntId}
          </p>
        </div>
        <StatusBadge text={candidatura.canStrStatus} status={candidatura.canStrStatus} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Grupo
          </p>
          <p className="font-medium text-gray-900 text-sm">
            {candidatura.grupo?.gruStrNome || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Coordenador
          </p>
          <p className="font-medium text-gray-900 text-sm">
            {candidatura.coordenador?.cooStrCurso || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Aprovação
          </p>
          <p className="font-medium text-gray-900 text-sm">
            {candidatura.canBoolAprovacao ? "✓ Aprovada" : "✗ Pendente"}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        {isAtiva ? (
          <button
            className="flex-1 bg-[#782E29] hover:bg-[#3D1310] text-white py-2 rounded-md font-medium text-sm transition-colors"
            onClick={() => onDesativar(candidatura.canIntId)}
          >
            Desativar
          </button>
        ) : (
          <button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium text-sm transition-colors"
            onClick={() => onAtivar(candidatura.canIntId)}
          >
            Ativar
          </button>
        )}
      </div>
    </div>
  );
};

const CardUsuario = ({
  usuario,
  onPromover,
  onRemoverAdmin,
  onDesativar,
}: {
  usuario: any;
  onPromover: (id: number) => void;
  onRemoverAdmin: (id: number) => void;
  onDesativar: (id: number) => void;
}) => {
  const isAdmin = usuario.usuStrTipo === "Admin";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4 hover:border-gray-300 transition-colors">

      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-[#021926]">
            {usuario.usuStrNome}
          </h3>
          <p className="text-gray-600 text-sm">{usuario.usuStrEmail}</p>
        </div>
        <Tag text={usuario.usuStrTipo} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            ID
          </p>
          <p className="font-medium text-gray-900 text-sm">{usuario.usuIntId}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">
            Telefone
          </p>
          <p className="font-medium text-gray-900 text-sm">
            {usuario.usuStrTelefone || "N/A"}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        {isAdmin ? (
          <button
            className="flex-1 bg-[#5F747F] hover:bg-[#354046] text-white py-2 rounded-md font-medium text-sm transition-colors"
            onClick={() => onRemoverAdmin(usuario.usuIntId)}
          >
            Remover Admin
          </button>
        ) : (
          <button
            className="flex-1 bg-[#021926] hover:bg-black text-white py-2 rounded-md font-medium text-sm transition-colors"
            onClick={() => onPromover(usuario.usuIntId)}
          >
            Promover Admin
          </button>
        )}

        <button
          className="flex-1 bg-[#782E29] hover:bg-[#3D1310] text-white py-2 rounded-md font-medium text-sm transition-colors"
          onClick={() => onDesativar(usuario.usuIntId)}
        >
          Desativar
        </button>
      </div>
    </div>
  );
};

const EstatisticasGerais = ({ stats }: { stats: any }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
      <h3 className="text-lg font-bold text-[#021926] mb-4">
        Estatísticas Gerais
      </h3>

      <div className="w-full py-3 bg-[#5F747F] text-[#DAD4C8] rounded flex justify-between px-4 font-medium text-sm">
        <span>Total de Utilizadores</span>
        <span className="font-bold">{stats?.totalUsuarios || 0}</span>
      </div>

      <div className="w-full py-3 bg-[#021926] text-[#DAD4C8] rounded flex justify-between px-4 font-medium text-sm">
        <span>Total de Candidaturas</span>
        <span className="font-bold">{stats?.totalCandidaturas || 0}</span>
      </div>

      <div className="w-full py-3 bg-[#782E29] text-[#DAD4C8] rounded flex justify-between px-4 font-medium text-sm">
        <span>Candidaturas Ativas</span>
        <span className="font-bold">{stats?.candidaturasAtivas || 0}</span>
      </div>

      <div className="w-full py-3 bg-[#DAD4C8] text-[#021926] rounded flex justify-between px-4 font-medium text-sm border border-gray-300">
        <span>Candidaturas Desativadas</span>
        <span className="font-bold">{stats?.candidaturasDesativadas || 0}</span>
      </div>
    </div>
  );
};

const UtilizadoresPorTipo = ({ stats }: { stats: any }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
      <h3 className="text-lg font-bold text-[#021926] mb-4">
        Utilizadores por Tipo
      </h3>

      <div className="w-full py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded flex justify-between px-4 font-medium text-sm">
        <span>Empreendedores</span>
        <span className="font-bold">{stats?.usuariosPorTipo?.empreendedores || 0}</span>
      </div>

      <div className="w-full py-2 bg-purple-50 text-purple-700 border border-purple-100 rounded flex justify-between px-4 font-medium text-sm">
        <span>Coordenadores</span>
        <span className="font-bold">{stats?.usuariosPorTipo?.coordenadores || 0}</span>
      </div>

      <div className="w-full py-2 bg-green-50 text-green-700 border border-green-100 rounded flex justify-between px-4 font-medium text-sm">
        <span>Grupos</span>
        <span className="font-bold">{stats?.usuariosPorTipo?.grupos || 0}</span>
      </div>

      <div className="w-full py-2 bg-red-50 text-red-700 border border-red-100 rounded flex justify-between px-4 font-medium text-sm">
        <span>Administradores</span>
        <span className="font-bold">{stats?.usuariosPorTipo?.admins || 0}</span>
      </div>
    </div>
  );
};

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState<"candidaturas" | "usuarios">(
    "candidaturas"
  );
  const [candidaturas, setCandidaturas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("Todas");

  // Simular carregamento de dados (substituir por chamadas reais à API)
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);

        const candidaturasMock = [
          {
            canIntId: 1,
            canStrStatus: "Ativa",
            canBoolAprovacao: true,
            demanda: { demStrNome: "App de Gestão de Academia" },
            grupo: { gruStrNome: "Grupo A" },
            coordenador: { cooStrCurso: "Engenharia de Software" },
          },
          {
            canIntId: 2,
            canStrStatus: "Ativa",
            canBoolAprovacao: false,
            demanda: { demStrNome: "Sistema de Controle de Estoque" },
            grupo: { gruStrNome: "Grupo B" },
            coordenador: { cooStrCurso: "Análise de Sistemas" },
          },
          {
            canIntId: 3,
            canStrStatus: "Desativada",
            canBoolAprovacao: false,
            demanda: { demStrNome: "Landing Page para Startup" },
            grupo: { gruStrNome: "Grupo C" },
            coordenador: { cooStrCurso: "Design Digital" },
          },
        ];

        const usuariosMock = [
          {
            usuIntId: 1,
            usuStrNome: "João Silva",
            usuStrEmail: "joao@example.com",
            usuStrTipo: "Admin",
            usuStrTelefone: "11999999999",
          },
          {
            usuIntId: 2,
            usuStrNome: "Maria Santos",
            usuStrEmail: "maria@example.com",
            usuStrTipo: "Coordenador",
            usuStrTelefone: "11988888888",
          },
          {
            usuIntId: 3,
            usuStrNome: "Pedro Oliveira",
            usuStrEmail: "pedro@example.com",
            usuStrTipo: "Empreendedor",
            usuStrTelefone: "11977777777",
          },
          {
            usuIntId: 4,
            usuStrNome: "Ana Costa",
            usuStrEmail: "ana@example.com",
            usuStrTipo: "Grupo",
            usuStrTelefone: "11966666666",
          },
        ];

        const statsMock = {
          totalUsuarios: 4,
          totalCandidaturas: 3,
          candidaturasAtivas: 2,
          candidaturasDesativadas: 1,
          usuariosPorTipo: {
            empreendedores: 1,
            coordenadores: 1,
            grupos: 1,
            admins: 1,
          },
        };

        setCandidaturas(candidaturasMock);
        setUsuarios(usuariosMock);
        setStats(statsMock);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const handleDesativarCandidatura = (id: number) => {
    setCandidaturas(
      candidaturas.map((c) =>
        c.canIntId === id ? { ...c, canStrStatus: "Desativada" } : c
      )
    );
  };

  const handleAtivarCandidatura = (id: number) => {
    setCandidaturas(
      candidaturas.map((c) =>
        c.canIntId === id ? { ...c, canStrStatus: "Ativa" } : c
      )
    );
  };

  const handlePromoverAdmin = (id: number) => {
    setUsuarios(
      usuarios.map((u) =>
        u.usuIntId === id ? { ...u, usuStrTipo: "Admin" } : u
      )
    );
  };

  const handleRemoverAdmin = (id: number) => {
    setUsuarios(
      usuarios.map((u) =>
        u.usuIntId === id ? { ...u, usuStrTipo: "Coordenador" } : u
      )
    );
  };

  const handleDesativarUsuario = (id: number) => {
    setUsuarios(usuarios.filter((u) => u.usuIntId !== id));
  };

  const candidaturasFiltradas =
    filtroStatus === "Todas"
      ? candidaturas
      : candidaturas.filter(
          (c) => c.canStrStatus.toLowerCase() === filtroStatus.toLowerCase()
        );

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F1F7EE] py-10 font-sans flex items-center justify-center">
        <p className="text-gray-600">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F1F7EE] py-10 font-sans">
      <div className="w-11/12 max-w-6xl mx-auto">

        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
            Painel de Administrador
          </h1>
          <p className="text-gray-600 font-light">
            Gerencie candidaturas e perfis de utilizadores
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          <div className="lg:col-span-2">
            <TabsNavegacao abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

            <div className="mt-6">
              {abaAtiva === "candidaturas" && (
                <>
                  <div className="mb-4 flex gap-2">
                    {["Todas", "Ativa", "Desativada"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFiltroStatus(status)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          filtroStatus === status
                            ? "bg-[#782E29] text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  {candidaturasFiltradas.length > 0 ? (
                    candidaturasFiltradas.map((candidatura) => (
                      <CardCandidatura
                        key={candidatura.canIntId}
                        candidatura={candidatura}
                        onDesativar={handleDesativarCandidatura}
                        onAtivar={handleAtivarCandidatura}
                      />
                    ))
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-600">
                      Nenhuma candidatura encontrada
                    </div>
                  )}
                </>
              )}

              {abaAtiva === "usuarios" && (
                <>
                  {usuarios.length > 0 ? (
                    usuarios.map((usuario) => (
                      <CardUsuario
                        key={usuario.usuIntId}
                        usuario={usuario}
                        onPromover={handlePromoverAdmin}
                        onRemoverAdmin={handleRemoverAdmin}
                        onDesativar={handleDesativarUsuario}
                      />
                    ))
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-600">
                      Nenhum utilizador encontrado
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <EstatisticasGerais stats={stats} />
            <UtilizadoresPorTipo stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
