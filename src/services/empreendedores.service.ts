import { api } from '../api/axios';
import { mapEmpreendedor } from '../mappers/empreendedor.mapper';

export async function getEmpreendedores() {
  const response = await api.get('/empreendedores');
  return response.data.map(mapEmpreendedor);
}

export async function getEmpreendedorById(id: number) {
  const response = await api.get(`/empreendedores/${id}`);
  return mapEmpreendedor(response.data);
}

// Rotas protegidas (exigem que o interceptor do Axios injete o Bearer token)
export async function getPerfilEmpreendedor() {
  const response = await api.get('/empreendedores/perfil');
  return mapEmpreendedor(response.data);
}

export async function getDashboardEmpreendedor() {
  const response = await api.get('/empreendedores/dashboard/dados');
  return response.data; // Retorna o objeto genérico de dados do dashboard
}

export async function updateEmpreendedor(id: number, data: any) {
  const response = await api.put(`/empreendedores/${id}`, data);
  return mapEmpreendedor(response.data);
}

export async function reativarDemandaEmpreendedor(demIntId: number) {
  const response = await api.put(`/empreendedores/demandas/${demIntId}/reativar`);
  return response.data;
}