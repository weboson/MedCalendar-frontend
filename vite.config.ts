import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080, //! указал свой порт для deploy on GitHub Page
    proxy: {
      '/': {
        target: 'https://weboson.github.io/MedCalendar-frontend:8080'
      },
    }
  },
  
})
