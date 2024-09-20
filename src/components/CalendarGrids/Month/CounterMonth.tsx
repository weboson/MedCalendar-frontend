import { FC, memo } from 'react';
import { CounterWrapper } from './stylesMonthGrid/sc_MonthGrid';
import { Moment } from 'moment';
interface IProps {
  index: number;
  count: number;
  dayItem: Moment;
}

const CounterMonth: FC<IProps> = memo(
  ({ index, count, dayItem }) => {
    
    //! Для Popup - окна (появляется при наведение на конкертный приём ЛС)
    //Redux-toolkit - из hooks.tsx - для изменения данных
    const hoverMouseOnMedicine = (
      event: React.MouseEvent<HTMLElement>,
    ): void => {
      //* положение Popup относительно элемента (текст лекарства) на который навели курсор
      const box = event.currentTarget.getBoundingClientRect(); // возращает объект, exmple: DOMRect {x: 865.453125, y: 665, width: 89.90625, height: 21, top: 665, …}
      // подробнее: https://learn.javascript.ru/coordinates#getCoords
      // console.log(box)
      // popup
      const line = document.querySelector<HTMLElement>(`#MyPopupList${index}`); //! окна не видимы. они в каждой ячейке, и уникальыне классы (можно med.id вместо index)
      // span
      if (event.type == 'mouseover') {
        // монтируем MyPopupList
        // закроем MyPopup.tsx чтобы не перекрывал MyPopupList.tsx
        document.querySelector<HTMLElement>('#IdPopup')!.style.cssText = `display: none;`; // MyPopup.tsx
        // target.top + высота popup > высота окна ? target.top - (окно - target.top - высота Popup) : просто target.top - высота Popup / 2
        //* Math.abs() чтобы отрицательное число сделать положительным: https://sky.pro/wiki/javascript/prevraschenie-otritsatelnykh-chisel-v-polozhitelnye-v-java-script/
        line!.style.cssText += `
          display: flex;
          top: ${((box.top + 300) > document.documentElement.clientHeight - 100) ? (box.top - (Math.abs(document.documentElement.clientHeight - box.top - 700))) : box.top - 200}px; 
          left: ${
            box.left + 
            (dayItem.day() === 6 || dayItem.day() == 0 ? -300 : 20)
          }px; 
          animation: show 1s forwards;`; // сама анимация "show" описана myPopup -> sc_MyPopup.tsx/ в воскрсенье Popup left: 100px
      } else if (event.type == 'mouseout') {
        // если мышь ушла с элемента (mouseout)
        line!.style.cssText += `
          animation: hidden 1s forwards;`; // сама анимация "hidden" описана myPopup -> sc_MyPopup.tsx
      }
    };


    return (
      <>
        <CounterWrapper
          key={index}
          onMouseOver={hoverMouseOnMedicine}
          onMouseOut={hoverMouseOnMedicine}
        >
          {/* счетчик */}
          {count !== 0 && `x${count}`}
        </CounterWrapper>
      </>
    );
  },
);

export default CounterMonth;
