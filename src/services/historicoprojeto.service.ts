import { api } from '../api/axios';
import { mapHistoricoProjeto } from '../mappers/historicoprojeto.mapper';

export type StatusProjeto =
  | 'Planejamento'
  | 'Em Desenvolvimento'
  | 'Bloqueado'
  | 'Entregue'
  | 'Concluido';

export async function getHistoricos() {
  const response = await api.get('/historicos-projeto');
  return response.data.map(mapHistoricoProjeto);
}

export async function getHistoricoById(id: number) {
  const response = await api.get(`/historicos-projeto/${id}`);
  return mapHistoricoProjeto(response.data);
}

export async function criarEntrega(dto: {
  hspStrDesc: string;
  hspStrLinkProjeto: string;
  hspStrStatus: StatusProjeto;
  proIntId: number;
}) {
  const response = await api.post('/historicos-projeto', dto);
  return mapHistoricoProjeto(response.data);
}

export async function updateHistorico(id: number, dto: {
  hspStrDesc?: string;
  hspStrLinkProjeto?: string;
  hspStrStatus?: StatusProjeto;
  proIntId?: number;
}) {
  const response = await api.put(`/historicos-projeto/${id}`, dto);
  return mapHistoricoProjeto(response.data);
}

export async function deletarHistorico(id: number) {
  await api.delete(`/historicos-projeto/${id}`);
}