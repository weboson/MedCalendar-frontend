//! КАЖДЫЙ СТОЛБИК (их всего 7) ячеек (48шт) - по пол часа на определенный день (datyItem)
import { FC, memo, useMemo } from 'react';
import { Moment } from 'moment';
// sc_styles
import { HalfHoursContent } from '../stylesWeekGrid/sc_WeekGrid';
import moment from 'moment';
import SpaceBetweenMeals from './components/SpaceBetweenMeals'; // график питания: первый и последний приём пищи
// import UsingMedicines from './components/medicines/UsingMedicines';
import MealSchedule from './components/MealSchedule';
import UsingMedicines from './components/medicines/UsingMedicines';
// Redux-Toolkit для получения данных состояния (идникатор для WarnigMarker)
import { useAppSelector } from '../../../../store/hooks';
import {
  IMealscheduleRepository,
  IRecipeRepository,
} from '../../../../types/types';

interface IProps {
  currentDate: Moment;
  dayItem: Moment;
  dataMealSchedule: IMealscheduleRepository | Object;
  recipes: Array<IRecipeRepository>; // рецепты их базы данных (WeekGrid.tsx)
  maxMealFood: number
}

const GridDayWithHours: FC<IProps> = memo(
  ({ currentDate, dayItem, dataMealSchedule, recipes, maxMealFood }) => {
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

    //! WarnigMarker: маркер ячейки, если текущее время совпадает со временем приёма лекарств:
    // учавствуют: WeekGrid.tsx, DependingBreakfast, DependingEating etc ... , HelperWarningMarker.tsx
    const warningMarker = useAppSelector((state) => state.markerWarning); // общий индикатор
    // текущий день, для Warning
    const currentDayForWirning = useMemo(
      () => dayItem.isSame(currentDate, 'day'),
      [dayItem, currentDate],
    );

    return ArrayHalfHoursContent.map((halfHourItem, hourIndex) => (
      // каждая ячейка 7 * 48
      <HalfHoursContent
        key={hourIndex + 3}
        $currentHour={
          // Условие (порядок важен): при 4:02 маркировался 4:00, а при 4:32 маркировка только 4:30 (но не 4:00). То есть интервалы по *:30 мин.
          halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
          moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
          moment().minute() - halfHourItem.minute() >= 0 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/false(-29)
          dayItem.isSame(currentDate, 'day') && // current day
          !warningMarker // не время приёма лекарства
        }
        $currentWarning={
          //! маркировка (пульсация) Warning
          halfHourItem.isSame(moment(), 'hour') && // проверить на текущий час
          moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
          moment().minute() - halfHourItem.minute() >= 0 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/false(-29)
          dayItem.isSame(currentDate, 'day') && // current day
          warningMarker // время приёма лекарства
        }
        // id for autoScrolling at the current hour
        id={
          halfHourItem.isSame(moment(), 'hour') &&
          moment().minute() - halfHourItem.minute() < 30 &&
          moment().minute() - halfHourItem.minute() >= 0 // проверим на текущий получас
            ? 'autoScroll'
            : ''
        } // scroll in Home.tsx
      >
        {/* //* icons Sun & Moon (space between firs и last eating)*/}
        {dataMealSchedule.id ? ( // если user создал график питания
          <SpaceBetweenMeals
            dayItem={dayItem}
            halfHourItem={halfHourItem}
            currentDate={currentDate}
            dataMealSchedule={dataMealSchedule}
          />
        ) : null}

        {/* //* icons Food (firs и last eating)*/}
        {dataMealSchedule.id ? ( // если user создал график питания
          <MealSchedule
            dayItem={dayItem}
            halfHourItem={halfHourItem}
            maxmealfood={maxMealFood}
            currentDate={currentDate}
            dataMealSchedule={dataMealSchedule}
          />
        ) : null}

        {/* //* for Using Medicines (расчет приёма лекарств) */}
        {recipes.map(
          (medItem, index) =>
            // для расчета интервала курса (дни/месяцы/годы приёма), временной диапазон приёмов ЛС, epm: курс 1 месяц, то есть интервал с 23 марта по 23 апреля
            moment(medItem.start, 'YYYY-MM-DD') <= dayItem &&
            // < - чтобы не было так: 5 дней приёма, превратились в 7 (если <= и =>)
            dayItem <
              moment(medItem.start, 'YYYY-MM-DD')
                .clone()
                .add(medItem.duration.index, medItem.duration.title) && (
              <UsingMedicines
                key={index}
                dayItem={dayItem}
                halfHourItem={halfHourItem}
                med={medItem}
                currentDayForWirning={currentDayForWirning}
                currentDate={currentDate}
              />
            ),
        )}
      </HalfHoursContent>
    ));
  },
);

export default GridDayWithHours; // memo, чтобы один раз столбик расчитался, а потом уже 6 раз из памяти рендерился
