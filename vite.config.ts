import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: '/stellar-burgers/',
  plugins: [react(), tsconfigPaths(), legacy()],
  envPrefix: ['VITE_', 'BURGER_']
});
