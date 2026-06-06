// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapProjeto(p: any) {
  if (!p) return null;

  return {
    id: p.proIntId,
    descricao: p.proStrDescricao,
    dataInicio: p.proDateInicio,
    ativo: p.proBoolAtivo,
    desativadoCoordenador: p.proBoolDesativadoCoordenador ?? false,
    motivoDesativacao: p.proStrMotivoDesativacao ?? null,
    historicos: p.historicos?.map((h: any) => ({
      id: h.hspIntId,
      descricao: h.hspStrDesc,
      status: h.hspStrStatus,
      data: h.hspDateData,
      link: h.hspStrLinkProjeto ?? null,
      linkGithub: h.hspStrLinkGithub ?? null,
      linkDeploy: h.hspStrLinkDeploy ?? null,
    })) ?? [],
    candidatura: p.candidatura ? {
      id: p.candidatura.canIntId,
      status: p.candidatura.canStrStatus,
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