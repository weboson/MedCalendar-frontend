//! Warning Marker - part 2 (array push/cleare)
// redux-toolkit - Slice 
//! массив для Warning Marker, например: 
// [true, false, false].indexOf( true ) != -1)) : 'меняю состояние на true у warningMarkerSlice на true' ? dispatch(false)
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! true - нужно принять ЛС / false (по-умолчанию) - нет
// тип объекта
interface StateProp {
  arr: Array<boolean | null>;
}
// по-умолчанию (пустой массив, ни fasle ни true)
const initialState: StateProp  = {
  arr: []
} 

export const arrWarningSlice = createSlice({
    name: 'arrWarning',
    initialState,
    //! использую два редюсера (метода), привер и доков: https://redux-toolkit.js.org/tutorials/typescript
    reducers: {
      arrPushWarning: (state, action) => { // добавляет в массив, true/fasle
          state.arr = [...state.arr, ...action.payload]
        },
      arrWarningCleare: (state) => { // очищает массив (типа сброс состояния)
        state.arr.length = 0
        },        
    },
  })
  
  export const { arrPushWarning, arrWarningCleare } = arrWarningSlice.actions
  
  // type RootState идёт из store.tx и возращается редюсер warningMarkerReducer (также из store.tx), который имеет значение этого Slice
  export const selectCount = (state: RootState) => state.arrWarning.arr
  
  export default arrWarningSlice.reducer