import { api } from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import type UsuarioLogin from '../models/UsuarioLogin';


export interface CreateUsuarioDto {
  usuStrNome: string;
  usuStrEmail: string;
  usuStrSenha: string;
  usuStrTipo: 'Empreendedor' | 'Coordenador' | 'Grupo';
}

interface JwtPayload {
  sub: number;
  username: string;
  role: 'Empreendedor' | 'Coordenador' | 'Grupo' | 'Admin';
}

export async function loginUsuario(email: string, senha: string): Promise<UsuarioLogin> {
  const response = await api.post('/auth/login', { email, senha });
  const { access_token } = response.data;
  const decoded = jwtDecode<JwtPayload>(access_token);

  return {
    email,
    senha: '',
    id: decoded.sub,
    nome: decoded.username,
    tipo: decoded.role,
    token: access_token,
  };
}

export async function cadastrarUsuario(dto: CreateUsuarioDto) {
  const payload = {
    usuStrNome: dto.usuStrNome,
    usuStrEmail: dto.usuStrEmail,
    usuStrSenha: dto.usuStrSenha,
    usuStrTipo: dto.usuStrTipo
  };
  return await api.post('/usuarios', payload).then(res => res.data);
}

export async function confirmarEmail(token: string) {
  const response = await api.get(`/usuarios/confirmar/${token}`);
  return response.data;
}

export async function getUsuarioById(id: number) {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
}

export async function updateUsuario(id: number, dto: any) {
  const response = await api.put(`/usuarios/${id}`, dto);
  return response.data;
}