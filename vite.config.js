import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      __SERVER_URL__: JSON.stringify(env.SERVER_URL || process.env.SERVER_URL || ''),
    },
    server: { port: 5173 },
  };
});
