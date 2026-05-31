import { type ReactNode, useState, useEffect } from 'react';
import { AuthContext } from './AuthContextDefinition';
import type UsuarioLogin from '../models/UsuarioLogin';
import { api } from '../api/axios';
import { loginUsuario } from '../services/usuario.service';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioLogin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const usuarioSalvo = localStorage.getItem('@App:usuario');
  const tokenSalvo = localStorage.getItem('@App:token');
  if (usuarioSalvo) {
    setUsuario(JSON.parse(usuarioSalvo));
  }
  if (tokenSalvo) {
    api.defaults.headers.common['Authorization'] = `Bearer ${tokenSalvo}`; // ← isso precisa estar aqui
  }
  setIsLoading(false);
}, []);

  async function handleLogin(email: string, senha: string) {
    setIsLoading(true);
    try {
      const dados = await loginUsuario(email, senha);
      const { senha: _, ...dadosSemSenha } = dados; 
      const usuarioFinal = dadosSemSenha as UsuarioLogin;
      setUsuario(usuarioFinal);
      api.defaults.headers.common['Authorization'] = `Bearer ${dados.token}`;
      localStorage.setItem('@App:usuario', JSON.stringify(usuarioFinal));
      localStorage.setItem('@App:token', dados.token);
      return usuarioFinal;
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUsuario(null);
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('@App:usuario');
    localStorage.removeItem('@App:token');
  }

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      isLoading, 
      isAuthenticated: !!usuario?.token, 
      handleLogin, 
      handleLogout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}