// styled for Header.tsx
import { Form } from 'react-router-dom';
import styled from 'styled-components';

export const DivWrapper = styled('div')`
  background-color: #2a282d;
  height: 4vh; /* index.css(100vh), cs_calendarHeader.tsx(4vh), sc_Monitor.tsx(7vh), sc_DayGrid.tsx(89vh)/ */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row; // в строку
  @media (max-width: 834px) {
    // при max-width: 834px и меньше
    flex-direction: column; // в столбик
    height: 100%;
    padding: 1% 0;
  }
  a {
    // убрать с Link (которая в верстке <a> ) подчеркивание
    text-decoration: none;
  }
`;

export const TitleCalendar = styled('h3')`
  color: #dcdddd;
  margin: 0;
  font-size: 18px;
  padding-left: 16px;
`;
export const StyleIconPlus = styled.div`
  color: #dcdddd;
  padding-left: 10px;
  padding-top: 3px;
  padding-left: 4px;
`;
export const TitleCalendarWrapper = styled.div`
  text-decoration: none;
  display: flex;
`;

//! Menu center
export const CenterNavMenu = styled.nav`
  display: flex;
`;

//* 0-5 из arr dataMenu: Day,Week,Month,Year, Recipe, Mealschedules
export const ButtonsWrapperMenu = styled('div')`
  display: flex;
  justify-content: center;
  @media (max-width: 374px) {
    flex-direction: column; // в столбик вертикально
    justify-content: center;
    width: 100%;
  }
  a {
    text-decoration-line: none;
    /* color: ${(props) => (props.$isActiveModeDate ? '#565759' : '#E6E6E6;')}; */
  }
`;

interface IModeDateButtonProps {
  $borderRadiusLeft: boolean;
  $borderRadiusRight: boolean;
  $isActiveModeDate?: boolean;
}

// стиль каждой кнопки
export const ModeDateButton = styled('button')<IModeDateButtonProps>`
  border: unset;
  height: 20px;
  padding-right: 16px;
  padding-left: 16px;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 834px) {
    // при max-width: 834px и меньше
    margin: 3% 0;
  }
  @media (max-width: 375px) {
    // при max-width: 834px и меньше
    display: flex;
    margin: auto;
  }

  /* закругление углов крайних кнопок */
  ${(props) =>
    props.$borderRadiusLeft ? 'border-radius: 4px 0 0 4px ;' : null}
  ${(props) =>
    props.$borderRadiusRight ? 'border-radius: 0 4px 4px 0;' : null}
    /* активная кнопка меню */
    background-color: ${(props) =>
    props.$isActiveModeDate ? '#E6E6E6;' : '#565759'};
  color: ${(props) => (props.$isActiveModeDate ? '#565759' : '#E6E6E6;')};
`;

//! Menu right
// кнопка Login/Logout
//* 6 из arr dataMenu: Login/Logout
// обертка кнопки
// Правый сектор (login/logout)
export const RightNavMenu = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonWrapperAuth = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: right;
`;

interface IModeDateButtonAuthProps {
  $isActiveModeDate?: boolean;
}
// кнопка
export const ModeDateButtonAuth = styled.button<IModeDateButtonAuthProps>`
  border: unset;
  height: 20px;
  padding-right: 16px;
  padding-left: 16px;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 834px) {
    // при max-width: 834px и меньше
    margin: 3% 0;
  }
  @media (max-width: 375px) {
    // при max-width: 834px и меньше
    display: flex;
  }
  border-radius: 4px;
  background-color: ${(props) =>
    props.$isActiveModeDate ? '#E6E6E6;' : '#565759'};
  color: ${(props) => (props.$isActiveModeDate ? '#565759' : '#E6E6E6;')};
`;

export const FormRouterSearch = styled(Form)`
  background: #565759;
  height: 20px;
  margin-right: 7px;
  margin-left: 7px;
  border-radius: 4px;
  display: flex;
`;

export const InputSearch = styled('input')`
  border: none;
  outline: none;
  background: transparent;
  max-width: 200px;
  color: #e6e6e6;
  &::placeholder {
    align-items: center;
  }
`;

export const InputButtonSearch = styled('button')`
  display: flex;
  align-items: center;
  text-align: right;
  border: none;
  outline: none;
  background: transparent;
  color: #e6e6e6;
  cursor: pointer;
`;
