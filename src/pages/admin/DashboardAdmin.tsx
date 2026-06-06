/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";

type Aba = "candidaturas" | "usuarios";
type Papel = "Empreendedor" | "Coordenador" | "Grupo" | "Admin";

// ── Modais ────────────────────────────────────────────────────────────────────

const ModalConfirmar: React.FC<{
  titulo: string;
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
  cor?: string;
  labelConfirmar?: string;
}> = ({ titulo, mensagem, onConfirmar, onCancelar, cor = "#782E29", labelConfirmar = "Confirmar" }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-3">{titulo}</h2>
      <p className="text-gray-600 text-sm mb-6">{mensagem}</p>
      <div className="flex gap-3">
        <button onClick={onConfirmar}
          style={{ backgroundColor: cor }}
          className="flex-1 text-white py-3 rounded-md font-medium transition cursor-pointer hover:opacity-90">
          {labelConfirmar}
        </button>
        <button onClick={onCancelar}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer">
          Cancelar
        </button>
      </div>
    </div>
  </div>
);

const ModalAlterarPapel: React.FC<{
  usuario: any;
  onConfirmar: (papel: Papel) => void;
  onCancelar: () => void;
}> = ({ usuario, onConfirmar, onCancelar }) => {
  const [papel, setPapel] = useState<Papel>(usuario.usuStrTipo);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Alterar Papel</h2>
        <p className="text-gray-500 text-sm mb-6">Usuário: <strong>{usuario.usuStrNome}</strong></p>
        <select value={papel} onChange={e => setPapel(e.target.value as Papel)}
          className="w-full p-2 border border-gray-300 rounded-md mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]">
          {(['Empreendedor', 'Coordenador', 'Grupo', 'Admin'] as Papel[]).map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <div className="flex gap-3">
          <button onClick={() => onConfirmar(papel)}
            className="flex-1 bg-[#782E29] text-white py-3 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer">
            Confirmar
          </button>
          <button onClick={onCancelar}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer">
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
    usuStrNome: '', usuStrEmail: '', usuStrSenha: '', usuStrTipo: 'Empreendedor' as Papel,
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Criar Usuário</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input type="text" value={form.usuStrNome}
              onChange={e => setForm(f => ({ ...f, usuStrNome: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={form.usuStrEmail}
              onChange={e => setForm(f => ({ ...f, usuStrEmail: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" value={form.usuStrSenha}
              onChange={e => setForm(f => ({ ...f, usuStrSenha: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select value={form.usuStrTipo}
              onChange={e => setForm(f => ({ ...f, usuStrTipo: e.target.value as Papel }))}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#782E29] bg-white">
              {(['Empreendedor', 'Coordenador', 'Grupo', 'Admin'] as Papel[]).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => onConfirmar(form)} disabled={enviando ||
            !form.usuStrNome || !form.usuStrEmail || !form.usuStrSenha}
            className="flex-1 bg-[#782E29] text-white py-3 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            {enviando ? 'Criando...' : 'Criar Usuário'}
          </button>
          <button onClick={onCancelar}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer">
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
      case 'aceita': case 'ativa': return 'bg-green-100 text-green-700 border-green-300';
      case 'recusada': case 'desativada': return 'bg-red-100 text-red-700 border-red-300';
      case 'pendente': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'desistente': return 'bg-gray-100 text-gray-600 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };
  return (
    <span className={`border text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide ${cor()}`}>
      {status}
    </span>
  );
};

const Tag = ({ text }: { text: string }) => (
  <span className="bg-[#021926] text-[#DAD4C8] text-[10px] px-3 py-1 rounded-full font-medium">{text}</span>
);

const TabsNavegacao = ({ aba, setAba }: { aba: Aba; setAba: (a: Aba) => void }) => (
  <div className="flex w-full bg-[#5F747F] rounded-md p-1 shadow-sm">
    {([['candidaturas', 'Candidaturas'], ['usuarios', 'Usuários']] as const).map(([key, label]) => (
      <button key={key} onClick={() => setAba(key)}
        className={`flex-1 py-2 rounded-md font-medium text-sm transition-all cursor-pointer ${
          aba === key ? 'bg-white text-[#021926] shadow-sm' : 'text-[#DAD4C8] hover:bg-white/10'
        }`}>
        {label}
      </button>
    ))}
  </div>
);

const CardCandidatura = ({ candidatura, onExcluir }: {
  candidatura: any;
  onExcluir: (id: number, nome: string) => void;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="admin-text text-lg font-bold text-[#021926]">
          {candidatura.demanda?.demStrNome ?? '—'}
        </h3>
        <p className="text-gray-500 text-xs">ID: {candidatura.canIntId}</p>
      </div>
      <StatusBadge status={candidatura.canStrStatus} />
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Grupo</p>
        <p className="font-medium text-gray-900">{candidatura.grupo?.gruStrNome ?? '—'}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Aprovação</p>
        <p className="font-medium text-gray-900">{candidatura.canBoolAprovacao ? '✓ Aprovada' : '✗ Pendente'}</p>
      </div>
    </div>
    <button onClick={() => onExcluir(candidatura.canIntId, candidatura.demanda?.demStrNome ?? 'esta candidatura')}
      className="px-4 py-1.5 border border-[#782E29] text-[#782E29] rounded text-sm font-medium hover:bg-red-50 transition cursor-pointer">
      Remover
    </button>
  </div>
);

const CardUsuario = ({ usuario, onAlterarPapel, onDesativar }: {
  usuario: any;
  onAlterarPapel: (u: any) => void;
  onDesativar: (id: number, nome: string) => void;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="admin-text text-lg font-bold text-[#021926]">{usuario.usuStrNome}</h3>
        <p className="text-gray-500 text-sm">{usuario.usuStrEmail}</p>
      </div>
      <Tag text={usuario.usuStrTipo} />
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">ID</p>
        <p className="font-medium text-gray-900">{usuario.usuIntId}</p>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Status</p>
        <p className="font-medium text-gray-900">{usuario.usuBoolAtivo ? 'Ativo' : 'Inativo'}</p>
      </div>
    </div>
    <div className="flex gap-2 flex-wrap">
      <button onClick={() => onAlterarPapel(usuario)}
        className="px-4 py-1.5 border border-[#5F747F] text-[#5F747F] rounded text-sm font-medium hover:bg-[#5F747F] hover:text-white transition cursor-pointer">
        Alterar Papel
      </button>
      <button onClick={() => onDesativar(usuario.usuIntId, usuario.usuStrNome)}
        className="px-4 py-1.5 border border-[#782E29] text-[#782E29] rounded text-sm font-medium hover:bg-red-50 transition cursor-pointer">
        Desativar
      </button>
    </div>
  </div>
);

const EstatisticasGerais = ({ stats }: { stats: any }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
    <h3 className="admin-text text-lg font-bold text-[#021926] mb-2">Estatísticas Gerais</h3>
    {[
      { label: 'Total de Usuários', valor: stats?.totalUsuarios ?? 0, cor: 'bg-[#5F747F] text-[#DAD4C8]' },
      { label: 'Total de Demandas', valor: stats?.totalDemandas ?? 0, cor: 'bg-[#021926] text-[#DAD4C8]' },
      { label: 'Total de Projetos', valor: stats?.totalProjetos ?? 0, cor: 'bg-[#40531D] text-white' },
      { label: 'Administradores', valor: stats?.totalAdmins ?? 0, cor: 'bg-[#782E29] text-[#DAD4C8]' },
    ].map(({ label, valor, cor }) => (
      <div key={label} className={`w-full py-2 ${cor} rounded flex justify-between px-4 font-medium text-sm`}>
        <span>{label}</span><span className="font-bold">{valor}</span>
      </div>
    ))}
  </div>
);

// ── Componente principal ──────────────────────────────────────────────────────

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [aba, setAba] = useState<Aba>('candidaturas');
  const [candidaturas, setCandidaturas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todas');

  // Modais
  const [modalExcluirCan, setModalExcluirCan] = useState<{ id: number; nome: string } | null>(null);
  const [modalDesativarUsu, setModalDesativarUsu] = useState<{ id: number; nome: string } | null>(null);
  const [modalAlterarPapel, setModalAlterarPapel] = useState<any | null>(null);
  const [modalCriarUsuario, setModalCriarUsuario] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function carregar() {
    try {
      const [cands, usus, statsData] = await Promise.all([
        api.get('/candidaturas').then(r => r.data),
        api.get('/usuarios').then(r => r.data),
        api.get('/admin/estatisticas').then(r => r.data),
      ]);
      setCandidaturas(cands);
      setUsuarios(usus);
      setStats(statsData);
    } catch {
      setErro('Não foi possível carregar o painel.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function handleExcluirCandidatura() {
    if (!modalExcluirCan) return;
    try {
      await api.delete(`/candidaturas/${modalExcluirCan.id}`);
      setCandidaturas(prev => prev.filter(c => c.canIntId !== modalExcluirCan.id));
      setModalExcluirCan(null);
    } catch (error: any) {
      alert(error?.response?.data?.message ?? 'Erro ao remover candidatura.');
    }
  }

  async function handleDesativarUsuario() {
    if (!modalDesativarUsu) return;
    try {
      await api.delete(`/admin/usuario/${modalDesativarUsu.id}`);
      setUsuarios(prev => prev.map(u =>
        u.usuIntId === modalDesativarUsu.id ? { ...u, usuBoolAtivo: false } : u
      ));
      setModalDesativarUsu(null);
    } catch (error: any) {
      alert(error?.response?.data?.message ?? 'Erro ao desativar usuário.');
    }
  }

  async function handleAlterarPapel(papel: Papel) {
    if (!modalAlterarPapel) return;
    try {
      await api.put(`/admin/usuario/${modalAlterarPapel.usuIntId}/papel`, { novoPapel: papel });
      setUsuarios(prev => prev.map(u =>
        u.usuIntId === modalAlterarPapel.usuIntId ? { ...u, usuStrTipo: papel } : u
      ));
      setModalAlterarPapel(null);
    } catch (error: any) {
      alert(error?.response?.data?.message ?? 'Erro ao alterar papel.');
    }
  }

  async function handleCriarUsuario(dto: any) {
    setEnviando(true);
    try {
      await api.post('/usuarios', {
        usuStrNome: dto.usuStrNome,
        usuStrEmail: dto.usuStrEmail,
        usuStrSenha: dto.usuStrSenha,
        usuStrTipo: dto.usuStrTipo,
      });
      setModalCriarUsuario(false);
      await carregar();
    } catch (error: any) {
      const m = error?.response?.data?.message;
      alert(Array.isArray(m) ? m.join('\n') : m ?? 'Erro ao criar usuário.');
    } finally {
      setEnviando(false);
    }
  }

  const candidaturasFiltradas = filtroStatus === 'Todas'
    ? candidaturas
    : candidaturas.filter(c => c.canStrStatus?.toLowerCase() === filtroStatus.toLowerCase());

  if (loading) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-gray-500">Carregando painel...</p>
    </div>
  );

  if (erro) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-red-600">{erro}</p>
    </div>
  );

  return (
    <>
      {modalExcluirCan && (
        <ModalConfirmar
          titulo="Remover Candidatura"
          mensagem={`Tem certeza que deseja remover a candidatura para "${modalExcluirCan.nome}"? Esta ação não pode ser desfeita.`}
          onConfirmar={handleExcluirCandidatura}
          onCancelar={() => setModalExcluirCan(null)}
          labelConfirmar="Remover"
        />
      )}
      {modalDesativarUsu && (
        <ModalConfirmar
          titulo="Desativar Usuário"
          mensagem={`Desativar o usuário "${modalDesativarUsu.nome}"? Ele perderá acesso à plataforma.`}
          onConfirmar={handleDesativarUsuario}
          onCancelar={() => setModalDesativarUsu(null)}
          labelConfirmar="Desativar"
        />
      )}
      {modalAlterarPapel && (
        <ModalAlterarPapel
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

      <div className="w-full min-h-screen bg-[#F1F7EE] py-10 font-sans">
        <div className="w-11/12 max-w-6xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
              Painel de Administrador
            </h1>
            <p className="text-gray-600 font-light">Gerencie usuários, candidaturas e conteúdo da plataforma</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <TabsNavegacao aba={aba} setAba={setAba} />

              {aba === 'candidaturas' && (
                <div>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {['Todas', 'Pendente', 'Aceita', 'Recusada', 'Desistente'].map(s => (
                      <button key={s} onClick={() => setFiltroStatus(s)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition cursor-pointer ${
                          filtroStatus === s
                            ? 'bg-[#782E29] text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                        }`}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {candidaturasFiltradas.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                      Nenhuma candidatura encontrada.
                    </div>
                  ) : candidaturasFiltradas.map(c => (
                    <CardCandidatura key={c.canIntId} candidatura={c}
                      onExcluir={(id, nome) => setModalExcluirCan({ id, nome })}
                    />
                  ))}
                </div>
              )}

              {aba === 'usuarios' && (
                <div>
                  {usuarios.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                      Nenhum usuário encontrado.
                    </div>
                  ) : usuarios.map(u => (
                    <CardUsuario key={u.usuIntId} usuario={u}
                      onAlterarPapel={setModalAlterarPapel}
                      onDesativar={(id, nome) => setModalDesativarUsu({ id, nome })}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="admin-text text-lg font-bold text-[#021926] mb-4">Ações Rápidas</h3>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setModalCriarUsuario(true)}
                    className="w-full py-2 px-4 bg-[#782E29] text-white rounded-md text-sm font-medium hover:bg-[#6d2823] transition cursor-pointer">
                    + Criar Usuário
                  </button>
                  <button onClick={() => navigate('/cadastrar_demanda')}
                    className="w-full py-2 px-4 border border-[#5F747F] text-[#5F747F] rounded-md text-sm font-medium hover:bg-[#5F747F] hover:text-white transition cursor-pointer">
                    + Cadastrar Demanda
                  </button>
                </div>
              </div>
              <EstatisticasGerais stats={stats} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}