import { FC, memo } from 'react';
import { FaCalendarPlus, FaSearch } from 'react-icons/fa';
import {
  DivWrapper,
  TitleCalendar,
  StyleIconPlus,
  TitleCalendarWrapper,
  ModeDateButton,
  FormRouterSearch,
  InputSearch,
  InputButtonSearch,
  ModeDateButtonAuth,
  ButtonsWrapperMenu,
  ButtonWrapperAuth,
  RightNavMenu,
  CenterNavMenu,
} from './stylesHeader/sc_calendarHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { readingMenu } from '../../store/features/modesDateSlice';
import { menuModesDate } from '../../data/dataMenu';
// Recipes - будет отдельной страницей
// link от React-router-dom  - для НЕ ПЕРЕЗАГРУЖАЕМЫХ страницу  ССЫЛОК
import { Link, NavLink } from 'react-router-dom';

const Headers: FC = () => {
  // залогинены или нет, будет отображен "Log in" и "Log out"
  // получить состояние авторизации из ReduxTLK (файл: client\src\store\features\isAuthSlice.ts)
  const isAuth = useAppSelector((state) => state.user.isAuth);
  // получить состояние авторизации из ReduxTLK
  const activeMenu = useAppSelector((state) => state.menu);

  const dispatch = useAppDispatch();
  // console.log(window.location.pathname);
  const handleClick = (index: number) => {
    //* записал активную кнопку меню в хранилище, используется в modesDateSlice.ts
    sessionStorage.setItem('IndexMenu', index.toString()); // например, если нажать на кнопку "Recipes", то после обновления страницы, будет режим "Recipes"
    // console.log(sessionStorage.getItem('IndexMenu'));
    // redux-toolkit
    dispatch(readingMenu(index));
  };
  console.log('rememo');
  return (
    <DivWrapper>
      {/* //! Левый сектор */}
      {/*//* Logo */}
      <Link to={'/'}>
        <TitleCalendarWrapper>
          <TitleCalendar>MedСalendar</TitleCalendar>
          <StyleIconPlus>
            <FaCalendarPlus size="15" />
          </StyleIconPlus>
        </TitleCalendarWrapper>
      </Link>

      {/* //! Центральный сектор */}
      {/*//* Menu Center */}
      <CenterNavMenu>
        {/* // NavLink от react-router-dom*/}
        {/*// кнопки из массива: Day,Week,Month,Year,Recipe,Mealschedules и крайний особенный Login/Logout: client\src\data\dataMenu.ts */}
        {menuModesDate.map(
          (item, index, array) =>
            index <= 5 && ( // Day,Week,Month,Year, Recipe, Mealschedules
              <ButtonsWrapperMenu key={index}>
                <NavLink
                  to={`${item.UrlParams}`}
                  onClick={() => handleClick(index)}
                >
                  <ModeDateButton
                    $isActiveModeDate={activeMenu == index ? true : false}
                    // закругление углов левого края (кнопки Day)
                    $borderRadiusLeft={index == 0 ? true : false}
                    $borderRadiusRight={
                      index == array.length - 2 ? true : false
                    }
                  >
                    {item.title}
                  </ModeDateButton>
                </NavLink>
              </ButtonsWrapperMenu>
            ),
        )}
      </CenterNavMenu>
      {/* //! Правый сектор */}
      <RightNavMenu>
        {/* //* Login / Logout */}
        <ButtonWrapperAuth key={6}>
          <NavLink
            to={`${menuModesDate[6].UrlParams}`} //
            onClick={() => handleClick(6)}
          >
            <ModeDateButtonAuth
              $isActiveModeDate={activeMenu == 6 ? true : false}
            >
              {isAuth ? menuModesDate[6].title : menuModesDate[6].subTitle}
            </ModeDateButtonAuth>
          </NavLink>
        </ButtonWrapperAuth>

        {/*//! Поиск */}
        <FormRouterSearch>
          <InputButtonSearch>
            <FaSearch />
          </InputButtonSearch>
          <InputSearch placeholder="Search" />
        </FormRouterSearch>
      </RightNavMenu>
    </DivWrapper>
  );
};

export const Header = memo(Headers); // memo, чтобы не рендерился при каждом изменении других комопнентов
