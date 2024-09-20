// styles for WeekGrid.tsx
import styled from 'styled-components';

// main block
export const GridWrapper = styled.div`
  display: block;
  background-color: #1e1f21;
  min-width: 100%;
  height: 89vh; //! главная высота в index.css(100vh), и остальное cs_calendarHeader.tsx(4vh), sc_Monitor.tsx(7vh),
  overflow-y: scroll;
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
// side panel block
export const WrapperSidePanel = styled.div`
  display: block;
  float: left;
`;
// Day (side panel)
export const DaySidePanel = styled.div`
  background-color: #1e1f21;
  border-bottom: 1px solid #565759;
  color: white;
  text-align: center;
  padding-bottom: 8px;
  position: sticky; // fixed panel
  top: 0; // fixed panel
  width: 100%;
`;
// Hours (side panel)
export const HoursSidePanel = styled.div``;
// Item Hour
interface IHourSidePanel {
  $currentSideHour: boolean;
}

export const HourSidePanel = styled.div<IHourSidePanel>`
  ${(props) => (props.$currentSideHour ? 'color: red;' : 'color: #E6E6E6;')}
  background-color: #1e1f21;
  text-align: center;
  min-height: 230px;
  padding: 10px;
  border-bottom: 1px solid #565759;
  border-right: 1px solid #565759;
`;

// Wrapper Header
export const WrapperTopPanelAndContent = styled.div`
  display: grid;
  //flex-wrap: wrap; // хз - и без него робит
  /* grid-template-columns: repeat(7, 1fr); */
  /* для адаптива: https://youtu.be/Wq5tzAaYfxA?list=PLe90t_Ab7ztPn7mXL0TyM5VKWhEBw-BSL&t=238 */
  grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
`;
// Day of Week + Date + Column
export const WrapperColumn = styled.div`
`; // для обёртки

interface IDayOfWeek {
  $currentDay: boolean;
}

export const DayOfWeek = styled.div<IDayOfWeek>`
  position: sticky;
  top: 0; // fixed panel
  z-index: 1;
  background-color: #1e1f21;
  border-bottom: 1px solid #565759;
  ${(props) => (props.$currentDay ? 'color: red;' : 'color: white;')}
  padding-left: 20px;
  padding-bottom: 8px;
`;

// Hours Columm
interface IHourContent {
  $currentHour: boolean;
  $currentWarning: boolean;
}

export const HalfHoursContent = styled.div<IHourContent>`
  background-color: #1e1f21; // цвет по-умолчанию
  position: relative;
  display: block;
  width: 100%;
  height: 115px;
  border-bottom: 1px solid #565759;
  border-right: 1px solid #565759;
  /* если контент (лекарства) слишком много в блоке, пояляется сролл */
  overflow-y: auto; 
  /* стили скролла */
  &::-webkit-scrollbar {
    // style scroll
    width: 10px;
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
    props.$currentHour ? 'background-color: #3d3e3f' : null};
  
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
   
   /* Для того, чтобы текст не растягивал блок, а ставилось в конце ...  */
    /* max-width: 260px; */
   //white-space: nowrap; /* Текст не переносится */
    //overflow: hidden; /* Обрезаем всё за пределами блока */
    //text-overflow: ellipsis; /* Добавляем многоточие */
`;


//* Icons
//* Not Styled-components - sc не работают с svg от react-icons
// For Daily Regimes (стилизация иконок "GoSun" и "GoMoon")
// GoSun 
export const stylesSun = {
  color: '#565759',
  float: 'right',
  margin: '1px 1px 0 0',
}
// GoMoon
export const stylesMoon = {
  color: '#565759',
  float: 'right',
  margin: '1px 1px 0 0',
}

//! для Food 
export const StyleIconFood = styled.div`
    color: #fffb00;
    position: absolute; 
    right: 0;
    bottom: 0;
    margin: 0px 3px 3px 0px;
    &:hover {
      color: red;
    }
`

//! для всплывающей подсказки (html атрибут data-title)
export const FoodTooltip = styled.span`
  	&::before {
		position: absolute;
		z-index: 2;
		top: 50%;
		right: 0%;
		/* margin: -10px 0 0 -20px; */
		padding: 5px 10px;
		background: #E6E6E6;
    color: #565759;
    font-weight: bold;
		content: attr(data-title);
		transition: .2s ease;
		transition-property: opacity, visibility;
		opacity: 0;
		/* visibility: hidden; */
		/* pointer-events: none; */

    //* 10s в начале будет показан (для отладки)
		animation: showTitles 0s linear; 
		@keyframes showTitles {
			0%, 90% {
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
`

// для текста лекарства
export const WrapperSpanWeek = styled.span`
    cursor: help;
    color: black;
    font-size: 14px;
    display: inline;
    width: 100%;
    height: 100%;
    &:hover {
      background-color: #E6E6E6;
      color: white;
      padding: 10px;
      text-decoration: underline;

}
`