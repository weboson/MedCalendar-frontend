//! Авторизация  
// видео помощник: https://youtu.be/-zQrK0mfZFY?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=1691
// тип ответа при "войти" существующего user (client\src\services\auth.service.ts)
// response: id, email и token (server\src\auth\auth.service.ts)
export interface IUser {
    id: number
    email: string
    token: string
}


export interface IUserData { // for client\src\serviсes\auth.service.ts
    email: string
    password: string
}

export interface IResponseUse {
    id: string
    email: string
    // password: string // убрал и отклика в server\src\user\user.service.ts
    createdAtUser: string
    updateAtUser: string
}

// ожидается отклик от сервера при регистрации
export interface IResponseUserData {
    token: string
    userData: IResponseUse
}


//! MealSchedule (график питания)
//Exmle: {"weekday":[8,22],"weekend":[9,22]}  
// ввод в форме
export interface IMealSchedule {
    weekday: string
    weekend: string
}

// ответ с сервера
export interface IMealscheduleRepository {
    id: number
    weekday: string
    weekend: string
    user: { id: number }
    relations: { user: boolean }
    createDateMeal: string
    updateDateMeal: string
}

//! Recipe (рецепты)
//Exmle: {"title":"урсосан ","independently":false,
// "interval":{"hour":0,"minute":0},
// "position":"before","action":"eating","quantity":3,"unitTime":"day",
// "duration":{"index":1,"title":"months"},
// "start":"2024-08-22T10:59:20.844Z"} 
export interface IInterval {
    hour: number
    minute: number
}

export interface IDuration {
    index: number
    title: 'days' | 'weeks' | 'months' | 'years'
}

export interface Iuser {
    id: number
}

// ввод в форму
export interface IRecipe {
    title: string
    independently: boolean
    interval: IInterval
    position: string
    action: string
    quantity: number
    unitTime: string
    duration: IDuration
    start: string
}

// ответ с сервера
export interface IRecipeRepository {
    title: string
    independently: boolean
    interval: IInterval
    position: string
    action: string
    quantity: number
    unitTime: string
    duration: IDuration
    start: string
    user: Iuser
    id: number
    createDateRecipe: string
    updateDateRecipe: string
}