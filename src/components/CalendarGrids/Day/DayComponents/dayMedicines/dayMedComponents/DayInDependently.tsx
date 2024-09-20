//! Вне зависимсоти от еды, сна и т.д.
import { Moment } from 'moment';
import { FC, memo } from 'react';
import { IRecipesMedication } from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
// import HelperWarningMarker from './helper/HelperWarningMarker';
import { WrapperSpanDay } from '../../../stylesDayGrid/sc_DayGrid';
import HelperWarningMarker from '../../../../../helper/HelperWarningMarker';

interface IProps {
  halfHourItem: Moment;
  firstMealWeekdays: Moment;
  betweenMealsWeekdays: number;
  firstMealWeekend: Moment;
  betweenMealsWeekend: number;
  med: IRecipesMedication | null;
  currentDate: Moment;
  currentDayForWirning: boolean
}

const DayInDependently: FC<IProps> = memo(
  ({
  halfHourItem,
  firstMealWeekdays,
  betweenMealsWeekdays,
  firstMealWeekend,
  betweenMealsWeekend,
  med, 
  currentDate,
  currentDayForWirning
}) => {
  // нужен .clone() - иначе add и subtract будут дублировать свои выполнение, и вместо add(6 часов) получим add(12)
  firstMealWeekdays = firstMealWeekdays.clone();
  firstMealWeekend = firstMealWeekend.clone();

  return (
    // приём ЛС не имеет зависимостей (просто количество приёма ЛС делиться на интервал между 1-м и последним ПП)
    // логика схожа с MealSchedule.tsx
    currentDate.day() !== 6 && currentDate.day() !== 0
      ? // weekday
        (halfHourItem.isSame(firstMealWeekdays, 'hour') &&
          halfHourItem.minute() - firstMealWeekdays.minute() >= 0 && // 8:30 - 8:16 >= 0  and < 30
          halfHourItem.minute() - firstMealWeekdays.minute() < 30 && ( // 8:30 - 8:16 < 0  and < 30
            <div>
              {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
              <WrapperSpanDay className={`medElemUnic${med.id}`}>{`${med.title}`}
              </WrapperSpanDay>
            </div>
          )) ||
          [...new Array(med.quantity)].map((_, index) =>
            halfHourItem.isSame(
              firstMealWeekdays.add(betweenMealsWeekdays, 's'),
              'hour',
            ) &&
            firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() -
              halfHourItem.minute() >=
              0 &&
            firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() -
              halfHourItem.minute() <
              30 ? (
              <div key={index + 1}>
              {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                <WrapperSpanDay className={`medElemUnic${med.id}`}>
                {`${med.title}`}
                </WrapperSpanDay><br/>
              </div>
            ) : null,
          )
      : // weekend
        (halfHourItem.isSame(firstMealWeekend, 'hour') &&
          halfHourItem.minute() - firstMealWeekend.minute() >= 0 && // 8:30 - 8:16 >= 0  and < 30
          halfHourItem.minute() - firstMealWeekend.minute() < 30 && ( // 8:30 - 8:16 < 0  and < 30
            <div>
              {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
              <WrapperSpanDay className={`medElemUnic${med.id}`}>
              {`${med.title}`}
              </WrapperSpanDay><br/>
            </div>
          )) ||
          [...new Array(med.quantity)].map((_, index) =>
            halfHourItem.isSame(
              firstMealWeekend.add(betweenMealsWeekend, 's'),
              'hour',
            ) &&
            firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() -
              halfHourItem.minute() >=
              0 &&
            firstMealWeekend.clone().add(betweenMealsWeekend, 'm').minute() -
              halfHourItem.minute() <
              30 ? (
              <div key={index + 1}>
              {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                <WrapperSpanDay className={`medElemUnic${med.id}`}>
                  {`${med.title}`}
                </WrapperSpanDay><br/>
              </div>
            ) : null,
          )
  );
}
);

export default DayInDependently; // memo, возможно быстрее будет загружатся лекарства в ячейке
