//! Приём Лекарств зависит от ПОСЛЕДНЕГО приёма пищи (до/вовремя/после)
// case: 'last supper'    ---  takingMedications[0].action: waysUsing[2]
import { Moment } from 'moment';
import { FC, memo } from 'react';
import { IRecipesMedication } from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
import { WrapperSpanDay } from '../../../stylesDayGrid/sc_DayGrid';
import HelperWarningMarker from '../../../../../helper/HelperWarningMarker';
// import HelperWarningMarker from './helper/HelperWarningMarker';

interface IProps {
  halfHourItem: Moment;
  lastMealWeekdays: Moment;
  lastMealWeekend: Moment;
  med: IRecipesMedication | null;
  currentDate: Moment;
  currentDayForWirning: boolean
}

const DayDependingSupper: FC<IProps> = memo(
  ({
    halfHourItem,
    lastMealWeekdays,
    lastMealWeekend,
    med,
    currentDate,
    currentDayForWirning
  }) => {
    // нужен .clone() - иначе add и subtract будут дублировать своё выполнение
    lastMealWeekdays = lastMealWeekdays.clone();
    lastMealWeekend = lastMealWeekend.clone();

    switch (
      med.position // до/вовремя/после
    ) {
      case 'before': //! ДО ужина
        return (
          // weekday
          currentDate.day() !== 6 && currentDate.day() !== 0
            ? halfHourItem.isSame(
                lastMealWeekdays
                  .subtract(med.interval.minute, 'minute')
                  .subtract(med.interval.hour, 'hour'),
                'hour',
              ) &&
                lastMealWeekdays.clone().minute() - halfHourItem.minute() >=
                  0 && // 22:30 - 22:21 >= 0  and < 30
                lastMealWeekdays.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <>                    
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay className={`medElemUnic${med.id}`}>
                      {`${med.title}`}
                    </WrapperSpanDay>
                  </>
                )
            : // weekend
              halfHourItem.isSame(
                lastMealWeekend
                  .subtract(med.interval.minute, 'minute')
                  .subtract(med.interval.hour, 'hour'),
                'hour',
              ) &&
                lastMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
                lastMealWeekend.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay className={`medElemUnic${med.id}`}>
                      {`${med.title}`}
                    </WrapperSpanDay>
                  </>
                )
        );
        break;
      case 'while': //! ВОВРЕМЯ ужина
        return (
          // weekday
          currentDate.day() !== 6 && currentDate.day() !== 0
            ? halfHourItem.isSame(lastMealWeekdays, 'hour') &&
                lastMealWeekdays.clone().minute() - halfHourItem.minute() >=
                  0 && // 22:30 - 22:21 >= 0  and < 30
                lastMealWeekdays.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay className={`medElemUnic${med.id}`}>
                      {`${med.title}`}
                    </WrapperSpanDay>
                  </>
                )
            : // weekend
              halfHourItem.isSame(lastMealWeekend, 'hour') &&
                lastMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
                lastMealWeekend.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay className={`medElemUnic${med.id}`}>
                      {`${med.title}`}
                    </WrapperSpanDay>
                  </>
                )
        );
        break;
      case 'after': //! ПОСЛЕ ужина
        return (
          // weekday
          currentDate.day() !== 6 && currentDate.day() !== 0
            ? halfHourItem.isSame(
                lastMealWeekdays
                  .add(med.interval.minute, 'minute')
                  .add(med.interval.hour, 'hour'),
                'hour',
              ) &&
                lastMealWeekdays.clone().minute() - halfHourItem.minute() >=
                  0 && // 22:30 - 22:21 >= 0  and < 30
                lastMealWeekdays.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay className={`medElemUnic${med.id}`}>
                      {`${med.title}`}
                    </WrapperSpanDay>
                  </>
                )
            : // weekend
              halfHourItem.isSame(
                lastMealWeekend
                  .add(med.interval.minute, 'minute')
                  .add(med.interval.hour, 'hour'),
                'hour',
              ) &&
                lastMealWeekend.clone().minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
                lastMealWeekend.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay className={`medElemUnic${med.id}`}>
                      {`${med.title}`}
                    </WrapperSpanDay>
                  </>
                )
        );
        break;

      default:
        break;
    }
  },
);
export default DayDependingSupper; // memo, возможно быстрее будет загружатся лекарства в ячейке
