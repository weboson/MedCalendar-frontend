//! Приём Лекарств зависящая от ПЕРВОГО (завтрака) приёма пищи (до/вовремя/после)
// case: 'first breakfast'    ---  takingMedications[0].action: waysUsing[1]
import { Moment } from 'moment';
import { FC, memo } from 'react';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { IRecipesMedication } from '../../../../../../../data/localDataBase/LocalDB_WaysUsing';
import HelperWarningMarker from '../../../../../../helper/HelperWarningMarker';
import { WrapperSpanWeek } from '../../../../stylesWeekGrid/sc_WeekGrid';

interface IProps {
  dayItem: Moment;
  halfHourItem: Moment;
  firstMealWeekdays: Moment;
  firstMealWeekend: Moment;
  med: IRecipesMedication;
  currentDayForWirning: boolean;
  currentDate: Moment;
}

const DependingBreakfast: FC<IProps> = memo(({
  dayItem,
  halfHourItem,
  firstMealWeekdays,
  firstMealWeekend,
  med,
  currentDayForWirning,
  currentDate,
}) => {
  // нужен .clone() - иначе add и subtract будут дублировать своё выполнение
  firstMealWeekdays = firstMealWeekdays.clone();
  firstMealWeekend = firstMealWeekend.clone();

  switch (
    med.position // до/вовремя/после
  ) {
    case 'before': //! ДО завтрака
      return (
        // weekday
        dayItem.day() !== 6 && dayItem.day() !== 0
          ? halfHourItem.isSame(
              firstMealWeekdays
                .subtract(med.interval.minute, 'minute')
                .subtract(med.interval.hour, 'hour'),
              'hour',
            ) &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                  {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                      top: '18px',
                    }}
                  />
                  <WrapperSpanWeek className={`medElemUnic${med.id}`}>
                    {`${med.title}`}
                  </WrapperSpanWeek>
                  <br />
                </>
              )
          : // weekend
            halfHourItem.isSame(
              firstMealWeekend
                .subtract(med.interval.minute, 'minute')
                .subtract(med.interval.hour, 'hour'),
              'hour',
            ) &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                   {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <WrapperSpanWeek className={`medElemUnic${med.id}`}>{`${med.title}`}</WrapperSpanWeek>
                  <br />
                </>
              )
      );
      break;
    case 'while': //! ВОВРЕМЯ завтрака
      return (
        // weekday
        dayItem.day() !== 6 && dayItem.day() !== 0
          ? halfHourItem.isSame(firstMealWeekdays, 'hour') &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                   {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <WrapperSpanWeek className={`medElemUnic${med.id}`}>{`${med.title}`}</WrapperSpanWeek>
                  <br />
                </>
              )
          : // weekend
            halfHourItem.isSame(firstMealWeekend, 'hour') &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                 {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <WrapperSpanWeek className={`medElemUnic${med.id}`}>{`${med.title}`}</WrapperSpanWeek>
                </>
              )
      );
      break;
    case 'after': //! ПОСЛЕ завтрака
      return (
        // weekday
        dayItem.day() !== 6 && dayItem.day() !== 0
          ? halfHourItem.isSame(
              firstMealWeekdays
                .add(med.interval.minute, 'minute')
                .add(med.interval.hour, 'hour'),
              'hour',
            ) &&
              firstMealWeekdays.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                 {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <WrapperSpanWeek className={`medElemUnic${med.id}`}>{`${med.title}`}</WrapperSpanWeek>
                </>
              )
          : // weekend
            halfHourItem.isSame(
              firstMealWeekend
                .add(med.interval.minute, 'minute')
                .add(med.interval.hour, 'hour'),
              'hour',
            ) &&
              firstMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
              firstMealWeekend.clone().minute() - halfHourItem.minute() <
                30 && (
                <>
                 {currentDayForWirning && <HelperWarningMarker halfHourItem={halfHourItem} currentDate={currentDate}/>}
                  <RiMedicineBottleLine
                    style={{
                      color: 'red',
                    }}
                  />
                  <WrapperSpanWeek className={`medElemUnic${med.id}`}>{`${med.title}`}</WrapperSpanWeek>
                </>
              )
      );
      break;

    default:
      break;
  }
}
);

// export default DependingBreakfast;
export default DependingBreakfast; // memo, возможно быстрее будет загружатся лекарства в ячейке
