import { api } from '../api/axios';
import { mapCoordenador } from '../mappers/coordenador.mapper';

export async function getCoordenadores() {
  const response = await api.get('/coordenadores');
  return response.data.map(mapCoordenador);
}

export async function getCoordenadorById(id: number) {
  const response = await api.get(`/coordenadores/${id}`);
  return mapCoordenador(response.data);
}

// Rotas protegidas de gerenciamento e dashboard do coordenador
export async function getDashboardCoordenador() {
  const response = await api.get('/coordenadores/dashboard');
  return response.data;
}

export async function classificarDemanda(id: number, dadosClassificacao: { semIntId: number; tags: string[] }) {
  const response = await api.put(`/coordenadores/demanda/${id}/classificar`, dadosClassificacao);
  return response.data;
}

export async function aprovarDemanda(id: number) {
  const response = await api.put(`/coordenadores/demanda/${id}/aprovar`);
  return response.data;
}

export async function gerenciarCandidaturas(dadosCandidatura: any) {
  const response = await api.put('/coordenadores/candidaturas/gerenciar', dadosCandidatura);
  return response.data;
}