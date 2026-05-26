// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapDemanda(d: any) {
  if (!d) return null;

  return {
    id: d.demIntId,
    nome: d.demStrNome,
    descricao: d.demStrDescricao,
    aceitaMudancaTipo: d.demBoolAceitaMudancaTipo,
    aceitacao: d.demBoolAceitacao,
    ativo: d.demBoolAtivo,
    dataCriacao: d.demDataCriacao,
    semestreRecomendado: d.demStrSemestreRecomendado ?? null,
    areaTecnica: d.demStrAreaTecnica ?? null,
    semestre: d.semestre?.semStrDescricao ?? null,
    tipos: d.tipo ? d.tipo.map((t: any) => t.tipStrNome) : [],
    empreendedor: d.empreendedor ? {
      id: d.empreendedor.empIntId,
      empresa: d.empreendedor.empStrEmpresa,
      usuario: d.empreendedor.usuario ? {
        id: d.empreendedor.usuario.usuIntId,
        nome: d.empreendedor.usuario.usuStrNome,
        email: d.empreendedor.usuario.usuStrEmail,
      } : null,
    } : null,
    coordenador: d.coordenador ? {
      id: d.coordenador.cooIntId,
      curso: d.coordenador.cooStrCurso,
    } : null,
  };
}