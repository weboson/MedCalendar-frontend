import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//! публичный IP для deploy от VPS сервера (также использую через встроенный в Vite "import.meta.env." в src\router\router.tsx и src\data\dataMenu.ts)
const SERVER_URL = process.env.SERVER_URL; // данные из .env (должен игнорится в git - нужно создавать новый .env каждый деплой)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: `${SERVER_URL}/dist/`, 
  base: SERVER_URL || '/', 
  // server: {
  //   port: 8080, // можно указать свой кастомный порт для deploy
  //   proxy: {
  //     '/': {
  //       target: 'https://weboson.github.io/MedCalendar-frontend:8080'
  //     },
  //   }
  // },
  
})
