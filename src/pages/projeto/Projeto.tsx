import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getProjetoById, updateProjeto } from "../../services/projeto.service";
import { useAuth } from "../../hooks/useAuth";

interface InfoFieldProps {
  label: string;
  value: string | null | undefined;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => (
  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
    <p className="text-base font-medium text-gray-800">{label}</p>
    <p className="text-base text-gray-600">{value ?? '—'}</p>
  </div>
);

interface EditarProjetoDto {
  proStrDescricao: string;
  proDateInicio: string;
}

interface pageParams extends Record<string, string> {
  id: string;
}

const Projeto: React.FC = () => {
  const { id } = useParams<pageParams>();
  const navigate = useNavigate();
  const { isAuthenticated, usuario } = useAuth();

  const [projeto, setProjeto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [editando, setEditando] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditarProjetoDto>();

  useEffect(() => {
    if (!id) return;
    getProjetoById(Number(id))
      .then(data => {
        setProjeto(data);
        reset({
          proStrDescricao: data?.descricao ?? '',
          proDateInicio: data?.dataInicio
            ? new Date(data?.dataInicio).toISOString().split('T')[0]
            : '',
        });
      })
      .catch(() => setErro('Projeto não encontrado.'))
      .finally(() => setLoading(false));
  }, [id]);

  // verifica se o grupo logado é o dono do projeto
  const ehDono =
    isAuthenticated &&
    usuario?.tipo === 'Grupo' &&
    projeto?.candidatura?.grupo?.nome === usuario?.nome;

  const mostrarBotaoInteresse =
    !isAuthenticated || usuario?.tipo === 'Grupo';

  function handleManifestarInteresse() {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/candidatura/${projeto?.candidatura?.demanda?.id}`);
  }

  const onSubmitEdicao = async (data: EditarProjetoDto) => {
    try {
      const atualizado = await updateProjeto(Number(id), {
        proStrDescricao: data.proStrDescricao,
        proDateInicio: data.proDateInicio,
      });
      setProjeto(atualizado);
      setEditando(false);
    } catch (error: any) {
      const mensagem = error?.response?.data?.message;
      alert(
        Array.isArray(mensagem)
          ? mensagem.join('\n')
          : mensagem ?? 'Erro ao atualizar projeto.'
      );
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-gray-500">Carregando projeto...</p>
    </div>
  );

  if (erro || !projeto) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F1F7EE]">
      <p className="text-red-600">{erro || 'Erro ao carregar projeto.'}</p>
    </div>
  );

  const demanda = projeto.candidatura?.demanda;
  const grupo = projeto.candidatura?.grupo;

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE] py-10">
      <header className="w-full py-8 text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">{demanda?.nome ?? '—'}</h1>
        <p className="text-lg mt-1 text-gray-600">
          {grupo?.nome ?? '—'} / {grupo?.lider ?? '—'}
        </p>
      </header>

      <div className="w-11/12 max-w-4xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">

        {/* Descrição do Projeto */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Descrição do Projeto</h2>
            {ehDono && !editando && (
              <button
                onClick={() => setEditando(true)}
                className="text-sm px-4 py-1.5 border border-[#782E29] text-[#782E29] rounded-md hover:bg-red-50 transition cursor-pointer"
              >
                Editar
              </button>
            )}
          </div>

          {editando ? (
            <form onSubmit={handleSubmit(onSubmitEdicao)} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  {...register('proStrDescricao', { required: 'Descrição obrigatória' })}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29] resize-none"
                />
                {errors.proStrDescricao && (
                  <span className="text-red-500 text-xs">{errors.proStrDescricao.message}</span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Data de início</label>
                <input
                  {...register('proDateInicio', { required: 'Data obrigatória' })}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#782E29]"
                />
                {errors.proDateInicio && (
                  <span className="text-red-500 text-xs">{errors.proDateInicio.message}</span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#782E29] text-white py-2 rounded-md font-medium hover:bg-[#6d2823] transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
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
            <p className="text-base text-gray-600 leading-relaxed">{projeto.descricao}</p>
          )}
        </section>

        {/* Detalhes */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalhes</h2>
          <div className="space-y-4">
            <InfoField
              label="Data de início:"
              value={projeto.dataInicio
                ? new Date(projeto.dataInicio).toLocaleDateString('pt-BR')
                : null}
            />
            <InfoField label="Grupo:" value={grupo?.nome} />
            <InfoField label="Líder:" value={grupo?.lider} />
            <InfoField
              label="Status:"
              value={projeto.ativo ? 'Em andamento' : 'Encerrado'}
            />
          </div>
        </section>

        {/* Botões */}
        <section className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
          {mostrarBotaoInteresse && !ehDono && (
            <button
              onClick={handleManifestarInteresse}
              className="flex-1 bg-[#782E29] text-white py-3 px-6 rounded-md text-lg font-medium transition hover:bg-[#6d2823] shadow-md cursor-pointer"
            >
              Manifestar Interesse
            </button>
          )}
          <button className="flex-1 bg-[#5F747F] text-white py-3 px-6 rounded-md text-lg font-medium transition hover:bg-[#53656e] shadow-md cursor-pointer">
            Entrar em Contato
          </button>
        </section>
      </div>
    </div>
  );
};

export default Projeto;