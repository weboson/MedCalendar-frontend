import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/router'
import { useAppDispatch } from './store/hooks'
import { getTokenFromLocalStorage } from './helpers/localStorage.helper'
import { toast } from 'react-toastify'
import { AuthService } from './services/auth.service'
import { login, logout } from './store/features/userSlice'
import { useEffect } from 'react'




function App() {
  const dispatch = useAppDispatch()
// чтобы при обновлении страницы авторизация не слетала 
  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()
    try {
      if(token) {
        const data = await AuthService.getProfile()

        if(data) {
          dispatch(login(data))
        } else {
          dispatch(logout())
        }
      }
    } catch (err: any) {
      const error = await err.response?.data.message; // если есть response то ...
      toast.error(error?.toString());
    }
  }
// вызывать проверку на авторизацию - при каждом обновлении станицы
  useEffect(() => {
    checkAuth()
  }, [])

  return <RouterProvider router={router}/>
}

export default App
