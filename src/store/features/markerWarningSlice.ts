//! indicator Warning Marker - part 1 (indicator)
// redux-toolkit - Slice 
// Чтобы получить состояние данных: => const markerWarning = useAppSelector((state) => state.markerWarning) 
//- использую в HelperWarningMarker.tsx, GridDayWithHours -> DependingEating/DependingBreakfast/DependingSupper.tsx;
// Чтобы изменить состояние данных: => const dispatch = useAppDispatch(); dispatch(readingMarkerWarning(new data)) 
// - вызывается в DependingEating.tsx, DependingBreakfast и т.д, а использую в HelperWarningMarker.tsx;
//! Warning Marker -  Предупреждающий маркер, когда текущее время совпадает с приёмом лекарства
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! true - нужно принять ЛС / false (по-умолчанию) - нет
const initialState: boolean = false // по-умолчанию (не время для приёма )


export const markerWarningSlice = createSlice({
    name: 'markerWarning',
    initialState,
    reducers: {
      readingMarkerWarning: (state, action) => (
          state = action.payload // exemple: false = true
      )
    },
  })
  
  export const { readingMarkerWarning } = markerWarningSlice.actions
  
  // type RootState идёт из store.tx и возращается редюсер warningMarkerReducer (также из store.tx), который имеет значение этого Slice
  export const selectCount = (state: RootState) => state.markerWarning
  
  export default markerWarningSlice.reducer