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
    {id: 1, title: 'Day', format: 'D', UrlParams: '/'}, 
    {id: 2, title: 'Week', format: 'WWW', UrlParams: '/'}, 
    {id: 3, title: 'Month', format: 'D', UrlParams: '/'}, 
    {id: 4, title: 'Year', format: 'YYYY', UrlParams: '/'},
    {id: 5, title: 'Recipes', format: '', UrlParams: '/recipes'}, // страница рецептов
    {id: 6, title: 'Mealschedules', format: '', UrlParams: '/mealschedules'}, // страница графика приёма пищи
    // страница авторизации и регистрации, в зависимости от авторизирован ли user или нет - надпись разная (Login или Logout)
    {id: 7, title: 'Logout', subTitle: 'Login',format: '', UrlParams: '/auth'}, // страница авторизации и регистрации
  ]