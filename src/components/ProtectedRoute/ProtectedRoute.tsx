//! Компонент-wrapper который, в зависимости от авторизирован ли user или нет - показывает/скрывает страницы (/recipes и /mealschedules)
// Суть: если user не вошел в систему, то и графики с рецептами у него нет (и некому добавлять новые) - поэтому нужно убрать из доступа эти страницы (/recipes и /mealschedules) от неавторизованного user? используя новый компонент с условием показа его children.
import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import ColorHeader from '../ColorHeader/ColorHeader';

interface IProps {
  children: JSX.Element;
}

const ProtectedRoute: FC<IProps> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <>
          <ColorHeader title="Войдите в систему" iconName={'MdOutlineLogout'} />
          <div style={{textAlign: 'center'}}>
            <h1>Чтобы увидеть данную страницу, нужно - зарегистрироватся и/или войти в систему.</h1>
          </div>
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
