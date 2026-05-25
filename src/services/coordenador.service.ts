import { api } from '../api/axios';
import { mapCoordenador } from '../mappers/coordenador.mapper';

export async function getDashboardCoordenador() {
  const response = await api.get('/coordenadores/dashboard');
  return response.data;
}

export async function getPerfilCoordenador(id: number) {
  const response = await api.get(`/coordenadores/${id}`);
  return mapCoordenador(response.data);
}

export async function getDemandasPendentes() {
  const response = await api.get('/demandas', {
    params: { aceitacao: false, ativo: true }
  });
  return response.data;
}

export async function classificarDemanda(id: number, dto: {
  semestre: string;
  areaTecnica: string;
  tipagem: string;
}) {
  const response = await api.put(`/coordenadores/demanda/${id}/classificar`, dto);
  return response.data;
}

export async function aprovarDemanda(id: number) {
  const response = await api.put(`/coordenadores/demanda/${id}/aprovar`);
  return response.data;
}

export async function gerenciarCandidatura(dto: {
  candidaturaId: number;
  status: 'Aceita' | 'Recusada';
}) {
  const response = await api.put('/coordenadores/candidaturas/gerenciar', dto);
  return response.data;
}