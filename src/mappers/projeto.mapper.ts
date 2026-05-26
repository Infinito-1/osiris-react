// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapProjeto(p: any) {
  if (!p) return null;

  return {
    id: p.proIntId,
    descricao: p.proStrDescricao,
    dataInicio: p.proDateInicio,
    ativo: p.proBoolAtivo,
    candidatura: p.candidatura ? {
      id: p.candidatura.canIntId,
      status: p.candidatura.canStrStatus,
      aprovacao: p.candidatura.canBoolAprovacao,
      grupo: p.candidatura.grupo ? {
        id: p.candidatura.grupo.gruIntId,
        nome: p.candidatura.grupo.gruStrNome,
        lider: p.candidatura.grupo.gruStrLider,
      } : null,
      demanda: p.candidatura.demanda ? {
        id: p.candidatura.demanda.demIntId,
        nome: p.candidatura.demanda.demStrNome,
        descricao: p.candidatura.demanda.demStrDescricao,
      } : null,
    } : null,
  };
}