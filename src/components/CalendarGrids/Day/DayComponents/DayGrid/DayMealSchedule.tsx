//! Режим питания:  Маркировка (icon food) моментов приёма пищи в таблице времени и дней недели (weekday, weekend)
//! 2 вида: в будни и выходные (также как и режимы дня (Moon, Sun))
// как в Week
import { Moment } from 'moment';
import { FC, memo, useMemo } from 'react';
import { MdOutlineFastfood } from 'react-icons/md';
import { FoodTooltip, StyleIconFood } from '../../stylesDayGrid/sc_DayGrid';
import { IMealscheduleRepository, IRecipeRepository } from '../../../../../types/types';


interface IProps {
  halfHourItem: Moment
  maxmealfood: number
  currentDate: Moment
  dataMealSchedule: IMealscheduleRepository | Object
}

const DaydataMealSchedule: FC<IProps> = memo(
  ({ halfHourItem, currentDate, maxmealfood, dataMealSchedule }) => {
    // приёмы пищи (для дочерних компонентов):
    // входящий тип данных {hour: 8, minute: 0}
    // установка времени относительно динамичному currentDate,
    // exem: moment().set({'year': 2024, 'month': 3, 'date': 1})
  //! Тут данные изменяются, поэтому я передал Исходные данные и не стал делать общими с DaySpaceBetweenMeals.tsx, иначе они будут изменятся и отражатся на DaySpaceBetweenMeals
    //* weekday
    // 1-й приём пищи.
    const firstMealWeekdays = currentDate
      .set({
        hour: dataMealSchedule.weekday[0],
      })
      .clone(); // обз clone() иначе изменим исходник

    // последний приём пищи
    const lastMealWeekdays = currentDate
      .set({
        hour: dataMealSchedule.weekday[1],
      })
      .clone();

    //* интервал (промежуточные приёмы пищи): diff - это разница в moment
    // время между 1-м и последним приёмом пищи = последняя еда - первая еды, вычист по секундам (точнее, чем минуты/часы)
    const diffIntervalMealWeekdays = useMemo(
      () => lastMealWeekdays.diff(firstMealWeekdays, 'seconds'),
      [lastMealWeekdays, firstMealWeekdays],
    ); // 50400000 в миллисекундах (~14 часов), чтобы интервалы были одинаковыми  - разница (инервал времени между 1-м и last едой)
    //console.log(diffIntervalMealWeekdays) // 50400000
    // интервал времени / количество приёма Лекарств
    // -1 потому что (в начале завтрак -1)
    const betweenMealsWeekdays = useMemo(
      () => Math.floor(diffIntervalMealWeekdays / +(maxmealfood-1)),
      [diffIntervalMealWeekdays, maxmealfood],
    ); // 50400000(~14 ч) / 3-1раз/день = 3.5 часа -
    // console.log(betweenMealsWeekdays); // 3 (каждые три часа принимать пищу, так как принимать таблетку после еды)

    //* weekend
    // тоже самое только weekend
    const firstMealWeekend = currentDate
      .set({
        hour: dataMealSchedule.weekend[0],
      })
      .clone();

    const lastMealWeekend = currentDate
      .set({
        hour: dataMealSchedule.weekend[1],
      })
      .clone();

    const diffIntervalMealWeekend = useMemo(
      () => lastMealWeekend.diff(firstMealWeekend, 'seconds'),
      [lastMealWeekend, firstMealWeekend],
    );
    const betweenMealsWeekend = useMemo(
      () => Math.floor(diffIntervalMealWeekend / +(maxmealfood-1)),
      [diffIntervalMealWeekend, maxmealfood],
    );

      // есть ли зависимость от еды?
      return (
        <>
          {
            // Оптимальный код(где важен порядок и сравнения), иначе при изменении минут в localDB_dataMealSchedule - могут пропасть приёмы пищи
            //weekday
            currentDate.day() !== 6 && currentDate.day() !== 0
              ? (halfHourItem.isSame(firstMealWeekdays, 'hour') &&
                  firstMealWeekdays.minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:21 >= 0  and < 30
                  firstMealWeekdays.minute() - halfHourItem.minute() < 30 && (
                    <FoodTooltip data-title="Приём пищи" key={1}>
                      <StyleIconFood>
                        <MdOutlineFastfood size={30}/>
                      </StyleIconFood>
                    </FoodTooltip>
                  )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
                [...new Array(maxmealfood)].map((_, index) =>
                  //ячейку.сравнить(время первого завтрака + (интервал времени, по секундам), сравнить по 'часам')
                  halfHourItem.isSame(
                    firstMealWeekdays.add(betweenMealsWeekdays, 's'),
                    'hour',
                  ) && // схравнение по часу
                  firstMealWeekdays
                    .clone()
                    .add(betweenMealsWeekdays, 'm')
                    .minute() -
                    halfHourItem.minute() >=
                    0 &&
                  firstMealWeekdays
                    .clone()
                    .add(betweenMealsWeekdays, 'm')
                    .minute() -
                    halfHourItem.minute() <
                    30 ? (
                    <FoodTooltip data-title="Приём пищи" key={index + 2}>
                      <StyleIconFood>
                        <MdOutlineFastfood size={30}/>
                      </StyleIconFood>
                    </FoodTooltip>
                  ) : null,
                )
              : // weekend
                (halfHourItem.isSame(firstMealWeekend, 'hour') &&
                  firstMealWeekend.minute() - halfHourItem.minute() >= 0 && // 22:30 - 22:00 >= 0  and < 30
                  firstMealWeekend.minute() - halfHourItem.minute() < 30 && (
                    <FoodTooltip data-title="Приём пищи" key={22}>
                      <StyleIconFood>
                        <MdOutlineFastfood size={30}/>
                      </StyleIconFood>
                    </FoodTooltip>
                  )) || // промежуточные приёмы пищи, количество, которых зависят от приёмов лекарств (зависящие от еды)
                [...new Array(maxmealfood)].map((_, index) =>
                  //ячейку.сравнить(время первого завтрака + (интервал времени, по секундам), сравнить по 'часам')
                  halfHourItem.isSame(
                    firstMealWeekend.add(betweenMealsWeekend, 's'),
                    'hour',
                  ) && // схравнение по часу
                  firstMealWeekend
                    .clone()
                    .add(betweenMealsWeekend, 'm')
                    .minute() -
                    halfHourItem.minute() >=
                    0 &&
                  firstMealWeekend
                    .clone()
                    .add(betweenMealsWeekend, 'm')
                    .minute() -
                    halfHourItem.minute() <
                    30 ? ( // схравнение по минуте
                    <FoodTooltip data-title="Приём пищи" key={index + 22}>
                      <StyleIconFood>
                        <MdOutlineFastfood size={30}/>
                      </StyleIconFood>
                    </FoodTooltip>
                  ) : null,
                )
          }
        </>
      );

  },
);

export default DaydataMealSchedule;