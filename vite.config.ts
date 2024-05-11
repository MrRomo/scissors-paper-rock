import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@lib': '/src/lib',
      '@providers': '/src/providers',
      '@organisms': '/src/components/organisms',
      '@molecules': '/src/components/molecules',
      '@atoms': '/src/components/atoms',
    }
  }
})
