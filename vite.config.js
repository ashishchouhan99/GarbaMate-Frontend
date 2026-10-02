import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const configuredServerUrl = process.env.SERVER_URL || env.SERVER_URL || '';
  const productionServerUrl = /localhost:5000/i.test(configuredServerUrl)
    ? 'https://garbamate-backend-1.onrender.com/api'
    : configuredServerUrl || 'https://garbamate-backend-1.onrender.com/api';

  return {
    plugins: [react()],
    define: {
      __SERVER_URL__: JSON.stringify(mode === 'production' ? productionServerUrl : configuredServerUrl),
    },
    server: { port: 5173 },
  };
});
