import { api } from '../api/axios';
import { mapDemanda } from '../mappers/demanda.mapper';

// ── Públicas ──────────────────────────────────────────────────────────────────

export async function getGaleriaDemandas() {
  const response = await api.get('/demandas/galeria');
  return response.data.map(mapDemanda);
}

export async function getDemandaById(id: number) {
  const response = await api.get(`/demandas/${id}`);
  return mapDemanda(response.data);
}

// ── Coordenador / Admin ───────────────────────────────────────────────────────

export async function getAllDemandas() {
  const response = await api.get('/demandas');
  return response.data.map(mapDemanda);
}

// ── Empreendedor ──────────────────────────────────────────────────────────────

export async function criarDemanda(dto: {
  demStrNome: string;
  demStrDescricao: string;
  demBoolAceitaMudancaTipo: boolean;
  empIntId: number;
  tipStrNomes?: string[];
}) {
  const response = await api.post('/demandas', {
    ...dto,
    demBoolAceitacao: false,
  });
  return mapDemanda(response.data);
}

export async function desativarDemanda(id: number) {
  const response = await api.put(`/demandas/desativar/${id}`);
  return mapDemanda(response.data);
}

export async function deletarDemanda(id: number) {
  await api.delete(`/demandas/${id}`);
}

export async function getGaleriaDemandaOrdenada(ordem: 'ASC' | 'DESC') {
  const response = await api.get('/demandas/ordenado', { params: { ordem } });
  return response.data.map(mapDemanda);
}