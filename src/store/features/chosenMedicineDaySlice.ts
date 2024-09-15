// redux-toolkit - Slice 
//! отображение данных в Recipte окне по измненяющему id лекарства (RecipeWindow)
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// id лекарства, по которому (в RecipeWindow) будет поиск 
const initialState: number   = 0 // по-умолчанию

export const chosenMedicineDaySlice = createSlice({
  name: 'chosenMedicine',
  initialState,
  reducers: {
    chosenMedicineID: (state, action) => (
        state = action.payload 
    )
  },
})

export const { chosenMedicineID } = chosenMedicineDaySlice.actions

// тип RootState идёт из store.tx и возращается редюсер popupDataReducer (также из store.tx), который имеет значение этого Slice
export const selectCount = (state: RootState) => state.popupData

export default chosenMedicineDaySlice.reducer