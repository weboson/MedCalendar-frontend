// вывод сетки ячеек (42 штуки)
import { FC, useEffect, useState} from 'react';
import { Moment } from 'moment'; // Moment - это специальный тип для TS
import {
  GridWrapper,
  CellWrapper,
  RowInCell,
  DayWrapper,
  CurrentDay,
  MonthWrapper,
  DayContent,
} from './stylesMonthGrid/sc_MonthGrid';
import moment from 'moment';
import MedicinesMonth from './MedicinesMonth';
// data
// import recipesMedications from '../../../data/localDataBase/LocalDB_WaysUsing';
import { arrayColors } from '../../../data/colors';
import MyPopup from '../../myPopup/MyPopup';
import CounterMonth from './CounterMonth';
import MyPopupList from './MyPopupList';
import { IRecipeRepository } from '../../../types/types';
import { RecipeService } from '../../../services/recipe.service';
import { toast } from 'react-toastify';

interface IProps {
  firstDayOfWeek: Moment;
  currentDate: Moment;
}

const MonthGrid: FC<IProps> = ({ firstDayOfWeek, currentDate }) => {
  
  // ! GetAll рецепты
  const [data, setData] = useState<IRecipeRepository[]>([]); // все рецепты из БД
 //! метод: получить весь список рецептов
  const getAllRecipes = async () => {
    const response = await RecipeService.getAll();
    // console.log(response);
    // установить полученные данные
    setData(response);
    toast.success('Рецепты: загружены');
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  // чтобы не мутировать исходник, делаем копию объекта (clone от moment), а не ссылки объекта
  const day = firstDayOfWeek.clone().subtract(1, 'day'); // -1 день для смещения отчета на 1 день, иначе календарь врёт на 1 день
  // и прибавлям каждую итерацию +1 день и выводим его, но не меняем исходник, ведь мы клонируем clone()
  const daysArray = [...new Array(42)].map(() => day.add(1, 'day').clone());

  // проверка на текущий день, чтобы его маркировать
  const isCurrentDay = (day: object) => currentDate.isSame(day, 'day');
  // подцветка дней входящие в выбранный месяц
  const $isSelecctedMonth = (day: object) => currentDate.isSame(day, 'month');

  //! цветные иконки лекарств (также как и WeekGrid.tsx)):
  // массив цветов (arrayColors) генерируется в Colors.ts - в отдельном файле, т.к. генерируется 1 раз (для решения бага: если ЛС исчезнет, и если он снова появится, то уже без цвета )
  // назначение стилей
  useEffect(() => {
    data.map((itemMed, index) => {
      // const color = getRandomColor();
      for (const elem of document.querySelectorAll(
        `.medElemUnic${itemMed.id}`, // пример классов: medElemUnic6, medElemUnic7, medElemUnic12 etc - (таким же методом назанченные в InDependently.tsx и тд.)
      )) {
        elem.style.cssText += `color: ${arrayColors[index] || 'white'};`;
      }
    });
  });

  // создание счетчика
  let count = 0;

  return (
    <MonthWrapper>
      {/* Weekday headers */}
      <GridWrapper $isHeader={1}>
        {[...Array(7)].map((_, indx) => (
          <CellWrapper $isHeader={1} key={indx} $isSelecctedMonth={true}>
            <RowInCell $justifyContent={'flex-end'} $pr={1}>
              {moment()
                .day(indx + 1)
                .format('ddd')}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>

      {/* Days Grid */}
      <GridWrapper>
        {/* //! 42 ячейки .map() */}
        {daysArray.map((dayItem, index) => (
          // каждая ячейка
          <CellWrapper
            key={dayItem.unix()}
            $isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
            $isSelecctedMonth={$isSelecctedMonth(dayItem)}
          >
            {/* вывод числа месяца */}
            <RowInCell $justifyContent={'flex-end'}>
              <DayWrapper>
                {!isCurrentDay(dayItem) ? (
                  dayItem.format('D')
                ) : (
                  <CurrentDay>{dayItem.format('D')}</CurrentDay>
                )}
              </DayWrapper>
            </RowInCell>

            {/* //! контент дня */}
            <DayContent>
              {data.map((medItem, index) => {
                if (
                  moment(medItem.start, 'YYYY-MM-DD') <= dayItem &&
                  dayItem < moment(medItem.start, 'YYYY-MM-DD')
                  .clone().add(medItem.duration.index, medItem.duration.title)
                ) {
                  //* счетчик (all meds current day)  
                  count++; 
                    // лекарства
                    return (
                      <MedicinesMonth
                        key={index}
                        med={medItem}
                        dayItem={dayItem}
                      />
                    );
                  }
                return null; // пустая ячейка
              })}
              {}
              {/* вывод счетчика + полный список ЛС каждой ячейки в MyPopupList*/}
              <CounterMonth index={index} count={count} dayItem={dayItem} />
              {/* //! список лекарств на текущий день (классы разные: id={`MyPopupList${index}`}) */}
              <MyPopupList dayItem={dayItem} index={index} recipes={data}/>
              {/*Вызываемая функция СБРОСА счетчика, в конце рендера каждой ячейки. обязательно должен быть return */}
              {(() => {
                count = 0; 
                return null;
              })()}
            </DayContent>
          </CellWrapper>
        ))}
      </GridWrapper>
      
      <MyPopup />
    </MonthWrapper>
  );
};

export default MonthGrid;
