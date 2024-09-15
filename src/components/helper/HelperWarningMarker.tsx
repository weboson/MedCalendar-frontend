//! если текущее время == с ячейкой с приёмом ЛС, то в Redux-toolkit изменяется массив (push true/fasle)
// вызывается в DependingEating.tsx, DependingBreakfast и т.д, а использую в HelperWarningMarker.tsx и в WeekGrid.tsx;
import moment from 'moment';
import { Moment } from 'moment';
import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { arrPushWarning } from '../../store/features/arrWarningSlice';


interface IProps {
  halfHourItem: Moment; // так как мы уже имеем заполненную лекарствами ячейку, 
  // благодаря родительский компонентам, например: DependingBreakfast
  currentDate: Moment; // рендер (проверка) каждые 60000 ms
}

const HelperWarningMarker:FC<IProps> = ({halfHourItem, currentDate }) => {
  
  const dispatch = useAppDispatch();
  
useEffect(() => {  
    if (halfHourItem.isSame(moment(), 'hour') &&
    moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
    moment().minute() - halfHourItem.minute() >= 0) {
      dispatch(arrPushWarning([true])) // if текущее время совпадает с ячейкой с приёмом лекарства, то push в array true
    } 
    dispatch(arrPushWarning([false])) // if текущее время совпадает с ячейкой с приёмом лекарства, то push в array false
}) // обновление при каждом currentDate (60000ms)
//* 1) если отсутствует второй аргумент (массив зависимостей), 
// то запуск useEffect(проверки push) - будет при любом изменении компонента, и будет ошибка (тестировал): слишком много циклов
//* 2) если же массив зависимостей пустой, то запуск useEffect (проверки push) при первом рендере (монтировании компонента),
// и почему то не меняет маркер для Warning при переходе на следующую ячейку, то есть при изменении текущего времени.


  return (
    <>
    </>
  );
};

export default HelperWarningMarker;