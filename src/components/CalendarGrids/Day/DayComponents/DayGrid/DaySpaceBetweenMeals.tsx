//! Icons: Moon и Sun
// График питания - Промежуток времени между 1-м и последним приёмом пищи: 2 вида режима: в будни и в выходные
// (как в Week () только вместо dayItem меняющийся (в меню < ToDay >) currentDate)
import { FC } from 'react';
import { Moment } from 'moment';
import { GoSun } from 'react-icons/go';
import { BsMoon } from 'react-icons/bs';
import { stylesMoon, stylesSun } from '../../stylesDayGrid/sc_DayGrid';

interface IMeal {
  firstMealWeekdays: Moment
  lastMealWeekdays: Moment
  firstMealWeekend: Moment
  lastMealWeekend: Moment
}

interface IProps {
  halfHourItem: Moment;
  currentDate: Moment;
  meal: IMeal; // только для этого компонента, расчеты вынесены в родитель, протсо потом понял, что у каждого свои рачсеты и они меняются
}

const DaySpaceBetweenMeals: FC<IProps> = ({
  halfHourItem,
  currentDate,
  meal,
}) => {
  // console.log(meal); //{firstMealWeekdays: Moment, lastMealWeekdays: Moment, firstMealWeekend: Moment, lastMealWeekend: Moment}

  // meal = это расчеты первые и последние приёмы пищи для weekday и weekend
  // meal = {firstMealWeekdays: Moment, lastMealWeekdays: Moment, firstMealWeekend: Moment, lastMealWeekend: Moment}
  if (meal.firstMealWeekdays) {
    return (
      <>
        {/* at weekday */}
        {/* //* .isSameOrAfter/.isSameOrBefore аналог оперторы >=/<= (оставлю два варианта))  */}
        {currentDate.day() !== 6 && currentDate.day() !== 0 ? (
          halfHourItem.isSame(meal.firstMealWeekdays, 'minute') || // || - иначе на 30 мин позже маркирует
          (halfHourItem.isSameOrAfter(meal.firstMealWeekdays) && // 8:00 >= 8:00 (weekdays)
            halfHourItem.isSameOrBefore(meal.lastMealWeekdays)) ? ( // 8:00 <= 22:00
            <GoSun style={stylesSun} size={28} />
          ) : (
            <BsMoon style={stylesMoon} size={28} />
          ) // "weekend"
        ) : currentDate.day() == 6 || currentDate.day() == 0 ? (
          halfHourItem.isSame(meal.firstMealWeekend, 'minute') || // || - иначе на 30 мин позже маркирует
          (halfHourItem >= meal.firstMealWeekend &&
            halfHourItem <= meal.lastMealWeekend) ? (
            <GoSun style={stylesSun} size={28} />
          ) : (
            <BsMoon style={stylesMoon} size={28} />
          )
        ) : null}
      </>
    );
  }
};

export default DaySpaceBetweenMeals;
