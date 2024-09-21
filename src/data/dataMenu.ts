//* массив пунктов меню главное страницы (/)
// used CalendarGrid.tsx
interface IModeDate {
    id: number;
    title: string;
    format: string;
    UrlParams: string
    subTitle?: string | undefined
  }
  
  interface IMenuModesDate extends Array<IModeDate>{}
  
  // в данном проекте, значения менять не будем - только чтение по меняющемся (active button) index. 
  // Просто учимся Rudax Toolkit)
export const menuModesDate: IMenuModesDate = [
    {id: 1, title: 'Day', format: 'D', UrlParams: `${import.meta.env.BASE_URL}`},  //! `${import.meta.env.BASE_URL} - это значение из "vite.config.ts" == /MedCalendar-frontend
    {id: 2, title: 'Week', format: 'WWW', UrlParams: `${import.meta.env.BASE_URL}`}, 
    {id: 3, title: 'Month', format: 'D', UrlParams: `${import.meta.env.BASE_URL}`}, 
    {id: 4, title: 'Year', format: 'YYYY', UrlParams: `${import.meta.env.BASE_URL}`},
    {id: 5, title: 'Recipes', format: '', UrlParams: `${import.meta.env.BASE_URL}/recipes`}, // страница рецептов
    {id: 6, title: 'Mealschedules', format: '', UrlParams: `${import.meta.env.BASE_URL}/mealschedules`}, // страница графика приёма пищи
    // страница авторизации и регистрации, в зависимости от авторизирован ли user или нет - надпись разная (Login или Logout)
    {id: 7, title: 'Logout', subTitle: 'Login',format: '', UrlParams: `${import.meta.env.BASE_URL}/auth`}, // страница авторизации и регистрации
  ]