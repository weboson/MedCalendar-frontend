//* Локальная База Данных - график питания "mealSchedule", пример: {"weekday":[8,22],"weekend":[9,22]}
//! mealSchedule - график питания - первый и последний приём пищи
// график ОДИН на ОДНОГО user


interface IMealSchedule {
  weekday: number[]
  weekend: number[]
}

export const mealSchedule: IMealSchedule = {
  weekday: [8, 22], 
  weekend: [9, 22]
}


