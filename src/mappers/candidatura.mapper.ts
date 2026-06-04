// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapCandidatura(c: any) {
  if (!c) return null;

  return {
    id: c.canIntId,
    status: c.canStrStatus,
    aprovacao: c.canBoolAprovacao,
    demanda: c.demanda ? {
      id: c.demanda.demIntId,
      nome: c.demanda.demStrNome,
      descricao: c.demanda.demStrDescricao,
    } : null,
    grupo: c.grupo ? {
      id: c.grupo.gruIntId,
      nome: c.grupo.gruStrNome,
      lider: c.grupo.gruStrLider,
    } : null,
    coordenador: c.coordenador ? {
      id: c.coordenador.cooIntId,
      curso: c.coordenador.cooStrCurso,
    } : null,
  };
}