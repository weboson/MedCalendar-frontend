import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/MedCalendar-frontend', //! для github pages (также использую как .env для src\router\router.tsx и src\data\dataMenu.ts)
  // server: {
  //   port: 8080, // можно указать свой кастомный порт для deploy
  //   proxy: {
  //     '/': {
  //       target: 'https://weboson.github.io/MedCalendar-frontend:8080'
  //     },
  //   }
  // },
  
})
