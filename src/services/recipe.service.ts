import { instance } from './../api/axios.api';
//! запросы на сервер
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";
import { IRecipe, IRecipeRepository } from "../types/types";

export const RecipeService = {

    // post (create)
    async create(recipe: IRecipe): Promise<IRecipeRepository | undefined> {

        const { data } = await instance.post<IRecipeRepository>('recipes', recipe, {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        }); // http://localhost:3000/api/recipes
        return data
    },

    // GetAll
    async getAll(): Promise<IRecipeRepository[]> {
        const { data } = await instance.get<IRecipeRepository[]>('recipes', {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        }); // http://localhost:3000/api/recipes
        return data;
    },

    // используется в client\src\components\CalendarGrids\Day\DayComponents\RecipeWindow\RecipeWindow.tsx
    // получить (по id) созданный рецепт (относящиеся к текущему авторизированному user)
    async getOne(id: string): Promise<IRecipeRepository | undefined> { 
        const { data } = await instance.get<IRecipeRepository>(`recipes/recipe/${+id}`, {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        })
        if (data) return data
    },

    //удалить по id 
    async removeOne(id: number): Promise<IRecipeRepository | undefined> {
        const { data } = await instance.delete<IRecipeRepository>(`recipes/recipe/${+id}`, {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        })
        if (data) return data
    }
}