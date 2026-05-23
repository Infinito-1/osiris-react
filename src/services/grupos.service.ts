import { mapGrupo } from '../mappers/grupo.mapper';
import { api } from '../api/axios';

export async function getGrupos() {
  const response = await api.get('/grupos');
  return response.data.map(mapGrupo);
}

export async function getGrupoById(id: number) {
  const response = await api.get(`/grupos/${id}`);
  return mapGrupo(response.data);
}

export async function getGruposByNome(nome: string) {
  const response = await api.get(`/grupos/nome/${encodeURIComponent(nome)}`);
  return response.data.map(mapGrupo);
}

export async function getGrupoPerfil() {
  const response = await api.get('/grupos/perfil/me');
  return mapGrupo(response.data);
}

export async function getGrupoDashboard() {
  const response = await api.get('/grupos/dashboard/dados');
  return response.data; // já vem formatado, não passa pelo mapper
}

export async function updateGrupo(id: number, dto: Record<string, unknown>) {
  const response = await api.put(`/grupos/${id}`, dto);
  return mapGrupo(response.data);
}

export async function candidatarGrupo(demIntId: number) {
  const response = await api.post(`/grupos/demandas/${demIntId}/candidatar`);
  return response.data;
}

export async function desistirCandidatura(canIntId: number) {
  await api.delete(`/grupos/candidaturas/${canIntId}/desistir`);
}