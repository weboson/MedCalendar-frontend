//! Анимированная (в sc_DayGrid.tsx) временная ШКАЛА 
import { Moment } from 'moment';
import { FC, useEffect } from 'react';
import { Line } from '../../stylesDayGrid/sc_DayGrid';
import moment from 'moment';

interface IProps {
  currentDate: Moment;
}

const TimeLine: FC<IProps> = ({ currentDate }) => {
//   console.log(moment().minutes());
//   let element = document.querySelector('#timeline');
//   console.log(element);
  useEffect(() => {
    let step = 0;
    // сколько минут, столько и +1.66 к шагу
    for (let i = 1; i <= moment().minutes(); i++) { // halfHourItem.minute() - почему то не работает
      // прибавляем к step +1.6 (1.6% как 1 минута)
      step += 1.66; // первая минута: 100% / 60 = 1,666... 
    }
    document.querySelector<HTMLElement>('#timeline')!.style.width = `${step}%`; // добавляем ширину для элемента (#timeline)
  }, [currentDate]); // меняется в зависимости от currentDate(раз в 60 сек)


  return (
      <Line id="timeline" />
  );
};

export default TimeLine;
