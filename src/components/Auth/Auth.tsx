import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import ColorHeader from '../ColorHeader/ColorHeader';
import AuthForm from './AuthForm';
import Submenu from '../SubMenu/SubMenu';

const Auth: FC = () => {
    // получить состояние авторизации из ReduxTLK (файл: client\src\store\features\userSlice.ts)
    const isAuth = useAppSelector((state) => state.user.isAuth) 

  return (
    <>
      <ColorHeader
        title={(isAuth) ? 'Выйти из системы' : 'Регистрация / Войти в систему'}
        iconName={(isAuth) ? 'MdOutlineLogin' : 'MdOutlineLogout'}
      />
      {isAuth ? null : <Submenu indexItem={6} />}
      <AuthForm />
    </>
  );
};

export default Auth;
