// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapDemanda(g: any) {
  return {
    demanda: {
      id: g.demIntId,
      titulo: g.demStrNome,
      descricao: g.demStrDescricao,
      aceitaMudancaTipo: g.demBoolAceitaMudancaTipo,
      aceitacao: g.demBoolAceitacao,
      criacao: new Date(g.demDataCriacao),
      ativo: g.demBoolAtivo,
    },

    tipo: g.tipo.map(demandTipoMapper),

    empreendedor: {
      id: g.empreendedor.empIntId,
      empresa: g.empreendedor.empStrEmpresa,
      cnpj: g.empreendedor.empChaCnpj,
    },
    coordenador: {
      id: g.coordenador.cooIntId,
      curso: g.coordenador.cooStrCurso,
    },
  };
}

export function mapDemandaUnica(g: any) {
  const demanda = mapDemanda(g);

  demanda.demanda.semestreRecomendado = g.semestre.semIntId;

  // PLACEHOLDER
  demanda.demanda.tecnologiasRecomendadas = [
    "React",
    "Javascript",
    "HTML",
    "COLOQUE DADOS DO BACK AQUI",
  ];

  return demanda;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function demandTipoMapper(d: any) {
  return {
    id: d.tipIntId,
    nome: d.tipStrNome,
  };
}
