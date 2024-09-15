// redux-toolkit - Slice 
//! отображение данных в MyPopup.tsx по измненяющему id лекарства
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// Чтобы получить состояние данных: => const isAuth = useAppSelector((state) => state.popupData) 
// Чтобы изменить состояние данных: => const dispatch = useAppDispatch(); dispatch(readingPopupData(new data))

// id лекарства, по которому (в popup) будет поиск (arr.find((arrItem) => arrItem.id == id)) по массиву лекарств
const initialState: number   = 0 // по-умолчанию

export const popupDataSlice = createSlice({
  name: 'popupData',
  initialState,
  reducers: {
    readingPopupData: (state, action) => (
        state = action.payload 
    )
  },
})

export const { readingPopupData } = popupDataSlice.actions

// тип RootState идёт из store.tx и возращается редюсер popupDataReducer (также из store.tx), который имеет значение этого Slice
export const selectCount = (state: RootState) => state.popupData

export default popupDataSlice.reducer