import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite para ejecutar el frontend React.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
});
