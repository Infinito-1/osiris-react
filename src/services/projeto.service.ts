import { api } from '../api/axios';
import { mapProjeto } from '../mappers/projeto.mapper';

export async function getProjetos() {
  const response = await api.get('/projetos');
  return response.data.map(mapProjeto);
}

export async function getProjetoById(id: number) {
  const response = await api.get(`/projetos/${id}`);
  return mapProjeto(response.data);
}

export async function criarProjeto(dto: {
  proStrDescricao: string;
  proDateInicio: string;
  canIntId: number;
}) {
  const response = await api.post('/projetos', dto);
  return mapProjeto(response.data);
}

export async function updateProjeto(id: number, dto: {
  proStrDescricao?: string;
  proDateInicio?: string;
  canIntId?: number;
}) {
  const response = await api.put(`/projetos/${id}`, dto);
  return mapProjeto(response.data);
}

export async function encerrarProjeto(id: number) {
  await api.delete(`/projetos/${id}`);
}