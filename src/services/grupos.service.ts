import { api } from './api';

export async function getGrupos() {
  const response = await api.get('/grupos');

  return response.data;
}

export async function getGruposByNome(grupos: string) {
  const response = await api.get(
    `/grupos/${encodeURIComponent(grupos)}`
  );

  return response.data;
}