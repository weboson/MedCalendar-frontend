// Форма для ввода Email и Password (как для регистрации, так и для авторизации)
// Для проверки работоспособности необходимо запустить server командой npm run start:dev
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormWrappeer } from './sc_Auth';
import {
  Box,
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { MdOutlineAlternateEmail, MdOutlinePassword } from 'react-icons/md';
import { AuthService } from '../../services/auth.service';
import { IUserData } from '../../types/types';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { readingIndexSubMenu } from '../../store/features/indexSubMenuSlice';
import {
  removeTokenFromLocalStorage,
  setTokenToLocalStorage,
} from '../../helpers/localStorage.helper';
import { login, logout } from '../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';

const AuthForm: FC = () => {
  // ReduxTK
  const dispatch = useAppDispatch();
  // после входа в систему, идет переадесация на страницу (/mealschedules)
  const navigate = useNavigate();
  //* react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }, // вывод ошибки на валидацию
  } = useForm<IUserData>({
    // <IUserData> - как в примере: https://react-hook-form.com/docs/useform/handlesubmit
    mode: 'onChange', // режим реагирования на изменение
  });

  const [isLogin, SetIsLogin] = useState<boolean>(false);

  //* переключатель формы с 'регистрация' на 'войти' в зависимости от submenu ('Зарегистрироватся' на 'войти')
  const activeSubMenu = useAppSelector((state) => state.indexSubMenu); // src\store\features\modesRecipeSlice.ts
  // обработчик ссылки "Зарегистрироватся"
  const switchForm = (index: number) => {
    dispatch(readingIndexSubMenu(index)); // пункт sub menu [0, 1] (Submenu.tsx, arrSubMenu.ts, indexSubMenuSlice.ts)
    // console.log(activeSubMenu)
  };

  // получить состояние авторизации из ReduxTLK (файл: client\src\store\features\userSlice.ts)
  const isAuth = useAppSelector((state) => state.user.isAuth); //* авторизирован ли user

  //* обработчик для регистрации (логика в client\src\serviсes\auth.service.ts)
  const registrationHandler: SubmitHandler<IUserData> = async (
    data: IUserData,
  ) => {
    try {
      //   e?.preventDefault; // сброс настроек браузера по-умолчанию при отправке формы
      const response = await AuthService.registration(data);

      if (response) {
        // не стану сохранять токен при регистрации - пусть user в ворме ВОЙТИ войдет и сохраним уже токен в localstorage
        // setTokenToLocalStorage('token', response.token) // сохраним токен от server в localstorge, после регистрации
        switchForm(0); // после успешной регистрации - переход на subMenu = 'Войти'
        toast.success('Регистрация прошла успешно!');
      }
      // после регистрации: меняем isAuthSlice.ts на true, и в colorHeader изменится заголовок на 'Войти в систему' и потом вводим зарегистрируемые данные (email,pass)
      SetIsLogin(!isLogin);
    } catch (err: any) {
      const error = await err.response?.data.message; // если есть response то ...
      toast.error(error?.toString());
    }
  };

  //* обработчик для login
  const loginHandler: SubmitHandler<IUserData> = async (data: IUserData) => {
    try {
      const response = await AuthService.login(data);
      if (response) {
        dispatch(login(response));  // isAuth = true
        setTokenToLocalStorage('token', response.token); // сохраним токен от server в localstorge, при входе существующего user
        // navigate('/mealschedules');
        //window.location.reload(); // кастыльное решение: обновляю страницу, так как ошибка "Unauthorized" описан в доке "Нерешенный БАГ “unauthorized”"
        toast.success('Вы вошли в систему!');
      }
      // после регистрации: меняем isAuthSlice.ts на true, и в colorHeader изменится заголовок на 'Войти в систему' и потом вводим зарегистрируемые данные (email,pass)
    } catch (err: any) {
      const error = err.response?.data.message; // если есть response то ...
      toast.error(error.toString());
    }
  };

  //* выйти
  const logoutHandler = async () => {
    dispatch(logout());
    // удалим токен, иначе приложение не выходит из системы
    removeTokenFromLocalStorage('token');
    toast.success('Вы вышли из системы!');
  };

  return (
    <FormWrappeer>
      {isAuth ? (
        //! ВЫЙТИ (Logout)
        <form onSubmit={handleSubmit(logoutHandler)} action="">
          <Box component="section">
            <Typography
              id="titleEmail"
              variant="h2"
              component="h2"
              margin="normal"
              sx={{
                textAlign: 'center',
                fontSize: '2.5em',
                color: '#6f6e6e',
                margin: '1%',
              }}
            >
              Выйти
            </Typography>
            <Button
              style={{ margin: '3px 0', width: '30%', textAlign: 'center' }}
              variant="contained"
              type="submit"
            >
              Выйти
            </Button>
          </Box>
        </form>
      ) : // 1-й пункт sub menu "Войти"
      activeSubMenu == 0 ? (
        //! ВОЙТИ (Login)
        <form onSubmit={handleSubmit(loginHandler)} action="">
          <Box component="section">
            {/* //! Email */}
            <Typography
              id="titleEmail"
              variant="h2"
              component="h2"
              margin="normal"
              sx={{
                textAlign: 'center',
                fontSize: '2.5em',
                color: '#6f6e6e',
                margin: '1%',
              }}
            >
              Войти
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontSize: '1.2em',
                color: '#6f6e6e',
                fontWeight: '550',
                float: 'left',
              }}
            >
              Введите Email:
            </Typography>
            <TextField
              defaultValue={'demo@mail.ru'} //! для демо
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineAlternateEmail />
                  </InputAdornment>
                ),
              }}
              color="success"
              // fullWidth // полный размер (эквивалентно width: 100%)
              sx={{
                fontSize: '2px',
                width: '30%',
                textAlign: 'center',
              }} // при 100% и padding: 2%  - "label" сдвигается.
              label={
                errors?.email ? 'Пока не валидный Email' : 'Валидный Email'
              }
              error={!!errors?.email}
              // от react-form-hook
              {...register('email', {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, // валидатор на Email (Регулярные выражение взял с интернета)
              })}
              type="text"
              name="email"
              placeholder="name@post.com"
              helperText="Введите Email"
              required
            />

            {/* //! Password */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontSize: '1.2em',
                color: '#6f6e6e',
                fontWeight: '550',
                float: 'left',
              }}
            >
              Введите пароль:
            </Typography>

            <TextField
              defaultValue={'demo12345A$'} //! для демо
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlinePassword />
                  </InputAdornment>
                ),
              }}
              color="success"
              // fullWidth // полный размер (эквивалентно width: 100%)
              sx={{
                fontSize: '2px',
                width: '30%',
                textAlign: 'center',
              }} // при 100% и padding: 2%  - "label" сдвигается.
              label={errors?.password ? 'Слишком простой пароль' : 'Password'}
              error={!!errors?.password}
              // от react-form-hook
              {...register('password', {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, // валидатор на Password (Регулярные выражение взял с интернета: https://sky.pro/wiki/javascript/sozdanie-regulyarnogo-vyrazheniya-dlya-parolya-v-java-script/)
              })}
              type="text"
              name="password"
              placeholder="Например: 12345Yy$"
              helperText="Введите пароль"
              required
            />

            {/* //! кнопка "отправить" */}
            <Button
              style={{ margin: '1% 0', width: '30%', textAlign: 'center' }}
              variant="contained"
              type="submit"
              disabled={errors?.email ? true : false} // если Email не валидный
            >
              Войти
            </Button>
            {/*//! преход на "РЕГИСТАРИЦИЮ" */}
            <Link
              onClick={() => switchForm(1)}
              variant="h6"
              component="h3"
              sx={{
                fontSize: '1.6em',
                fontWeight: '400',
                margin: '0 2%',
                cursor: 'pointer',
              }}
            >
              Зарегестрироватся
            </Link>
          </Box>
        </form>
      ) : (
        //  2-й пункт sub menu "Зарегистрироватся"
        //! Зарегистрироватся (Login)
        <form onSubmit={handleSubmit(registrationHandler)} action="">
          <Box component="section">
            {/* //! Email */}
            <Typography
              id="titleEmail"
              variant="h2"
              component="h2"
              margin="normal"
              sx={{
                textAlign: 'center',
                fontSize: '2.5em',
                color: '#6f6e6e',
                margin: '1%',
              }}
            >
              Регистрация
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontSize: '1.2em',
                color: '#6f6e6e',
                fontWeight: '550',
                float: 'left',
              }}
            >
              Введите Email:
            </Typography>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineAlternateEmail />
                  </InputAdornment>
                ),
              }}
              color="success"
              // fullWidth // полный размер (эквивалентно width: 100%)
              sx={{
                fontSize: '2px',
                width: '30%',
                textAlign: 'center',
              }} // при 100% и padding: 2%  - "label" сдвигается.
              label={
                errors?.email ? 'Пока не валидный Email' : 'Валидный Email'
              }
              error={!!errors?.email}
              // от react-form-hook
              {...register('email', {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, // валидатор на Email (Регулярные выражение взял с интернета)
              })}
              type="text"
              name="email"
              placeholder="name@post.com"
              helperText="Введите Email"
              required
            />

            {/* //! Password */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontSize: '1.2em',
                color: '#6f6e6e',
                fontWeight: '550',
                float: 'left',
              }}
            >
              Введите пароль:
            </Typography>
            {/* Совет */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontSize: '1.2em',
                color: '#6f6e6e',
                fontWeight: '400',
                margin: '0 2%',
              }}
            >
              *Пароль должен содержать: <br />
              1. латинские буквы в разных регистрах, <br />
              2. цифры <br />
              3. и специальные символы <br />
            </Typography>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlinePassword />
                  </InputAdornment>
                ),
              }}
              color="success"
              // fullWidth // полный размер (эквивалентно width: 100%)
              sx={{
                fontSize: '2px',
                width: '30%',
                textAlign: 'center',
              }} // при 100% и padding: 2%  - "label" сдвигается.
              label={errors?.password ? 'Слишком простой пароль' : 'Password'}
              error={!!errors?.password}
              // от react-form-hook
              {...register('password', {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, // валидатор на Password (Регулярные выражение взял с интернета: https://sky.pro/wiki/javascript/sozdanie-regulyarnogo-vyrazheniya-dlya-parolya-v-java-script/)
              })}
              type="text"
              name="password"
              placeholder="Например: 12345Yy$"
              helperText="Введите пароль"
              required
            />

            {/* //! кнопка "отправить" */}
            <Button
              style={{ margin: '1% 0', width: '30%', textAlign: 'center' }}
              variant="contained"
              type="submit"
              disabled={errors?.email ? true : false} // если Email не валидный
            >
              Зарегистрироватся
            </Button>
            {/*//! преход на "РЕГИСТАРИЦИЮ" */}

            <Typography
              variant="h3"
              component="h3"
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                fontSize: '1.2em',
                fontWeight: '400',
              }}
            >
              Уже зарегистрированны?{' '}
              <Link
                onClick={() => switchForm(0)}
                variant="h3"
                component="h3"
                sx={{
                  fontSize: '1.2em',
                  fontWeight: '400',
                  margin: '0 4px',
                  cursor: 'pointer',
                }}
              >
                Войти
              </Link>
            </Typography>
          </Box>
        </form>
      )}
    </FormWrappeer>
  );
};

export default AuthForm;
function readingIsAuth(arg0: any): any {
  throw new Error('Function not implemented.');
}

