import { useEffect, useState } from 'react';
import api from '../services/api';

export function useHealth() {
  const [health, setHealth] = useState({ loading: true, data: null, error: '' });
  useEffect(() => { let alive = true; api.get('/health').then(({ data }) => { if (alive) setHealth({ loading: false, data, error: '' }); }).catch((error) => { if (alive) setHealth({ loading: false, data: null, error: error.response?.data?.message || 'API unavailable' }); }); return () => { alive = false; }; }, []);
  return health;
}
