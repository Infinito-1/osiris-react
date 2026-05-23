import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: Array<'Empreendedor' | 'Coordenador' | 'Grupo' | 'Admin'>;
}

export default function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && usuario.tipo && !roles.includes(usuario.tipo as any)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}