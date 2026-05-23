import { api } from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import type UsuarioLogin from '../models/UsuarioLogin';

interface JwtPayload {
  sub: number;
  username: string;
  role: 'Empreendedor' | 'Coordenador' | 'Grupo' | 'Admin';
}

// ── Auth ──────────────────────────────────────────────────────────────

export async function loginUsuario(email: string, senha: string): Promise<UsuarioLogin> {
  const response = await api.post('/auth/login', { email, senha });
  const { access_token } = response.data;

  const decoded = jwtDecode<JwtPayload>(access_token);

  return {
    email,
    senha: '',
    id: decoded.sub,
    nome: decoded.username, // username no payload é o e-mail; nome vem do perfil
    tipo: decoded.role,
    token: access_token,
  };
}

// ── Usuário ───────────────────────────────────────────────────────────

export async function cadastrarUsuario(dto: Record<string, unknown>) {
  const response = await api.post('/usuarios', dto);
  return response.data;
}