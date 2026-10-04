import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api';
import { toast } from '../lib/toast';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('garbamate_token'));
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('garbamate_user')); } catch { return null; } });
  const save = (data) => { localStorage.setItem('garbamate_token', data.token); localStorage.setItem('garbamate_user', JSON.stringify(data.user)); setToken(data.token); setUser(data.user); };
  const login = async (credentials) => { save((await api.post('/auth/login', credentials)).data); toast.success('Welcome back!'); };
  const signup = async (details) => (await api.post('/auth/register', details)).data;
  const logout = () => { localStorage.removeItem('garbamate_token'); localStorage.removeItem('garbamate_user'); setToken(null); setUser(null); };
  const value = useMemo(() => ({ user, token, login, signup, logout }), [user, token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
