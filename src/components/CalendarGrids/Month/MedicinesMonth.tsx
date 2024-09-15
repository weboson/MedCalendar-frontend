import { Moment } from 'moment';
import { FC, memo } from 'react';
// type fo med
import { IRecipesMedication } from '../../../data/localDataBase/LocalDB_WaysUsing';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { WrapperIcon } from './stylesMonthGrid/sc_MonthGrid';
import { readingPopupData } from '../../../store/features/popupDataSlice';
import { useAppDispatch } from '../../../store/hooks';

interface IProps {
  dayItem: Moment
  med: IRecipesMedication;
}

const MedicinesMonth: FC<IProps> = memo(({med, dayItem}) => {
      //! Для Popup - окна (появляется при наведение на конкертный приём ЛС)
    //Redux-toolkit - из hooks.tsx - для изменения данных
    const dispatch = useAppDispatch();
    // Обработчик onMouseOver и onMouseOut: при наведении мышью на ячейку с ЛС, появляется Popup - окно с подробным списком лекарств
    // (еще в самом myPopup.tsx есть событие - чтобы popup не исчезал при наведение на самого popup)
    const hoverMouseOnMedicine = (event: React.MouseEvent<HTMLElement>): void => {
      // тип атрибута https://habr.com/ru/articles/783858/
      // вариант с положение Popup относительно курсора
      // const top = event.clientY;
      // const left = event.clientX;

      //* положение Popup относительно элемента (текст лекарства) на который навели курсор
      const box = event.currentTarget.getBoundingClientRect(); // возращает объект, exmple: DOMRect {x: 865.453125, y: 665, width: 89.90625, height: 21, top: 665, …}
      // подробнее: https://learn.javascript.ru/coordinates#getCoords
      // console.log(box)
      // popup
      const line = document.querySelector('#IdPopup');
      // span
      if (event.type == 'mouseover') {
        // если мышь наведена на элемент
        // меняем данные (redux-toolkit)
        dispatch(readingPopupData(med.id)); // передаю только id лекарства, в popup буду find()
        line!.style.cssText += `
          display: flex;
          top: ${box.top + window.scrollY - 200}px;
          left: ${box.left + window.scrollX + ((dayItem.day() === 6 || dayItem.day() == 0) ? -380 : 0)}px; 
          animation: show 1s forwards;`; // сама анимация "show" описана myPopup -> sc_MyPopup.tsx/ в воскрсенье Popup left: 100px
          } else if (event.type == 'mouseout'){
            // если мышь ушла с элемента (mouseout)
            line!.style.cssText += `
              animation: hidden 3s forwards;`; // сама анимация "hidden" описана myPopup -> sc_MyPopup.tsx
          }
    };
    
  return (
    <WrapperIcon 
        onMouseOver={hoverMouseOnMedicine}
        onMouseOut={hoverMouseOnMedicine}>
            <RiMedicineBottleLine className={`medElemUnic${med.id}`} />
    </WrapperIcon>
      
  );
});

export default MedicinesMonth;
