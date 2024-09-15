//! Авторизирован или нет: т.е. вошел (в системе) ли user или нет в свой аккаунт. Таймкод: https://youtu.be/-zQrK0mfZFY?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=3382
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IUser } from '../../types/types'
// Чтобы получить состояние данных: => const isAuth = useAppSelector((state) => state.user.isAuth) 
// Чтобы изменить состояние данных: => const dispatch = useAppDispatch(); dispatch(login(new data))

interface IUserState {
  user: IUser | null
  isAuth: boolean
}

// по-умолчанию НЕ "авторизирован"
const initialState: IUserState = {
  user: null,
  isAuth: false  
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      login: (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
        state.isAuth = true
      },
      logout: (state) => { 
        state.isAuth = false
        state.user = null
      },
    },
  })
  
  export const { login, logout } = userSlice.actions
  // тип RootState идёт из store.tx - нужно добавить в store.ts - чтобы isAuth не был ошибкой
  export const selectCount = (state: RootState) => state.user
  
  export default userSlice.reducer