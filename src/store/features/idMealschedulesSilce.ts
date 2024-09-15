// redux-toolkit - Slice 
//! id от Mealschedule
// id - получаемый (в MealscheduleForm.tsx) от отклика (response) server для последующего получения данный по id (в MealscheduleList.tsx)
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// Чтобы получить состояние данных: => const id = useAppSelector((state) => state.idMealschedules) 
// Чтобы изменить состояние данных: => const dispatch = useAppDispatch(); dispatch(readingIdMealschedules(new data))

// id графика по-умолчанию
const initialState: number  = 0 

export const idMealschedulesSilce = createSlice({
  name: 'idMealschedules',
  initialState,
  reducers: {
    readingIdMealschedules: (state, action) => (
        state = action.payload 
    )
  },
})

export const { readingIdMealschedules } = idMealschedulesSilce.actions

// тип RootState идёт из store.tx - нужно добавить в store.ts - чтобы indexSubMenu не был ошибкой
export const selectCount = (state: RootState) => state.idMealschedules

export default idMealschedulesSilce.reducer