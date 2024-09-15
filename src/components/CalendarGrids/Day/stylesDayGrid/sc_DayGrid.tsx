// styles for DayGrid.tsx
import styled from 'styled-components';

// Wrapper main block
export const WrapperBlock = styled.div`
  height: 89vh; /* index.css(100vh), cs_calendarHeader.tsx(4vh), sc_Monitor.tsx(7vh), sc_DayGrid.tsx(89vh)/ */
  display: flex;
  flex-wrap: nowrap; // в строку горизонтально (for adaptive)
  overflow-x: auto;
  /* justify-content:space-between; */
  background-color: #1e1f21;
  @media (max-width: 1210px) {
    flex-wrap: wrap; // столбик вертикальный  https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
  }
`;

//!--- Calendar Section
export const CalendarSection = styled.div`
  background-color: #1e1f21;
  min-width: 605px;
  /* для адаптива */
  @media (max-width: 1210px) {
    flex: 100%;
  }
`;

//! *********************** Day Grid Section ***********************
export const DayGridSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #1e1f21;
  width: 68vw; // главная ширина Grid Day
  /* flex:50%; */
  /* min-width: 605px; */
  /* для адаптива */
  @media (max-width: 1210px) {
    /* flex-wrap: wrap; */
    flex: 100%;
  }
`;

// Grid Day
export const WrapperGridDay = styled.div`
  display: flex;
  background-color: #1e1f21;
  min-width: 100%;
  height: 100%;

  overflow-y: scroll;
  /* стили скролла */
  &::-webkit-scrollbar {
    // style scroll
    width: 18px;
  } /* ширина scrollbar */
  &::-webkit-scrollbar-track {
    background: #565759;
    /* border-radius: 20px;  */
  } /* цвет дорожки */
  &::-webkit-scrollbar-thumb {
    background-color: #1e1f21; /* цвет плашки */
    border-radius: 0; /* закругления плашки */
    border: 1px solid #5a5959;
  } /* padding вокруг плашки */
`;

// Wrapper left panel (24 hours) GridDay
export const WrapperSidePanel = styled.div`
  flex-direction: row;
  float: left;
`;

interface IHourSidePanel {
  $currentSideHour: boolean;
}
// Hours
export const WrapperListHalfHours = styled.div<IHourSidePanel>`
  font-size: 1.6em;
  ${(props) => (props.$currentSideHour ? 'color: red;' : 'color: #E6E6E6;')}
  background-color: #1e1f21;
  text-align: center;
  min-height: 230px;
  width: 5vw;
  /* padding: 10px; */
  border-top: 1px solid #565759;
  border-bottom: 1px solid #565759;
  border-right: 1px solid #565759;
`;

// Grid
export const WrapperList = styled.div`
  width: 100%;
`;

// Half Hours
interface IHourContent {
  $currentHalfHour: boolean;
  $currentWarning: boolean;
}

export const HalfHoursContent = styled.div<IHourContent>`
  position: relative; // чтобы icon food были справа внизу
  background-color: #1e1f21; // цвет по-умолчанию
  flex-direction: row;
  width: 100%;
  height: 115px;
  border-top: 1px solid #565759;
  border-right: 1px solid #565759;
  /* если контент (лекарства) слишком много в блоке, пояляется сролл */
  overflow-y: auto;
  /* стили скролла */
  &::-webkit-scrollbar {
    width: 18px;
  } /* ширина scrollbar */
  &::-webkit-scrollbar-track {
    background: #565759;
    /* border-radius: 20px;  */
  } /* цвет дорожки */
  &::-webkit-scrollbar-thumb {
    background-color: #1e1f21; /* цвет плашки */
    border-radius: 0; /* закругления плашки */
    border: 1px solid #5a5959;
  }
  ${(props) =>
    /* текущая по времени ячейка */
    props.$currentHalfHour ? 'background-color: #3d3e3f' : null};

  ${(props) =>
    // Warning: текущая по времени ячейка совпадает со временем приёма лекарств
    props.$currentWarning &&
    // пульсация красного цвета
    `opacity: 1;
      animation: pulse 4s ease-in-out infinite; // Указываем название анимации, время, тип, и нужно ли её повторять

      @keyframes pulse {
        0% {
          background-color: #601616c4; 
        }
        50% {
          background-color: #3d0d0d80; 
        }
        100% {
          background-color: #601616c4; 
        }
      }
`};
`;

//! TimeLine
// временная шкала
export const Line = styled.div`
  height: 2%;
  /* width присваивается в скрипте в TimeLine.tsx */
  /* width: 1.6%; // первая минута: 100% / 60 = 1,666...  */
  /* background-color: #E6E6E6; */
  /* градиент методом box-shadow */
  background: #00ffd5;
  box-shadow: 0 -200px 100px -120px skyblue inset; // skyblue - это цвет
  border-radius: 50%;
  animation: background 3s infinite alternate;
  /* анимация градиента */
  @keyframes background {
    50% {
      background: skyblue;
      box-shadow: 0 -200px 100px -100px yellowgreen inset;
    }
  }
  /* второй способ анимированного градиента. Минус в том, что я не смог использовать %, только px в background-position */
  /* background-position: 0;
  background: linear-gradient(to right, #63e4a1, #591cf3, #fffcc0, #00ffea, #3ede8b ); // градиент
  animation: background 10s infinite linear; 
  @keyframes background {
  100% {
    background-position: 1000px;
  }  */
  /* } */
`;

//! Режим дня (Moon/ Sun)
//* Icons
//* Not Styled-components - sc не работают с svg от react-icons
// For Daily Regimes (стилизация иконок "GoSun" и "GoMoon")
// GoSun
export const stylesSun = {
  color: '#565759',
  float: 'right',
  margin: '1px 1px 0 0',
};
// GoMoon
export const stylesMoon = {
  color: '#565759',
  float: 'right',
  margin: '1px 1px 0 0',
};

//! Для Food
export const StyleIconFood = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  color: #fffb00;
  margin: 0px 3px 3px 0px;
  &:hover {
    color: red;
  }
`;

//! для всплывающей подсказки (html атрибут data-title)
export const FoodTooltip = styled.span`
  &::before {
    position: absolute;
    bottom: 30%;
    z-index: 2;
    right: 3%;
    font-size: 1.6em;
    padding: 5px 10px;
    background: #e6e6e6;
    color: #565759;
    font-weight: bold;
    content: attr(data-title);
    transition: 0.2s ease;
    transition-property: opacity, visibility;
    opacity: 0;
    /* visibility: hidden; */
    /* pointer-events: none; */

    //* 10s в начале будет показан (для отладки)
    animation: showTitles 0s linear;
    @keyframes showTitles {
      0%,
      90% {
        visibility: visible;
        opacity: 1;
      }
      100% {
        visibility: hidden;
        opacity: 0;
      }
    }
    // *******************************************
  }
  &:hover {
    &::before {
      opacity: 1;
      visibility: visible;
    }
  }
`;
//! Medicines
// стопка Medicines
export const WrapperFlexMedicines = styled.span`
  display: flex;
  flex-wrap: wrap; // перенос на следующую строку, если не влазиет (то есть scroll-x точно не будет)
`;
// для текста лекарства
export const WrapperSpanDay = styled.span`
  cursor: help;
  color: black;
  font-size: 2em;
  /* display: inline; */
  /* width: 100%; */
  height: 100%;
  &:hover {
    background-color: #e6e6e6;
    color: white;
    padding: 10px;
    text-decoration: underline;
  }
`;

//! *********************** Recipe Section ***********************
// секция для окна Рецепта
export const RecipeSection = styled.div`
  display: flex;
  justify-content: center;
  height: 89vh;
  background-color: #1e1f21;
  width: 32vw; // главная ширина Grid Day
`;

// Обертка с элементами
export const WrapperRecipeWindow = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between; // раскидать по сторонам */
  height: 100%;
  width: 30vw;
  background-color: #e6e6e6;
  color: #565759;
`;
// Обертка для белого фона
export const WrapperRecipe = styled('div')`
  padding: 1% 1% 1% 6%;
  max-width: 100%;
  font-family: Roboto, serif;
  h2 {
    text-align: center;
    font-size: 2.2em;
    line-height: 100%;
  }
  li {
    font-size: 1.9em;
    line-height: 50%;
  }
  p {
    color: red;
    font-size: 1em;
  }

  /* если текста будет много, то scroll */
  overflow-y: auto;
  /* стили скролла */
  &::-webkit-scrollbar {
    // style scroll
    width: 18px;
  } /* ширина scrollbar */
  &::-webkit-scrollbar-track {
    background: #565759;
    /* border-radius: 20px;  */
  } /* цвет дорожки */
  &::-webkit-scrollbar-thumb {
    background-color: #1e1f21; /* цвет плашки */
    border-radius: 0; /* закругления плашки */
    border: 1px solid #5a5959;
  } /* padding вокруг плашки */
`;

// кнопка "изменить"
export const WrapperMyButton = styled.div`
  justify-content: center;
  text-align: center;
  padding-bottom: 3%;
`;

export const MyButton = styled.button`
  cursor: pointer;
  font-size: 1.8em;
  border: unset;
  height: 61px;
  padding-right: 24px;
  padding-left: 24px;
  border-radius: 4px;
  background-color: #565759;
  color: #e6e6e6;
  &:hover {
    // при наведении
    background-color: #1e1f21;
  }
  &:active {
    // при клике
    padding-top: 4px;
  }
`;
