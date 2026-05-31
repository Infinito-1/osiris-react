// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapEmpreendedor(e: any) {
  if (!e) return null;

  return {
    id: e.empIntId,
    empresa: e.empStrEmpresa,
    cnpj: e.empChaCnpj,
    // Trata o relacionamento com o usuário se ele vier na resposta (via eager ou relations)
    usuario: e.usuario ? {
      id: e.usuario.usuIntId,
      nome: e.usuario.usuStrNome,
      email: e.usuario.usuStrEmail,
    } : null,
  };
}