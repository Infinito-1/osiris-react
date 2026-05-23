export default interface UsuarioLogin {
  // campos para envio no login
  email: string;
  senha: string;
  // campos preenchidos após autenticação (decodificados do JWT)
  id: number;
  nome: string;
  tipo: 'Empreendedor' | 'Coordenador' | 'Grupo' | 'Admin' | '';
  token: string;
}