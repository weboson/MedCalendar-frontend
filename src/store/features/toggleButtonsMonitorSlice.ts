// при нажатии на кнопки <, today, > будет срабатывать "датчик" на новую подгрузку данных (Mealschedules: графика питания) с сервера на Day (DayGrid.tsx), Week
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// Чтобы получить состояние данных: => const toggle = useAppSelector((state) => state.toggle) 
// Чтобы изменить состояние данных: => const dispatch = useAppDispatch(); dispatch(readingToggle(new data))

// переключатель: true/false (хотя посути не важно, главное изменение)
const initialState: boolean = false // по-умолчанию (не время для приёма )


export const toggleButtonsMonitorSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
      readingToggle: (state, action) => (
          state = action.payload // exemple: false или true
      )
    },
  })
  
  export const { readingToggle } = toggleButtonsMonitorSlice.actions
  
  // type RootState идёт из store.tx и возращается редюсер warningMarkerReducer (также из store.tx), который имеет значение этого Slice
  export const selectCount = (state: RootState) => state.toggle
  
  export default toggleButtonsMonitorSlice.reducer