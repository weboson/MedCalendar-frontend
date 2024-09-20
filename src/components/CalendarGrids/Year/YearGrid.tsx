import moment, { Moment } from 'moment';
import { FC, useEffect, useState } from 'react';
import {
  CellDay,
  CellWeek,
  GridWrapperYear,
  MothTitle,
  WrapperMothCell,
  WrapperWeek,
  WrapperYear,
  СellMonths,
} from './stylesYearGrid/sc_YearGrid';
import { IRecipeRepository } from '../../../types/types';
import { RecipeService } from '../../../services/recipe.service';
import { toast } from 'react-toastify';
//  data
// import recipesMedications from '../../../data/localDataBase/LocalDB_WaysUsing';

interface IProps {
  currentDate: Moment;
}

const YearGrid: FC<IProps> = ({ currentDate }) => {

  // const max =  moment.max(moment(), moment().add(5, 'years')).format('YYYY-MM-DD')
  // console.log(max)

  // самое ранее начало курса (приёма лекарств)
  const [minStart, setMinStart] = useState(moment());
  //* максимальный большой курс (использую moment.max(moment(...), moment(...)))
  const [maxDuration, setMaxDuration] = useState(moment());

  const calcMaxDuration = (recipes: Array<IRecipeRepository>) => {
    if (recipes.length > 0) {
      // const result = recipes.map((item, index) => {

      // });
      // нахожу самое ранее начало курса (приёма лекарств) 
      const minStart = moment.min(recipes.map((item) => moment(item.start)))
      setMinStart(minStart)
      // нахожу самое длителное время из курса
      const maxCourse = moment.max(recipes.map((item) => (moment().add(item.duration.index, item.duration.title)) ))
      setMaxDuration(maxCourse);
      // console.log(minStart)
      // console.log(maxCourse)
    }
  };

  // ! GetAll рецепты
  // const [data, setData] = useState<IRecipeRepository[]>([]); // все рецепты из БД
  //! метод: получить весь список рецептов
  const getAllRecipes = async () => {
    const response = await RecipeService.getAll();
    // setData(response)
    calcMaxDuration(response);
    toast.success('Рецепты: загружены');
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  moment.updateLocale('ru', { week: { dow: 1 } }); // неделя начинается с понедельника

  // начало первого месяца в году: 1-е январь
  const firstMonth = currentDate.clone().month(0).startOf('month');

  const ArrayMonths = [...new Array(12)].map((_, i) =>
    firstMonth.clone().add(i, 'month'),
  );

  // закрашивает серым цветом самый большой интервал от начала курса (start) до кончания (duration)
  let indicator = false;
  const marker = (bool: boolean) => {
    indicator = bool; // true/fasle
    return null;
  };

  return (
    <WrapperYear>
      <GridWrapperYear>
        {ArrayMonths.map((monthItem, index) => (
          <WrapperMothCell
            key={index + 1}
            $isCurrentMonth={monthItem.isSame(moment(), 'month') ? true : false}
          >
            <MothTitle>{monthItem.format('MMMM')}</MothTitle>

            {/* Week */}
            <WrapperWeek>
              {[...Array(7)].map((_, indx) => (
                <CellWeek key={indx + 2}>
                  {moment()
                    .day(indx + 1)
                    .format('ddd')}
                </CellWeek>
              ))}
            </WrapperWeek>

            <СellMonths key={index + 3}>
              {[...new Array(42)].map((_, i) => {
                // сохраню хоть что-то в переменную, чтобы не дублировать код
                const iDay = monthItem
                  .clone()
                  .startOf('month')
                  .startOf('week')
                  .add(i, 'day'); // переменная каждого дня

                // расчет интервала (курс приёма лекарств)
                ((iDay >= minStart) && iDay <= maxDuration) ? marker(true) : marker(false)

                return (
                  <CellDay
                    key={i}
                    $isCurrentDay={
                      iDay.isSame(currentDate, 'day') &&
                      monthItem.isSame(currentDate, 'month')
                    }
                    $isCurrentDaysOfMonth={
                      iDay.isSame(currentDate, 'month') &&
                      monthItem.isSame(currentDate, 'month')
                    }
                    $isMedicines={indicator}
                  >
                    {iDay.format('D')}
                  </CellDay>
                );
              })}
            </СellMonths>
          </WrapperMothCell>
        ))}
      </GridWrapperYear>
    </WrapperYear>
  );
};

export default YearGrid;
