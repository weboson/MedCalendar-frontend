//! приём лекарств: каждая ячейка проверяет на соответсвие с каждым лекарством в массиве:
// 7 столбов * 48 получасов в день * 22 элментов в массиве рецептов = 1056
import { Moment } from 'moment';
import { FC, memo, useMemo } from 'react';
import DayDependingEating from './dayMedComponents/DayDependingEating';
import DayDependingBreakfast from './dayMedComponents/DayDependingBreakfast';
import DayDependingSupper from './dayMedComponents/DayDependingSupper';
import DayInDependently from './dayMedComponents/DayInDependently';
import { useAppDispatch } from '../../../../../store/hooks';
import { chosenMedicineID } from '../../../../../store/features/chosenMedicineDaySlice';
// import { mealSchedule } from '../../../../../data/localDataBase/localDB_MealSchedule';
import { IMealSchedule, IMealscheduleRepository, IRecipeRepository } from '../../../../../types/types';

interface IProps {
  halfHourItem: Moment;
  med: IRecipeRepository;
  currentDate: Moment;
  currentDayForWirning: boolean
  dataMealSchedule: IMealscheduleRepository | IMealSchedule
}

const DayUsingMedicines: FC<IProps> = memo(
  ({ halfHourItem, med, currentDate, currentDayForWirning, dataMealSchedule }) => {
    // weekday: интервал между первым и последней едой
    const firstMealWeekdays = useMemo(
      () =>
        currentDate
          .set({
            hour: +dataMealSchedule.weekday[0],
          })
          .clone(), // обз clone() иначе изменим исходник
      [currentDate],
    );

    const lastMealWeekdays = useMemo(
      () =>
        currentDate
          .set({
            hour: +dataMealSchedule.weekday[1],
          })
          .clone(),
      [currentDate],
    );

    const diffIntervalMealWeekdays = useMemo(
      () => lastMealWeekdays.diff(firstMealWeekdays, 'seconds'),
      [firstMealWeekdays, lastMealWeekdays],
    );

    const betweenMealsWeekdays = useMemo(
      () => diffIntervalMealWeekdays / (med.quantity - 1),
      [diffIntervalMealWeekdays, med.quantity],
    );

    // weekend: интервал между первым и последней едой
    const firstMealWeekend = useMemo(
      () =>
        currentDate
          .set({
            hour: +dataMealSchedule.weekend[0],
          })
          .clone(),
      [currentDate],
    ); // обз clone() иначе изменим исходник

    const lastMealWeekend = useMemo(
      () =>
        currentDate
          .set({
            hour: +dataMealSchedule.weekend[1],
          })
          .clone(),
      [currentDate],
    );

    const diffIntervalMealWeekend = useMemo(
      () => lastMealWeekend.diff(firstMealWeekend, 'seconds'),
      [lastMealWeekend, firstMealWeekend],
    );
    const betweenMealsWeekend = diffIntervalMealWeekend / (med.quantity - 1);

    //! обработчик клика для Recipte окна (Day)
    //Redux-toolkit - из hooks.tsx - для изменения данных
    const dispatch = useAppDispatch();
    const ClickOnMedicine = (): void => {
      // alert(med.id)
      // передаем данные (id лекарства)
      // метод как readingPopupData в Week
      dispatch(chosenMedicineID(med.id));
    }

    if (!med.independently) { // галочка в форме (приём лекарства независмо от еды и т.д.)
      //==================================== есть ли зависимости от завтрака/ужина/еды/
      //* если есть, то какая (еда, завтрак, ужин)?
      switch (med.action) {
        // ---------------------------------
        case 'eating': // =====================================от еды
          //* до, вовремя или после
          return (
            <div
              onClick={ClickOnMedicine}
              style={{ cursor: 'help', maxWidth: 'fit-content' }}
            >
              <DayDependingEating
                halfHourItem={halfHourItem}
                firstMealWeekdays={firstMealWeekdays}
                betweenMealsWeekdays={betweenMealsWeekdays}
                firstMealWeekend={firstMealWeekend}
                betweenMealsWeekend={betweenMealsWeekend}
                med={med}
                currentDate={currentDate}
                currentDayForWirning={currentDayForWirning}
              />
            </div>
          );
          break;

        // ---------------------------------
        case 'first breakfast': //============================= от первого завтрака
          return (
            <div
              onClick={ClickOnMedicine}
              style={{ cursor: 'help', maxWidth: 'fit-content' }}
            >
              <DayDependingBreakfast
                halfHourItem={halfHourItem}
                firstMealWeekdays={firstMealWeekdays}
                firstMealWeekend={firstMealWeekend}
                med={med}
                currentDate={currentDate}
                currentDayForWirning={currentDayForWirning}
              />
            </div>
          );

          break;
        // ---------------------------------
        case 'last supper': //================================= от последнего ужина
          return (
            <div
              onClick={ClickOnMedicine}
              style={{ cursor: 'help', maxWidth: 'fit-content' }}
            >
              <DayDependingSupper
                halfHourItem={halfHourItem}
                lastMealWeekdays={lastMealWeekdays}
                lastMealWeekend={lastMealWeekend}
                med={med}
                currentDate={currentDate}
                currentDayForWirning={currentDayForWirning}
              />
            </div>
          );
          break;

        // ---------------------------------
        default:
          break;
      }
    } else {
      //======================================================= ВНЕ ЗАВИСИМОСТИ ОТ ЕДЫ
      return (
        <div
          onClick={ClickOnMedicine}
          style={{ cursor: 'help', maxWidth: 'fit-content' }}
        >
          <DayInDependently
            halfHourItem={halfHourItem}
            firstMealWeekdays={firstMealWeekdays}
            betweenMealsWeekdays={betweenMealsWeekdays}
            firstMealWeekend={firstMealWeekend}
            betweenMealsWeekend={betweenMealsWeekend}
            med={med}
            currentDate={currentDate}
            currentDayForWirning={currentDayForWirning}
          />
        </div>
      );
    }
  },
);

export default DayUsingMedicines; // memo, возможно быстрее будет загружатся лекарства в ячейке
