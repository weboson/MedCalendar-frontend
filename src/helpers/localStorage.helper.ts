//! Функции с полученим, сохранением или удалением токена в localStorage
//Видео-помощник: https://www.youtube.com/watch?v=-zQrK0mfZFY&list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=720s
// Получить токен из storage
export function getTokenFromLocalStorage(): string {
    const data = localStorage.getItem('token')
    const token:string = data ? JSON.parse(data) : ''
    
    return token;
}

// сохранить storage
export function setTokenToLocalStorage(key: string, token: string): void {
        localStorage.setItem(key, JSON.stringify(token))
    
}

// удаление токена в storage
export function removeTokenFromLocalStorage(key:string): void {
    localStorage.removeItem(key)
}