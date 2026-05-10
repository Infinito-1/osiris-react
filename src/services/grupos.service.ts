import { mapGrupo } from '../mappers/grupo.mapper';
import { api } from '../api/axios';

export async function getGrupos() {
  const response = await api.get('/grupos');

  return response.data.map(mapGrupo);
}

export async function getGruposByNome(grupos: string) {
  const response = await api.get(
    `/grupos/nome/${encodeURIComponent(grupos)}`
  );

  return response.data.map(mapGrupo);
}