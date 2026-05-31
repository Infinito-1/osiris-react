// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapHistoricoProjeto(h: any) {
  if (!h) return null;

  return {
    id: h.hspIntId,
    descricao: h.hspStrDesc,
    link: h.hspStrLinkProjeto,
    status: h.hspStrStatus,
    data: h.hspDateData,
    projeto: h.projeto ? {
      id: h.projeto.proIntId,
      descricao: h.projeto.proStrDescricao,
      dataInicio: h.projeto.proDateInicio,
      ativo: h.projeto.proBoolAtivo,
      candidatura: h.projeto.candidatura ? {
        id: h.projeto.candidatura.canIntId,
        grupo: h.projeto.candidatura.grupo?.gruStrNome ?? null,
        demanda: h.projeto.candidatura.demanda?.demStrNome ?? null,
      } : null,
    } : null,
  };
}