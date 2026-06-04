import { api } from '../api/axios';
import { mapCandidatura } from '../mappers/candidatura.mapper';

export async function getCandidaturas() {
  const response = await api.get('/candidaturas');
  return response.data.map(mapCandidatura);
}

export async function getCandidaturaById(id: number) {
  const response = await api.get(`/candidaturas/${id}`);
  return mapCandidatura(response.data);
}

// grupo envia apenas demIntId — backend resolve gruIntId pelo JWT
export async function criarCandidatura(demIntId: number, grupoId: number) {
  const response = await api.post('/candidaturas', {
    demIntId,
    gruIntId: grupoId,
    canStrStatus: 'Pendente',
    canBoolAprovacao: false,
  });
  return mapCandidatura(response.data);
}

export async function desistirCandidatura(id: number) {
  const response = await api.patch(`/candidaturas/${id}/desistir`);
  return mapCandidatura(response.data);
}

// coordenador aceita ou recusa
export async function atualizarStatusCandidatura(id: number, status: 'Aceita' | 'Recusada') {
  const response = await api.put(`/candidaturas/${id}`, {
    canStrStatus: status,
    canBoolAprovacao: status === 'Aceita',
  });
  return mapCandidatura(response.data);
}