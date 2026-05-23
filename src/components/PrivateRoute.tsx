import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


// Extrair o tipo facilita a manutenção caso você adicione novos papéis no futuro
type Role = 'Empreendedor' | 'Coordenador' | 'Grupo' | 'Admin';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: Role[];
}

export default function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const { isAuthenticated, usuario, isLoading } = useAuth();

  // 1. Segura a renderização enquanto verifica o localStorage
  if (isLoading) {
    // Retorne nulo ou um componente de Spinner/Loading global aqui
    return <div>Carregando...</div>;
  }

  // 2. Se terminou de carregar e não está logado, manda pro login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Verificação de papéis (Roles)
  // O uso de usuario?.tipo protege caso 'usuario' seja null
  if (roles && usuario?.tipo) {
    // Tipamos o usuario.tipo como Role para evitar o uso de 'as any'
    const temPermissao = roles.includes(usuario.tipo as Role);
    
    if (!temPermissao) {
      // Retorna para a home se não tiver o nível de acesso necessário
      return <Navigate to="/" replace />;
    }
  }

  // Se passou por tudo, renderiza a rota
  return <>{children}</>;
}