//! запросы на сервер
//* пришлось в методах create, getOne и removeOne отправлять отдельно заголовки токена: { headers: {Authorization: `Bearer ` + getTokenFromLocalStorage() || ''}}
// так как был маленький баг: описанный в доке "Pet проект 2023-2024"(Нерешенный БАГ “unauthorized”)
import { IMealSchedule, IMealscheduleRepository } from "../types/types";
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";
import { instance } from "../api/axios.api";


export const MealScheduleService = {

    // post (create)
    async create(mealschedule: IMealSchedule): Promise<IMealscheduleRepository | undefined> {

        const { data } = await instance.post<IMealscheduleRepository>('mealschedules', mealschedule, {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        }); // http://localhost:3000/api/mealschedules
        return data
    },

        //! используется (раньше использовался getOne(id), но id хранилось только на localStorage одного ПК создавший график)
    // получить все, хотя сущность график будет только один (@OneByOne: MedCalendar-backend\src\mealschedule\entities\mealschedule.entity.ts)
    // http://localhost:3000/api/mealschedules
    async getAll(): Promise<Array<IMealscheduleRepository> | undefined> { // используется в client\src\App.tsx
        const { data } = await instance.get<IMealscheduleRepository>(`mealschedules`, {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        })
        if (data) return data
    },

    // получить (по id) созданный график (относящиеся к текущему авторизированному user)
    async getOne(id: string): Promise<IMealscheduleRepository | undefined> { // используется в client\src\App.tsx
        const { data } = await instance.get<IMealscheduleRepository>(`mealschedules/mealschedule/${+id}`, {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        })
        if (data) return data
    },


    // не используется - проще удалять и создавать. (просто оставил для справки)
    async updateOne(id: string, mealschedule: IMealSchedule): Promise<IMealscheduleRepository | undefined> { 
        const { data } = await instance.patch<IMealscheduleRepository>(`mealschedules/mealschedule/${+id}`, mealschedule, {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        }); // http://localhost:3000/api/mealschedules/mealschedule/id
        return data
    },

    //удалить по id 
    async removeOne(id: string): Promise<IMealscheduleRepository | undefined> {
        const { data } = await instance.delete<IMealscheduleRepository>(`mealschedules/mealschedule/${+id}`, {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        })
        if (data) return data
    }
}