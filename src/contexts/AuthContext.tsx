import { type ReactNode, createContext, useState, useContext } from 'react';
import type UsuarioLogin from '../models/UsuarioLogin';
import { loginUsuario } from '../services/usuario.service';
import { api } from '../api/axios';

interface AuthContextProps {
  usuario: UsuarioLogin;
  isLoading: boolean;
  isAuthenticated: boolean;
  handleLogin(email: string, senha: string): Promise<void>;
  handleLogout(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const usuarioInicial: UsuarioLogin = {
  id: 0,
  nome: '',
  email: '',
  senha: '',
  tipo: '',
  token: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>(usuarioInicial);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!usuario.token;

  async function handleLogin(email: string, senha: string) {
    setIsLoading(true);
    try {
      const dados = await loginUsuario(email, senha);
      setUsuario(dados);
      // injeta o token em todas as requisições futuras
      api.defaults.headers.common['Authorization'] = `Bearer ${dados.token}`;
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUsuario(usuarioInicial);
    delete api.defaults.headers.common['Authorization'];
  }

  return (
    <AuthContext.Provider value={{ usuario, isLoading, isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook de conveniência
export function useAuth() {
  return useContext(AuthContext);
}