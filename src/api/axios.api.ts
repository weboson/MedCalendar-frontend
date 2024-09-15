//базовые настройки для запросов, используется например: client\src\serviсes\auth.service.ts
//Видео-помощник: https://www.youtube.com/watch?v=-zQrK0mfZFY&list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=720s
import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";

//http://localhost:3000/api/
export const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    // timeout: 1000,
    headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
    }
  });
