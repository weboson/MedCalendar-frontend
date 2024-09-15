//! Режим отображения зависит от кнопки
// redux-toolkit - Slice (шаблон кода из документации)
// Активная (выбранная) кнопка режима отомбражения календаря: month, year, week...
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! index active menu (по-умолчанию)
// const initialState: number = +sessionStorage.getItem('IndexMenu') || 0; // old option
// если страница /recipes, то активная кнопка (белая) будет 4-я, то есть "recipes", если '/' (home) то 0 ("Day")
// или если user уже нажимал кнопку меню, то она запомнится (в sessionStorage) и воссоздатся.
// Способ react-router-dom: let location = useLocation(); location.pathname, подробнее: https://reactrouter.com/en/main/hooks/use-location#locationkey
//* по-умолчанию 0(mode day), если кликнуть по меню, то запониматся sessionStorag (связь: Home.tsx,modesDateClice.ts, Header.tsx, dataMenu) 
const initialState: number = (sessionStorage.getItem('IndexMenu')) ? (sessionStorage.getItem('IndexMenu')) : 0;



export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    readingMenu: (state, action) => (
      state = action.payload // наприме: {id: 3, title: 'Month', format: 'MMMM'} (из dataMenu.ts)
    )
  },
})

export const { readingMenu } = menuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.menu

export default menuSlice.reducer