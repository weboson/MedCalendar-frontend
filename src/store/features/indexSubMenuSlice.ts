//! Режим отображения subMenu, как в Recipes, так и в Mealschedules
// redux-toolkit - Slice (шаблон кода из документации)
// Активная (выбранная) кнопка
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! index active Submenu (по-умолчанию)
// сохраняется только цифра 0 или 1 (ведь 2 пункта в subMenu)
// если user нажал на кнопку в меню в /recipes или в /mealschedules, то сохранится в sessionStorage и восстановится после обновления страницы, иначе = 0
// сохраняется в обработчике onClick в src\components\SubMenu\SubMenu.tsx
const initialState: number = (+sessionStorage.getItem('indexSubMenu') >= 0 ) ? +sessionStorage.getItem('indexSubMenu') : 0;



export const indexSubMenuSlice = createSlice({
  name: 'indexSubMenu',
  initialState,
  reducers: {
    readingIndexSubMenu: (state, action) => (
      state = action.payload // наприме: 'Add new' (RecipeForm/MealscheduleForm) или 'Recipes'/'Mealschedules' (из src\components\SubMenu\SubMenu.tsx)
    )
  },
})

export const { readingIndexSubMenu } = indexSubMenuSlice.actions
// тип RootState идёт из store.tx - нужно добавить в store.ts - чтобы indexSubMenu не был ошибкой
export const selectCount = (state: RootState) => state.indexSubMenu

export default indexSubMenuSlice.reducer