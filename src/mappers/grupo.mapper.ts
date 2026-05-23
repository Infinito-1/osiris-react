export function mapGrupo(g: any) {
  if (!g) return null;

  return {
    id: g.gruIntId,
    nome: g.gruStrNome,
    descricao: g.gruStrDescricao,
    lider: g.gruStrLider,              
    ra: g.gruChaRa,
    tamanho: g.gruIntTamanho,
    membros: g.gruStrMembros,
    portfolio: g.gruStrPortfolio,
    ativo: g.gruBoolAtivo,
    semestre: g.semestre?.semStrDescricao ?? null,
    usuario: g.usuario ? {
      id: g.usuario.usuIntId,
      nome: g.usuario.usuStrNome,
      email: g.usuario.usuStrEmail,
    } : null,
  };
}