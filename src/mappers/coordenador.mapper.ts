// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapCoordenador(c: any) {
  if (!c) return null;

  return {
    id: c.cooIntId,
    curso: c.cooStrCurso,
    // Trata o relacionamento com o usuário vindo do OneToOne
    usuario: c.usuario ? {
      id: c.usuario.usuIntId,
      nome: c.usuario.usuStrNome,
      email: c.usuario.usuStrEmail,
    } : null,
  };
}