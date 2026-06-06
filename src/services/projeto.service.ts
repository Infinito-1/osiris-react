import { api } from '../api/axios';
import { mapProjeto } from '../mappers/projeto.mapper';

export async function getProjetos() {
  const response = await api.get('/projetos');
  return response.data.map(mapProjeto);
}

export async function getTodosProjetos() {
  const response = await api.get('/projetos/todosStatus');
  return response.data.map(mapProjeto);
}

// projetos do grupo logado
export async function getMeusProjetos() {
  const response = await api.get('/projetos/meus');
  return response.data.map(mapProjeto);
}

export async function getProjetoById(id: number) {
  const response = await api.get(`/projetos/${id}`);
  return mapProjeto(response.data);
}

export async function criarProjeto(dto: {
  proStrDescricao: string;
  proDateInicio: string;
  canIntId?: number;
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

// grupo toggle ativo/inativo do próprio projeto
export async function toggleProjeto(id: number) {
  const response = await api.put(`/projetos/${id}/toggle`);
  return mapProjeto(response.data);
}

// coordenador desativa com motivo opcional
export async function desativarProjetoCoordenador(id: number, motivo?: string) {
  const response = await api.put(`/projetos/${id}/desativar`, { motivo });
  return mapProjeto(response.data);
}

// coordenador reativa após revisão
export async function reativarProjetoCoordenador(id: number) {
  const response = await api.put(`/projetos/${id}/reativar`);
  return mapProjeto(response.data);
}

export async function encerrarProjeto(id: number) {
  await api.delete(`/projetos/${id}`);
}