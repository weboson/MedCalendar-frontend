// redux-toolkit - Slice (шаблон кода из документации)
// режим отображения заголовка в Monitor: "November 2023" (режим отображения Month.tsx), "2023" (Year)
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! по-умолчанию
const initialState: number = 0; // режим отображения заголовка в Monitor: "November 2023" (режим отображения Month.tsx), "2023" (Year)

export const selectedModeMonitorSlice = createSlice({
  name: 'selectedModeMonitor',
  initialState,
  reducers: {
    selectedMode: (state, action) => (
        state = action.payload
    )
  },
})

export const { selectedMode } = selectedModeMonitorSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.selectedModeMonitor

export default selectedModeMonitorSlice.reducer