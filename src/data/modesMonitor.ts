//* массив режимов отображения заголовка в Monitor.tsx, exemple: November 2023 (режим Month), 2023 (Year) 
// used CalendarGrid
interface IModesMonitorObj {
    id: number;
    title: 'days' | 'weeks' | 'months' | 'years' | 'recipes' | 'mealschedules' | 'auth'; // for .subtract(1, 'days' | 'weeks' | etc)
    mode: string
  }
  
  interface IModesMonitor extends Array<IModesMonitorObj>{}
  
  // в данном проекте, значения менять не будем - толькот чтение по меняющемуся (active button) index. 
  // Просто учимся Rudax Toolkit)
  // mode используется в обработчиках кнопок (<, today, >) в Monitor.tsx
export const modesMonitor: IModesMonitor = [
    {id: 1, mode: 'days',title: 'days'}, 
    {id: 2,  mode: 'weeks',title: 'weeks'}, 
    {id: 3,  mode: 'months',title: 'months'}, 
    {id: 4,  mode: 'years',title: 'years'},
    {id: 5,  mode: 'days',title: 'recipes'}, // для RecipePage
    {id: 6,  mode: 'days',title: 'mealschedules'}, // для Mealschedules
    {id: 7,  mode: 'days',title: 'auth'}, // для AuthPage
  ]