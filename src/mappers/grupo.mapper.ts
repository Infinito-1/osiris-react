export function mapGrupo(g: any) {
  return {
    id: g.gruIntId,
    nome: g.gruStrNome,
    descricao: g.gruStrDescricao,
    lider: g.usuario?.usuStrNome,
    tamanho: g.gruIntTamanho,
    membros: g.gruStrMembros,
    semestre: g.semestre?.semStrDescricao,
  };
}