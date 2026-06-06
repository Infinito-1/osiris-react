import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardCoordenador, aprovarDemanda, rejeitarDemanda } from "../../services/coordenador.service";
import { getProjetos, desativarProjetoCoordenador, reativarProjetoCoordenador, getTodosProjetos } from "../../services/projeto.service";

type Aba = 'pendentes' | 'ativas' | 'rejeitadas';

interface DemandaItem {
  id: number;
  nome: string;
  descricao: string;
  semestreRecomendado: string | null;
  areaTecnica: string | null;
  tipos: string[];
  empreendedor: { nome: string; empresa: string } | null;
  grupos: string[];
}

interface Metricas {
  demandasPendentesDeAprovacao: number;
  demandasPublicadasGaleria: number;
  totalDeCandidaturasSubmetidas: number;
  demandasRejeitadas: number;
}

interface DashboardDados {
  coordenador: string;
  nome: string;
  email: string;
  metricas: Metricas;
  demandas: {
    pendentes: DemandaItem[];
    ativas: DemandaItem[];
    rejeitadas: DemandaItem[];
  };
}

interface Projeto {
  id: number;
  descricao: string;
  dataInicio: string;
  ativo: boolean;
  desativadoCoordenador: boolean;
  motivoDesativacao: string | null;
  candidatura: {
    grupo: { nome: string; lider: string } | null;
    demanda: { nome: string } | null;
  } | null;
}

// ── Modal de Rejeição ─────────────────────────────────────────────────────────

const ModalRejeicao = ({ nomeDemanda, onConfirmar, onCancelar, enviando }: {
  nomeDemanda: string;
  onConfirmar: (motivo: string) => void;
  onCancelar: () => void;
  enviando: boolean;
}) => {
  const [motivo, setMotivo] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Rejeitar Demanda</h2>
        <p className="text-gray-500 text-sm mb-6">Rejeitando: <strong>{nomeDemanda}</strong></p>
        <div className="flex flex-col space-y-1 mb-6">
          <label className="text-sm font-medium text-gray-700">
            Motivo <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <textarea
            value={motivo} onChange={e => setMotivo(e.target.value)} rows={4}
            placeholder="Explique o motivo para o empreendedor..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] resize-none text-sm"
          />
        </div>
        <div className="flex gap-3">
          <button onClick={() => onConfirmar(motivo)} disabled={enviando}
            className="flex-1 bg-red-600 text-white py-3 rounded-md font-medium hover:bg-red-700 transition cursor-pointer active:scale-95 disabled:opacity-50">
            {enviando ? 'Rejeitando...' : 'Confirmar Rejeição'}
          </button>
          <button onClick={onCancelar} disabled={enviando}
            className="flex-1 bg-gray-600 text-white py-3 rounded-md font-medium hover:bg-gray-700 transition cursor-pointer">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Modal de Desativação de Projeto ───────────────────────────────────────────

const ModalDesativarProjeto = ({ nomeProjeto, onConfirmar, onCancelar, enviando }: {
  nomeProjeto: string;
  onConfirmar: (motivo: string) => void;
  onCancelar: () => void;
  enviando: boolean;
}) => {
  const [motivo, setMotivo] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Desativar Projeto</h2>
        <p className="text-gray-500 text-sm mb-6">Desativando: <strong>{nomeProjeto}</strong></p>
        <div className="flex flex-col space-y-1 mb-6">
          <label className="text-sm font-medium text-gray-700">
            Motivo <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <textarea
            value={motivo} onChange={e => setMotivo(e.target.value)} rows={4}
            placeholder="Explique o motivo para o grupo..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] resize-none text-sm"
          />
        </div>
        <div className="flex gap-3">
          <button onClick={() => onConfirmar(motivo)} disabled={enviando}
            className="flex-1 bg-[#782E29] text-white py-3 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer active:scale-95 disabled:opacity-50">
            {enviando ? 'Desativando...' : 'Confirmar Desativação'}
          </button>
          <button onClick={onCancelar} disabled={enviando}
            className="flex-1 bg-gray-600 text-white py-3 rounded-md font-medium hover:bg-gray-700 transition cursor-pointer">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Subcomponentes ────────────────────────────────────────────────────────────

const Tag = ({ text }: { text: string }) => (
  <span className="bg-[#021926] text-white text-[10px] px-3 py-1 rounded-full font-medium">{text}</span>
);

const TabsNavegacao = ({ aba, setAba }: { aba: Aba; setAba: (a: Aba) => void }) => {
  const tabs: { key: Aba; label: string }[] = [
    { key: 'pendentes', label: 'Demandas Pendentes' },
    { key: 'ativas', label: 'Em Andamento' },
    { key: 'rejeitadas', label: 'Rejeitadas' },
  ];
  return (
    <div className="flex w-full bg-[#4f534e] rounded-md p-1 shadow-sm">
      {tabs.map(({ key, label }) => (
        <button key={key} onClick={() => setAba(key)}
          className={`flex-1 py-2 text-sm font-medium rounded transition-all cursor-pointer ${
            aba === key ? 'bg-white text-gray-900 shadow-sm' : 'text-white hover:bg-white/10'
          }`}>
          {label}
        </button>
      ))}
    </div>
  );
};

const CardDemanda = ({ demanda, aba, onIniciarRejeicao }: {
  demanda: DemandaItem;
  aba: Aba;
  onIniciarRejeicao: (id: number, nome: string) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900">{demanda.nome}</h3>
        <span className={`text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wide ${
          aba === 'pendentes' ? 'border border-gray-300 text-gray-600 bg-white'
          : aba === 'ativas' ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
        }`}>
          {aba === 'pendentes' ? 'Pendente' : aba === 'ativas' ? 'Aprovada' : 'Rejeitada'}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4">{demanda.descricao}</p>
      {demanda.empreendedor && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Empreendedor</p>
            <p className="font-medium text-gray-900 text-sm">{demanda.empreendedor.nome}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Empresa</p>
            <p className="font-medium text-gray-900 text-sm">{demanda.empreendedor.empresa}</p>
          </div>
        </div>
      )}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {demanda.tipos.map((t, i) => <Tag key={i} text={t} />)}
        {demanda.semestreRecomendado && <Tag text={`${demanda.semestreRecomendado}º Sem`} />}
        {demanda.areaTecnica && <Tag text={demanda.areaTecnica} />}
      </div>
      {aba === 'ativas' && demanda.grupos.length > 0 && (
        <p className="text-gray-800 text-sm font-medium mb-4">
          Grupos: <span className="font-normal text-gray-600">{demanda.grupos.join(', ')}</span>
        </p>
      )}
      {aba === 'pendentes' && (
        <div className="flex gap-3">
          <button
            className="flex-1 bg-[#782e29] hover:bg-[#5e231f] cursor-pointer text-white py-2.5 rounded-md font-medium text-sm transition"
            onClick={() => navigate(`/classificar_demanda?id=${demanda.id}`)}>
            Classificar e Aprovar
          </button>
          <button
            className="flex-1 bg-white border border-red-400 text-red-600 hover:bg-red-50 cursor-pointer py-2.5 rounded-md font-medium text-sm transition"
            onClick={() => onIniciarRejeicao(demanda.id, demanda.nome)}>
            Rejeitar
          </button>
        </div>
      )}
    </div>
  );
};

const CardProjeto = ({ projeto, onDesativar, onReativar }: {
  projeto: Projeto;
  onDesativar: (id: number, nome: string) => void;
  onReativar: (id: number) => void;
}) => (
  <div className={`bg-white border rounded-lg p-5 shadow-sm mb-3 ${!projeto.ativo ? 'opacity-80 border-gray-200' : 'border-gray-300'}`}>
    <div className="flex justify-between items-start mb-1">
      <h4 className="font-semibold text-gray-800">{projeto.candidatura?.demanda?.nome ?? projeto.descricao}</h4>
      <span className={`text-[10px] px-3 py-1 rounded-full font-medium uppercase ${
        projeto.ativo ? 'bg-[#c6d8e2] text-[#5F747F]' : 'bg-red-100 text-red-700'
      }`}>
        {projeto.ativo ? 'Ativo' : 'Desativado'}
      </span>
    </div>
    {projeto.candidatura?.grupo && (
      <p className="text-sm text-gray-600 mb-1">
        Grupo: <span className="font-medium">{projeto.candidatura.grupo.nome}</span>
        {' '}— Líder: {projeto.candidatura.grupo.lider}
      </p>
    )}
    <p className="text-xs text-gray-500 mb-3">
      Início: {new Date(projeto.dataInicio).toLocaleDateString('pt-BR')}
    </p>
    {projeto.motivoDesativacao && (
      <div className="bg-red-50 border border-red-200 rounded-md p-2 mb-3 text-xs text-red-700">
        <strong>Motivo:</strong> {projeto.motivoDesativacao}
      </div>
    )}
    <div className="flex gap-2">
      {projeto.ativo ? (
        <button
          onClick={() => onDesativar(projeto.id, projeto.candidatura?.demanda?.nome ?? projeto.descricao)}
          className="px-4 py-1.5 border border-[#782E29] text-[#782E29] rounded text-sm font-medium hover:bg-red-50 transition cursor-pointer">
          Desativar
        </button>
      ) : projeto.desativadoCoordenador && (
        <button
          onClick={() => onReativar(projeto.id)}
          className="px-4 py-1.5 border border-[#40531D] text-[#40531D] rounded text-sm font-medium hover:bg-green-50 transition cursor-pointer">
          Reativar
        </button>
      )}
    </div>
  </div>
);

const MinhasInformacoes = ({ dados }: { dados: DashboardDados }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Minhas Informações</h3>
      <div className="space-y-4 text-sm">
        <div><p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Nome</p><p className="font-medium text-gray-900">{dados.nome}</p></div>
        <div><p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Email</p><p className="font-medium text-gray-900">{dados.email}</p></div>
        <div><p className="text-gray-500 text-xs uppercase font-semibold mb-0.5">Curso</p><p className="font-medium text-gray-900">{dados.coordenador}</p></div>
      </div>
      <button onClick={() => navigate('/coordenador/editar')}
        className="w-full mt-4 border border-gray-300 text-gray-700 py-1.5 rounded text-xs font-medium hover:bg-[#782E29] hover:text-white transition cursor-pointer">
        Editar Perfil
      </button>
    </div>
  );
};

const EstatisticasGerais = ({ metricas }: { metricas: Metricas }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
    <h3 className="text-lg font-bold text-gray-900 mb-2">Estatísticas Gerais</h3>
    <div className="w-full py-2 bg-[#BC9595] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
      <span>Demandas Pendentes</span><span>{metricas.demandasPendentesDeAprovacao}</span>
    </div>
    <div className="w-full py-2 bg-[#7D888F] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
      <span>Em Andamento</span><span>{metricas.demandasPublicadasGaleria}</span>
    </div>
    <div className="w-full py-2 bg-[#A6ACB1] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
      <span>Rejeitadas</span><span>{metricas.demandasRejeitadas}</span>
    </div>
    <div className="w-full py-2 bg-[#c6d8e2] text-gray-900 rounded flex justify-between px-4 font-medium text-sm">
      <span>Candidaturas</span><span>{metricas.totalDeCandidaturasSubmetidas}</span>
    </div>
  </div>
);

// ── Componente principal ──────────────────────────────────────────────────────

export default function DashboardCoordenador() {
  const [dashboard, setDashboard] = useState<DashboardDados | null>(null);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [aba, setAba] = useState<Aba>('pendentes');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [modalRejeicao, setModalRejeicao] = useState<{ id: number; nome: string } | null>(null);
  const [modalProjeto, setModalProjeto] = useState<{ id: number; nome: string } | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [mostrarProjetos, setMostrarProjetos] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardCoordenador(), getTodosProjetos()])
      .then(([dash, projs]) => { setDashboard(dash); setProjetos(projs); })
      .catch(() => setErro('Não foi possível carregar o dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleAprovar(id: number) {
    try {
      await aprovarDemanda(id);
      setDashboard(prev => {
        if (!prev) return prev;
        const demanda = prev.demandas.pendentes.find(d => d.id === id);
        if (!demanda) return prev;
        return {
          ...prev,
          demandas: {
            ...prev.demandas,
            pendentes: prev.demandas.pendentes.filter(d => d.id !== id),
            ativas: [demanda, ...prev.demandas.ativas],
          },
          metricas: {
            ...prev.metricas,
            demandasPendentesDeAprovacao: prev.metricas.demandasPendentesDeAprovacao - 1,
            demandasPublicadasGaleria: prev.metricas.demandasPublicadasGaleria + 1,
          },
        };
      });
    } catch (error: any) {
      const m = error?.response?.data?.message;
      alert(Array.isArray(m) ? m.join('\n') : m ?? 'Erro ao aprovar.');
    }
  }

  async function handleConfirmarRejeicao(motivo: string) {
    if (!modalRejeicao) return;
    setEnviando(true);
    try {
      await rejeitarDemanda(modalRejeicao.id, motivo);
      setDashboard(prev => {
        if (!prev) return prev;
        const demanda = prev.demandas.pendentes.find(d => d.id === modalRejeicao.id);
        if (!demanda) return prev;
        return {
          ...prev,
          demandas: {
            ...prev.demandas,
            pendentes: prev.demandas.pendentes.filter(d => d.id !== modalRejeicao.id),
            rejeitadas: [demanda, ...prev.demandas.rejeitadas],
          },
          metricas: {
            ...prev.metricas,
            demandasPendentesDeAprovacao: prev.metricas.demandasPendentesDeAprovacao - 1,
            demandasRejeitadas: prev.metricas.demandasRejeitadas + 1,
          },
        };
      });
      setModalRejeicao(null);
    } catch { alert('Erro ao rejeitar.'); }
    finally { setEnviando(false); }
  }

  async function handleConfirmarDesativarProjeto(motivo: string) {
    if (!modalProjeto) return;
    setEnviando(true);
    try {
      const atualizado = await desativarProjetoCoordenador(modalProjeto.id, motivo);
      setProjetos(prev => prev.map(p => p.id === modalProjeto.id ? atualizado : p));
      setModalProjeto(null);
    } catch { alert('Erro ao desativar projeto.'); }
    finally { setEnviando(false); }
  }

  async function handleReativarProjeto(id: number) {
    try {
      const atualizado = await reativarProjetoCoordenador(id);
      setProjetos(prev => prev.map(p => p.id === id ? atualizado : p));
    } catch { alert('Erro ao reativar projeto.'); }
  }

  if (loading) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-gray-500">Carregando dashboard...</p>
    </div>
  );

  if (erro || !dashboard) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-red-600">{erro || 'Erro ao carregar dados.'}</p>
    </div>
  );

  const demandasDaAba = dashboard.demandas[aba];

  return (
    <>
      {modalRejeicao && (
        <ModalRejeicao
          nomeDemanda={modalRejeicao.nome}
          onConfirmar={handleConfirmarRejeicao}
          onCancelar={() => setModalRejeicao(null)}
          enviando={enviando}
        />
      )}
      {modalProjeto && (
        <ModalDesativarProjeto
          nomeProjeto={modalProjeto.nome}
          onConfirmar={handleConfirmarDesativarProjeto}
          onCancelar={() => setModalProjeto(null)}
          enviando={enviando}
        />
      )}

      <div className="w-full min-h-screen bg-[#F1F7EE] py-10 font-sans">
        <div className="w-11/12 max-w-6xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#021926] mb-2">
              Dashboard do Coordenador
            </h1>
            <p className="text-gray-600 font-light">Gerencie demandas e acompanhe projetos do curso</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              {/* Demandas */}
              <div>
                <TabsNavegacao aba={aba} setAba={setAba} />
                <div className="mt-6">
                  {demandasDaAba.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 shadow-sm">
                      Nenhuma demanda nesta categoria.
                    </div>
                  ) : (
                    demandasDaAba.map(d => (
                      <CardDemanda
                        key={d.id} demanda={d} aba={aba}
                        onIniciarRejeicao={(id, nome) => setModalRejeicao({ id, nome })}
                      />
                    ))
                  )}
                </div>
              </div>

            </div>

            <div className="space-y-6">
              <MinhasInformacoes dados={dashboard} />
              <EstatisticasGerais metricas={dashboard.metricas} />
                            {/* Projetos */}
              <div>
                <button
                  onClick={() => setMostrarProjetos(p => !p)}
                  className="w-full flex justify-between items-center bg-white border border-gray-200 rounded-lg px-6 py-4 shadow-sm hover:bg-gray-50 transition cursor-pointer"
                >
                  <span className="font-semibold text-gray-800">Projetos ({projetos.length})</span>
                  <span className="text-gray-400 text-sm">{mostrarProjetos ? '▲ Recolher' : '▼ Expandir'}</span>
                </button>
                {mostrarProjetos && (
                  <div className="mt-3">
                    {projetos.length === 0 ? (
                      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500 shadow-sm">
                        Nenhum projeto cadastrado ainda.
                      </div>
                    ) : (
                      projetos.map(p => (
                        <CardProjeto
                          key={p.id} projeto={p}
                          onDesativar={(id, nome) => setModalProjeto({ id, nome })}
                          onReativar={handleReativarProjeto}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}