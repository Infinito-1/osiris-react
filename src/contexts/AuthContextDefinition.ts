import { createContext } from 'react';
import type UsuarioLogin from '../models/UsuarioLogin';

interface AuthContextProps {
  usuario: UsuarioLogin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  handleLogin(email: string, senha: string): Promise<void>;
  handleLogout(): void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);