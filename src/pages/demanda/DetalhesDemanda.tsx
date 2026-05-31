import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getDemandaById, desativarDemanda } from "../../services/demanda.service";
import { api } from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import { getPerfilEmpreendedor } from "../../services/empreendedores.service";

interface InfoFieldProps {
  label: string;
  value: string | null | undefined;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => (
  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
    <p className="text-base font-medium text-gray-800">{label}</p>
    <p className="text-base text-gray-600">{value ?? "—"}</p>
  </div>
);

interface EditarDemandaDto {
  demStrNome: string;
  demStrDescricao: string;
  demBoolAceitaMudancaTipo: boolean;
  demBoolExibirContato: boolean;
  tipStrNomes: string;
}

interface pageParams extends Record<string, string> {
  id: string;
}

const DetalhesDemanda: React.FC = () => {
  const { id } = useParams<pageParams>();
  const navigate = useNavigate();
  const { isAuthenticated, usuario } = useAuth();
  const [searchParams] = useSearchParams();
  const [demanda, setDemanda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [editando, setEditando] = useState(false);
  const [empIntId, setEmpIntId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditarDemandaDto>();

  useEffect(() => {
    if (!id) return;
    getDemandaById(Number(id))
      .then((data) => {
        setDemanda(data);
        if (searchParams.get('editar') === 'true') setEditando(true);
        reset({
          demStrNome: data?.nome ?? "",
          demStrDescricao: data?.descricao ?? "",
          demBoolAceitaMudancaTipo: data?.aceitaMudancaTipo ?? false,
          demBoolExibirContato: data?.exibirContato ?? false,
          tipStrNomes: data?.tipos?.join(", ") ?? "",
        });
      })
      .catch(() => setErro("Demanda não encontrada."))
      .finally(() => setLoading(false));
  }, [id]);

  // busca empIntId do empreendedor logado para verificar dono
  useEffect(() => {
    if (isAuthenticated && usuario?.tipo === "Empreendedor") {
      getPerfilEmpreendedor()
        .then((p) => setEmpIntId(p?.id ?? null))
        .catch(() => setEmpIntId(null));
    }
  }, [isAuthenticated, usuario]);

  const ehDono =
    isAuthenticated &&
    usuario?.tipo === "Empreendedor" &&
    empIntId !== null &&
    demanda?.empreendedor?.id === empIntId;

  const mostrarContato =
    demanda?.exibirContato &&
    isAuthenticated &&
    usuario?.tipo === "Grupo";

  const onSubmitEdicao = async (data: EditarDemandaDto) => {
    try {
      const response = await api.put(`/demandas/${id}`, {
        demStrNome: data.demStrNome,
        demStrDescricao: data.demStrDescricao,
        demBoolAceitaMudancaTipo: data.demBoolAceitaMudancaTipo,
        demBoolExibirContato: data.demBoolExibirContato,
        tipStrNomes: data.tipStrNomes
          ? data.tipStrNomes.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        empIntId: empIntId ?? undefined,
      });
      setDemanda((prev: any) => ({
        ...prev,
        nome: response.data.demStrNome,
        descricao: response.data.demStrDescricao,
        aceitaMudancaTipo: response.data.demBoolAceitaMudancaTipo,
        exibirContato: response.data.demBoolExibirContato,
      }));
      setEditando(false);
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join("\n")
          : mensagem ?? "Erro ao atualizar demanda."
      );
    }
  };

  async function handleDesativar() {
    if (!confirm("Deseja desativar esta demanda?")) return;
    try {
      await desativarDemanda(Number(id));
      navigate("/empreendedor");
    } catch {
      alert("Erro ao desativar demanda.");
    }
  }

  const mostrarBotaoInteresse =
    !isAuthenticated || usuario?.tipo === "Grupo";

  function handleManifestarInteresse() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(`/candidatura/${id}`);
  }

  if (loading)
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
        <p className="text-gray-500">Carregando demanda...</p>
      </div>
    );

  if (erro || !demanda)
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
        <p className="text-red-600">{erro || "Erro ao carregar demanda."}</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <header className="w-full py-8 text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">{demanda.nome}</h1>
        <p className="text-lg mt-1 text-gray-600">
          {demanda.empreendedor?.empresa ?? "—"}
          {demanda.tipos?.length > 0 && ` / ${demanda.tipos[0]}`}
        </p>
      </header>

      <div className="w-11/12 max-w-4xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">

        {/* Descrição */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Descrição</h2>
            {ehDono && !editando && (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/cadastrar_demanda?id=${id}`)}
                  className="text-sm px-4 py-1.5 border border-[#782E29] text-[#782E29] rounded-md hover:bg-red-50 transition cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={handleDesativar}
                  className="text-sm px-4 py-1.5 border border-gray-400 text-gray-600 rounded-md hover:bg-gray-100 transition cursor-pointer"
                >
                  Desativar
                </button>
              </div>
            )}
          </div>

          {editando ? (
            <form onSubmit={handleSubmit(onSubmitEdicao)} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Nome</label>
                <input
                  {...register("demStrNome", { required: "Nome obrigatório" })}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                />
                {errors.demStrNome && (
                  <span className="text-red-500 text-xs">{errors.demStrNome.message}</span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  {...register("demStrDescricao", { required: "Descrição obrigatória" })}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] resize-none"
                />
                {errors.demStrDescricao && (
                  <span className="text-red-500 text-xs">{errors.demStrDescricao.message}</span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Tipos (separe por vírgula)</label>
                <input
                  {...register("tipStrNomes")}
                  type="text"
                  placeholder="Ex: Site, Aplicativo Mobile"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  {...register("demBoolAceitaMudancaTipo")}
                  id="aceitaMudanca"
                  type="checkbox"
                  className="w-4 h-4 accent-[#782E29] cursor-pointer"
                />
                <label htmlFor="aceitaMudanca" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Aceita proposta de mudança no tipo?
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  {...register("demBoolExibirContato")}
                  id="exibirContato"
                  type="checkbox"
                  className="w-4 h-4 accent-[#782E29] cursor-pointer"
                />
                <label htmlFor="exibirContato" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Autorizar exibição do meu contato para grupos interessados
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#782E29] text-white py-2 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <p className="text-base text-gray-600 leading-relaxed">{demanda.descricao}</p>
          )}
        </section>

        {/* Detalhes técnicos */}
        {!editando && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalhes</h2>
            <div className="space-y-4">
              {demanda.semestreRecomendado && (
                <InfoField
                  label="Semestre mínimo recomendado:"
                  value={`A partir do ${demanda.semestreRecomendado}º semestre`}
                />
              )}
              {demanda.areaTecnica && (
                <InfoField label="Área técnica / Requisitos:" value={demanda.areaTecnica} />
              )}
              {demanda.tipos?.length > 0 && (
                <InfoField label="Tipos:" value={demanda.tipos.join(", ")} />
              )}
              <InfoField
                label="Aceita mudança de tipo:"
                value={demanda.aceitaMudancaTipo ? "Sim" : "Não"}
              />
            </div>
          </section>
        )}

        {/* Bloco de contato — visível apenas para grupos quando autorizado */}
        {mostrarContato && !editando && (
          <section className="mb-8 bg-[#F1F7EE] border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contato do Empreendedor</h2>
            <div className="space-y-4">
              <InfoField label="Nome:" value={demanda.empreendedor?.usuario?.nome} />
              <InfoField label="Empresa:" value={demanda.empreendedor?.empresa} />
              <InfoField label="E-mail:" value={demanda.empreendedor?.usuario?.email} />
            </div>
          </section>
        )}

        {/* Botões */}
        {!editando && (
          <section className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
            {mostrarBotaoInteresse && (
              <button
                onClick={handleManifestarInteresse}
                className="flex-1 bg-[#782E29] text-white py-3 px-6 rounded-md text-lg font-medium transition hover:bg-[#6d2823] shadow-md cursor-pointer"
              >
                Manifestar Interesse
              </button>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default DetalhesDemanda;