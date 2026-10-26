import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Enables React's automatic JSX transform and Fast Refresh.
export default defineConfig({
  plugins: [react()]
});
