import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('garbajodi_token'));
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('garbajodi_user')); } catch { return null; } });
  const save = (data) => { localStorage.setItem('garbajodi_token', data.token); localStorage.setItem('garbajodi_user', JSON.stringify(data.user)); setToken(data.token); setUser(data.user); };
  const login = async (credentials) => save((await api.post('/auth/login', credentials)).data);
  const signup = async (details) => (await api.post('/auth/register', details)).data;
  const logout = () => { localStorage.removeItem('garbajodi_token'); localStorage.removeItem('garbajodi_user'); setToken(null); setUser(null); };
  const value = useMemo(() => ({ user, token, login, signup, logout }), [user, token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
