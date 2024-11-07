// All Slices. For Redux-Toolkit
import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './features/modesDateSlice'
import selectedModeMonitorReducer from './features/selectedModeMonitorSlice'
import popupDataReducer from './features/popupDataSlice'
import readingMarkerWarning from './features/markerWarningSlice'
import arrWarningReducer from './features/arrWarningSlice'
import chosenMedicineReducer from './features/chosenMedicineDaySlice' // for Day (recipte window)
import indexSubMenuReducer from './features/indexSubMenuSlice' // for Day (recipte window)
import userReducer from './features/userSlice' // авторизирован или нет
import toggleReducer from './features/toggleButtonsMonitorSlice'



export const store = configureStore({
  reducer: {
    // for Header
    menu: menuReducer, // режим меню
    // for Monitor
    selectedModeMonitor: selectedModeMonitorReducer, // режим отображения заголовка (месяц, неделя и т.д.) шапки (Monitor) 
    indexSubMenu: indexSubMenuReducer, // для подменю на страницах: /resipes и /mealschedules
    // for WeekGrid
    popupData: popupDataReducer, // содержание MyPopup.tsx
    markerWarning: readingMarkerWarning, // Warning part 1: push array, exemple: [true, false, fasle]. Rendering each: HelperWarningMarker.tsx
    arrWarning: arrWarningReducer, // Warning part 2: indicator (true/false or on/off). Rendering: WeekGrid.tsx
    chosenMedicine: chosenMedicineReducer, // содержание Recipte окна для Day (обработчик в DayUsingMedicines.tsx)
    user: userReducer, // авторизирован ли user или нет
    // перключатель (реагирующий <, today, >) для подгрузки новых данных для DayGrid, Week
    toggle: toggleReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

