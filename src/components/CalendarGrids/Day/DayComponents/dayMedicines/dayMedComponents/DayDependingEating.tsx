//! Приём Лекарств зависит от приёма пищи (до/вовремя/после)
// case: Depending of Eating    ---  takingMedications[0].action: waysUsing[0].type
import { Moment } from 'moment';
import { FC, memo } from 'react';
import { IRecipesMedication } from '../../../../../../data/localDataBase/LocalDB_WaysUsing';
import { WrapperSpanDay } from '../../../stylesDayGrid/sc_DayGrid';
import HelperWarningMarker from '../../../../../helper/HelperWarningMarker';
// import HelperWarningMarker from './helper/HelperWarningMarker';

interface IProps {
  halfHourItem: Moment;
  firstMealWeekdays: Moment;
  betweenMealsWeekdays: number;
  firstMealWeekend: Moment;
  betweenMealsWeekend: number;
  med: IRecipesMedication;
  currentDate: Moment;
  currentDayForWirning: boolean;
}

const DayDependingEating: FC<IProps> = memo(
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
    // console.log('DependingEating')

    switch (med.position) {
      case 'before': //! до
        return (
          // weekday
          // первый приём ЛС
          currentDate.day() !== 6 && currentDate.day() !== 0
            ? (halfHourItem.isSame(
                firstMealWeekdays
                  .subtract(med.interval.minute, 'minute')
                  .subtract(med.interval.hour, 'hour'),
                'hour',
              ) &&
                firstMealWeekdays.clone().minute() - halfHourItem.minute() >=
                  0 && // 22:30 - 22:21 >= 0  and < 30
                firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay
                      className={`medElemUnic${med.id}`}
                    >{`${med.title}`}
                    </WrapperSpanDay>
                    
                  </>
                ) ) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
                [...new Array(med.quantity - 1)].map(
                  (_, index) =>
                    halfHourItem.isSame(
                      firstMealWeekdays.add(betweenMealsWeekdays, 's'),
                      'hour',
                    ) &&
                    firstMealWeekdays.clone().minute() -
                      halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
                    firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                      30 && (
                      <div key={index}>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                        <WrapperSpanDay
                          className={`medElemUnic${med.id}`}
                        >{`${med.title}`}</WrapperSpanDay>
                        
                      </div>
                    ),
                )
            : // weekend
              (halfHourItem.isSame(
                firstMealWeekend
                  .subtract(med.interval.minute, 'minute')
                  .subtract(med.interval.hour, 'hour'),
                'hour',
              ) &&
                firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                  0 && // 22:30 - 22:21 >= 0  and < 30
                firstMealWeekend.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <div>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay
                      className={`medElemUnic${med.id}`}
                    >{`${med.title}`}</WrapperSpanDay>
                  </div>
                )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
                [...new Array(med.quantity - 1)].map(
                  (_, index) =>
                    halfHourItem.isSame(
                      firstMealWeekend.add(betweenMealsWeekend, 's'),
                      'hour',
                    ) &&
                    firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
                    firstMealWeekend.clone().minute() - halfHourItem.minute() <
                      30 && (
                      <div key={index}>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                        <WrapperSpanDay
                          className={`medElemUnic${med.id}`}
                        >{`${med.title}`}</WrapperSpanDay>
                        
                      </div>
                    ),
                )
        );

        break;
      case 'while': //! вовремя
        return (
          // weekday
          // первый приём ЛС
          currentDate.day() !== 6 && currentDate.day() !== 0
            ? (halfHourItem.isSame(firstMealWeekdays, 'hour') &&
                firstMealWeekdays.clone().minute() - halfHourItem.minute() >=
                  0 && // 22:30 - 22:21 >= 0  and < 30
                firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <div>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay
                      className={`medElemUnic${med.id}`}
                    >{`${med.title}`}</WrapperSpanDay>{' '}
                    
                  </div>
                )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
                [...new Array(med.quantity - 1)].map(
                  (_, index) =>
                    halfHourItem.isSame(
                      firstMealWeekdays.add(betweenMealsWeekdays, 's'),
                      'hour',
                    ) &&
                    firstMealWeekdays.clone().minute() -
                      halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
                    firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                      30 && (
                      <div key={index}>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                        <WrapperSpanDay
                          className={`medElemUnic${med.id}`}
                        >{`${med.title}`}</WrapperSpanDay>{' '}
                        
                      </div>
                    ),
                )
            : // weekend
              (halfHourItem.isSame(firstMealWeekend, 'hour') &&
                firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                  0 && // 22:30 - 22:21 >= 0  and < 30
                firstMealWeekend.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <div>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay
                      className={`medElemUnic${med.id}`}
                    >{`${med.title}`}</WrapperSpanDay>{' '}
                    
                  </div>
                )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
                [...new Array(med.quantity - 1)].map(
                  (_, index) =>
                    halfHourItem.isSame(
                      firstMealWeekend.add(betweenMealsWeekend, 's'),
                      'hour',
                    ) &&
                    firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
                    firstMealWeekend.clone().minute() - halfHourItem.minute() <
                      30 && (
                      <div key={index}>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                        <WrapperSpanDay
                          className={`medElemUnic${med.id}`}
                          key={index + 4}
                        >{`${med.title}`}</WrapperSpanDay>{' '}
                        
                      </div>
                    ),
                )
        );
        break;
      case 'after': //! после
        return (
          // weekday
          // первый приём ЛС
          currentDate.day() !== 6 && currentDate.day() !== 0
            ? (halfHourItem.isSame(
                firstMealWeekdays
                  .add(med.interval.minute, 'minute')
                  .add(med.interval.hour, 'hour'),
                'hour',
              ) &&
                firstMealWeekdays.clone().minute() - halfHourItem.minute() >=
                  0 && // 22:30 - 22:21 >= 0  and < 30
                firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <div>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay
                      className={`medElemUnic${med.id}`}
                    >{`${med.title}`}</WrapperSpanDay>
                    
                  </div>
                )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
                [...new Array(med.quantity - 1)].map(
                  (_, index) =>
                    halfHourItem.isSame(
                      firstMealWeekdays.add(betweenMealsWeekdays, 's'),
                      'hour',
                    ) &&
                    firstMealWeekdays.clone().minute() -
                      halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
                    firstMealWeekdays.clone().minute() - halfHourItem.minute() <
                      30 && (
                      <div key={index}>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                        <WrapperSpanDay
                          className={`medElemUnic${med.id}`}
                        >{`${med.title}`}</WrapperSpanDay>
                      </div>
                    ),
                )
            : // weekend
              (halfHourItem.isSame(
                firstMealWeekend
                  .add(med.interval.minute, 'minute')
                  .add(med.interval.hour, 'hour'),
                'hour',
              ) &&
                firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                  0 && // 22:30 - 22:21 >= 0  and < 30
                firstMealWeekend.clone().minute() - halfHourItem.minute() <
                  30 && (
                  <div>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                    <WrapperSpanDay
                      className={`medElemUnic${med.id}`}
                    >{`${med.title}`}</WrapperSpanDay>
                  </div>
                )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
                [...new Array(med.quantity - 1)].map(
                  (_, index) =>
                    halfHourItem.isSame(
                      firstMealWeekend.add(betweenMealsWeekend, 's'),
                      'hour',
                    ) &&
                    firstMealWeekend.clone().minute() - halfHourItem.minute() >=
                      0 && // 22:30 - 22:21 >= 0  and < 30
                    firstMealWeekend.clone().minute() - halfHourItem.minute() <
                      30 && (
                      <div key={index}>
                    {currentDayForWirning && (
                      <HelperWarningMarker
                        halfHourItem={halfHourItem}
                        currentDate={currentDate}
                      />
                    )}
                        <WrapperSpanDay
                          className={`medElemUnic${med.id}`}
                          key={index + 4}
                        >
                          {`${med.title}`}
                        </WrapperSpanDay>
                      </div>
                    ),
                )
        );
        break;
      default:
        break;
    }
  },
);

// export default DependingEating;
export default DayDependingEating; // memo, возможно быстрее будет загружатся лекарства в ячейке
