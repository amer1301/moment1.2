import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true,  // Öppnar webbläsaren automatiskt vid start
  },
  build: {
    outDir: 'dist',  // Utdata-katalog för byggfiler
  },
});
