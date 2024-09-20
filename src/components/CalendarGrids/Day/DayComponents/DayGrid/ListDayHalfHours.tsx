import { Moment } from 'moment';
import { FC, useMemo } from 'react';
import {
  HalfHoursContent,
  WrapperFlexMedicines,
} from '../../stylesDayGrid/sc_DayGrid';
import moment from 'moment';
import TimeLine from './TimeLine';
// расчет режима дня (для Moon, Sun) - for DataBase
import DaySpaceBetweenMeals from './DaySpaceBetweenMeals';
// режим митания. icon food
import DayMealSchedule from './DayMealSchedule';
import DayUsingMedicines from '../dayMedicines/DayUsingMedicines';
import { useAppSelector } from '../../../../../store/hooks';
import {
  IMealSchedule,
  IMealscheduleRepository,
  IRecipeRepository,
} from '../../../../../types/types';

interface IMeal {
  firstMealWeekdays: Moment;
  lastMealWeekdays: Moment;
  firstMealWeekend: Moment;
  lastMealWeekend: Moment;
}

interface IProps {
  currentDate: Moment;
  meal: Promise<IMeal> | Object;
  dataMealSchedule: IMealscheduleRepository | IMealSchedule;
  recipes: Array<IRecipeRepository>; // рецепты их базы данных (DayGrid.tsx)
  maxMealFood: number
}

const ListDayHalfHours: FC<IProps> = ({
  currentDate,
  meal,
  dataMealSchedule,
  recipes,
  maxMealFood,
}) => {

  // 48 Half Hours  (content), exemple: 0:00, 0:30, 1:00
  const ArrayHalfHoursContent = useMemo(
    () =>
      [...new Array(48)].map((_, i) =>
        currentDate
          .startOf('day')
          .clone()
          .add(i * 30, 'm'),
      ),
    [currentDate],
  );

  // WarnigMarker: маркер ячейки, если текущее время совпадает со временем приёма лекарств:
  // учавствуют: WeekGrid.tsx, DependingBreakfast, DependingEating etc ... , HelperWarningMarker.tsx
  const warningMarker = useAppSelector((state) => state.markerWarning); // общий индикатор
  // текущий день, для Warning
  const currentDayForWirning = useMemo(
    () => currentDate.isSame(currentDate, 'day'),
    [currentDate],
  );

  return ArrayHalfHoursContent.map((halfHourItem, hourIndex) => (
    <HalfHoursContent
      key={hourIndex + 3}
      $currentHalfHour={
        // Условие (порядок важен): при 4:02 маркировался 4:00, а при 4:32 маркировка только 4:30 (но не 4:00). То есть интервалы по *:30 мин.
        halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
        moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
        moment().minute() - halfHourItem.minute() >= 0 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/false(-29)
        !warningMarker // не время приёма лекарства
      }
      // id for autoScrolling at the current hour
      id={
        halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
        moment().minute() - halfHourItem.minute() < 30 &&
        moment().minute() - halfHourItem.minute() >= 0 // проверим на текущий получас
          ? 'autoScroll'
          : ''
      } // scrolling in Home.tsx
      $currentWarning={
        //! маркировка (пульсация) Warning
        halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
        moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
        moment().minute() - halfHourItem.minute() >= 0 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/false(-29)
        currentDate.isSame(currentDate, 'day') && //! ? current day
        warningMarker // время приёма лекарства
      }
    >
      {/* // Временная ШКАЛА - линия */}
      {
        // текущее время - для временной шкалы, как и с $currentHalfHour
        halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
          moment().minute() - halfHourItem.minute() < 30 &&
          moment().minute() - halfHourItem.minute() >= 0 && ( // проверим на текущий получас
            <TimeLine currentDate={currentDate} />
          )
      }

      {/* //* icons Sun & Moon (space between firs и last eating)*/}
      <DaySpaceBetweenMeals
        meal={meal}
        halfHourItem={halfHourItem}
        currentDate={currentDate}
      />
      {/* icon food */}
      {dataMealSchedule.weekday ? ( // если user создал график питания
        <DayMealSchedule
          halfHourItem={halfHourItem}
          currentDate={currentDate}
          maxmealfood={maxMealFood}
          dataMealSchedule={dataMealSchedule}
        />
      ) : null}

      {/* for Using Medicines (расчет приёма лекарств) */}
      {recipes.length > 0 && dataMealSchedule.weekday ? (
        <WrapperFlexMedicines>
          {recipes.map(
            (medItem, indx) =>
              // для расчета интервала курса (дни/месяцы/годы приёма), временной диапазон приёмов ЛС, epm: курс 1 месяц, то есть интервал с 23 марта по 23 апреля
              moment(medItem.start, 'YYYY-MM-DD') <= currentDate &&
              // < - чтобы не было так: 5 дней приёма, превратились в 7 (если <= и =>)
              currentDate <
                moment(medItem.start, 'YYYY-MM-DD')
                  .clone()
                  .add(+medItem.duration.index, medItem.duration.title) && (
                <DayUsingMedicines
                  key={indx}
                  halfHourItem={halfHourItem}
                  med={medItem}
                  currentDate={currentDate}
                  currentDayForWirning={currentDayForWirning}
                  dataMealSchedule={dataMealSchedule}
                />
              ),
          )}
        </WrapperFlexMedicines>
      ) : null}
    </HalfHoursContent>
  ));
};

export default ListDayHalfHours;
