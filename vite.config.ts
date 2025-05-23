import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        register: 'src/pages/register.html',
        login: 'src/pages/login.html',
        dashboard: 'src/pages/dashboard.html',
      },
    },
  },
});
