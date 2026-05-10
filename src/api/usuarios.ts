import { api } from './axios';

export interface CreateUsuarioDto {
  usuStrNome: string;
  usuStrEmail: string;
  usuStrSenha: string;
  usuStrTelefone?: string;
  usuStrTipo: 'Empreendedor' | 'Coordenador' | 'Grupo';
}

export const usuariosApi = {
  criar: (dto: CreateUsuarioDto) =>
    api.post('/usuarios', dto).then(r => r.data),
};