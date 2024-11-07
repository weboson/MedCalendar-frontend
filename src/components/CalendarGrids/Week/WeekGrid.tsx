import { FC, useEffect, useMemo, useState } from 'react';
import {
  GridWrapper,
  DaySidePanel,
  WrapperSidePanel,
  HourSidePanel,
  WrapperTopPanelAndContent,
  DayOfWeek,
  WrapperColumn,
} from './stylesWeekGrid/sc_WeekGrid';
import moment, { Moment } from 'moment';
import GridDayWithHours from './WeekComponents/GridDayWithHours';
import MyPopup from '../../myPopup/MyPopup';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { readingMarkerWarning } from '../../../store/features/markerWarningSlice';
import { arrWarningCleare } from '../../../store/features/arrWarningSlice';
import { arrayColors } from '../../../data/colors';
import {
  IMealscheduleRepository,
  IRecipeRepository,
} from '../../../types/types';
import { toast } from 'react-toastify';
import { MealScheduleService } from '../../../services/mealschedule.service';
import { RecipeService } from '../../../services/recipe.service';

interface IProps {
  currentDate: Moment;
}

const WeekGrid: FC<IProps> = ({ currentDate }) => {
  // currentDate - это текущее время, которое автоматически обновляется (useEffect в Home.tsx) каждую минуту (60000 ms)
  // ! GetAll рецепты
  const [data, setData] = useState<IRecipeRepository[]>([]); // все рецепты из БД

  // для icons Food
  // выбираем самое большое количество приёмов Лекарств (из рецептов), например: 7 раз/день > 6 раз/день = 7: еда
  // для дочернего DayMealSchedule.tsx
  const [maxMealFood, setMaxMealFood] = useState(1);

  //* метод определения максимального количества приёма ЛС среди всех рецептов => number
  const calcMaxMealFood = (recipes: Array<IRecipeRepository>) => {
    // находим все рецепты, которые ЗАВИСИМЫ от еды
    if (recipes.length > 0) {
      const dependent = recipes.map((item) => {
        if (!item.independently) {
          // если рецепт зависит от еду (ставим icon food)
          return item;
        }
        return 0; // иначе будет некоторые индексы undefuned или null - потом перебор бывает ошибка
      });
      // console.log(dependent)

      // находим максимально частый приём лекраства (который зависит от еды)
      const arr = dependent.map((item) => {
        if (item !== 0) {
          return +item.quantity;
        }
        return 0; // нужен number
      });
      const maxQuantity = Math.max(...arr)

      // console.log(maxQuantity); // 3 приёма пищи ЛС, которое зависит от еды (иначе icon food будет у тех, которые не хависят от еды)
      setMaxMealFood(maxQuantity);
    }
  };

  //! метод: получить весь список рецептов
  const getAllRecipes = async () => {
    const response = await RecipeService.getAll();
    // console.log(response);
    // установить полученные данные
    setData(response);
    calcMaxMealFood(response);
    toast.success('Рецепты: загружены');
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  const dispatch = useAppDispatch();
  // состояние исходных данных
  const [dataMealSchedule, setDataMealSchedule] = useState<
    IMealscheduleRepository | Object
  >({});
  // Days of week (top panel)
  const ArrayDays = useMemo(
    () =>
      // useMemo, чтобы расчет проводился один раз, остальное из памяти кеша
      [...new Array(7)].map(
        (_, i) => currentDate.clone().startOf('week').add(i, 'day'), //currentDate - чтобы можно было "лестать" неделями в Monitor.tsx
      ),
    [currentDate],
  );

  // 24 Hours (side panel) HourSidePanel
  // Days of week (top panel)
  const ArrayHoursSidePanel = useMemo(
    () => [...new Array(24)].map((_, i) => currentDate.hours(i)),
    [currentDate],
  );

  // Memorization/Recovery Scroll position (сохраняет текущий скролл (в mode: Week), даже после перехода на другие компоненты - не нужно постоянно мотать до того места, где остановился)
  // Знак ! - в TS значит, что уверены, что объект не равен null или Uundefined
  useEffect(() => {
    //1 после события скроллинга пользователя - срабатывает сохраннение в sessionStorage(localStorage сохраняет даже после перезагрузки - нам это не нужно, на только после обновления)
    document
      .querySelector('#saveScrollWeek')!
      .addEventListener('scroll', function () {
        const currentScroll = document
          .querySelector('#saveScrollWeek')!
          .scrollTop.toString(); // получили текущий сролл (to String)
        sessionStorage.setItem('position', currentScroll); // сохранили в Storage
      });

    //2  получаем значение свойств scrollTop и используем его, чтобы скроллить на эту позицию
    // console.log(sessionStorage.getItem('position'))
    document
      .querySelector('#saveScrollWeek')!
      .scrollTo(0, +sessionStorage.getItem('position')!); // Знак ! - в TS значит, что уверены, что объект не равен null или Uundefined
  }, []);

  // WarnigMarker: маркер ячейки, если текущее время совпадает со временем приёма лекарств:
  // вызывается в DependingEating.tsx, DependingBreakfast и т.д, а использую в HelperWarningMarker.tsx;
  const arrWarning = useAppSelector((state) => state.arrWarning);
  useEffect(() => {
    if (arrWarning.arr.indexOf(true) != -1) {
      // arr.indexOf(item, from) ищет item начиная с индекса from и возвращает номер индекса, на котором был найден искомый элемент, в противном случае -1.
      dispatch(readingMarkerWarning(true)); // [false,fasle,true]
      dispatch(arrWarningCleare()); // очищаем массив
      return;
    } else if (arrWarning.arr.indexOf(false) != -1) {
      dispatch(readingMarkerWarning(false)); // [false,fasle,fasle]
      dispatch(arrWarningCleare()); // очищаем массив
    }
  }); // если в useEffect - нет зависимостей, то рендеринг будет при любом изменении компонента,
  // а именно каждые 60 сек - из-за currentDate

  // console.log(arrWarning.arr)
  //* цветные лекарства:
  // массив цветов (arrayColors) генерируется в Colors.ts - в отдельном файле, т.к. генерируется 1 раз (для решения бага: если ЛС исчезнет, и если он снова появится, то уже без цвета )
  // назначение стилей
  useEffect(() => {
    data.map((itemMed, index) => {
      // const color = getRandomColor();
      for (const elem of document.querySelectorAll<HTMLElement>(
        `.medElemUnic${itemMed.id}`, // пример классов: medElemUnic6, medElemUnic7, medElemUnic12 etc - (таким же методом назанченные в InDependently.tsx и тд.)
      )) {
        elem.style.cssText += `background-color: ${
          arrayColors[index] || 'white'
        };
          padding: 0 8px`;
      }
    });
  });
  // если без массива зависимостей, то будет при каждом измененеии менятся цвет.
  // С currenDate также будет себя вести, как без массива,
  // если пустой массива, то при 1-й загрузке

  //! Получение данных для MealSchedule (график питания: moon/son & icon food)
  //* метод получения данных
  const getMealSchedule = async () => {
    try {
      const response = await MealScheduleService.getAll();
      if (response) {
        // console.log(response)
        //* устанавливаем полученные с БД данные в: первые и последние питания на weekday/weekend
        setDataMealSchedule(response[0]); // исходные данные
        toast.success('График питания: загружен');
        return response;
      }
    } catch (err: any) {
      const error = await err.response?.data.message; // если есть response то ...
      console.log(error?.toString()); // для отладки
      toast.error('Создайте график питания, либо войдите в систему');
    }
  };
  // toggle- перключатель (реагирующий <, today, >) для подгрузки новых данных для DayGrid, Week
  useEffect(() => {
    getMealSchedule();
  }, []);

  return (
    <GridWrapper id="saveScrollWeek">
      {/* Side Panel */}
      <WrapperSidePanel>
        {/* Title: "Day" */}
        <DaySidePanel>Day</DaySidePanel>
        {/* Hours (Side Panel) */}
        {ArrayHoursSidePanel.map((HourSideItem, index) => (
          <HourSidePanel
            key={index}
            $currentSideHour={HourSideItem.hours(index).isSame(
              moment(),
              'hour',
            )}
          >
            {HourSideItem.hour(index).format('H:00 A')}
            {/* {HourSideItem.hour(index).format('LTS')} */}
          </HourSidePanel>
        ))}
      </WrapperSidePanel>

      {/* Days of Week (Top Panel) */}

      <WrapperTopPanelAndContent>
        {ArrayDays.map((dayItem, index) => (
          <WrapperColumn key={index + 1}>
            <DayOfWeek
              key={index + 2}
              $currentDay={dayItem.isSame(moment(), 'day')}
            >
              {dayItem.format('dddd, D')}
            </DayOfWeek>

            {/* Grid Day with Hours (Content) */}
            <GridDayWithHours
              currentDate={currentDate}
              dayItem={dayItem}
              dataMealSchedule={dataMealSchedule}
              recipes={data}
              maxMealFood={maxMealFood}
            />
          </WrapperColumn>
        ))}
        {/* При наведении на лекарство - появляется Popup-окно с подробным описанием ЛС */}
        {/* Обработчик в UsingMedicines.tsx */}
        <MyPopup />
      </WrapperTopPanelAndContent>
    </GridWrapper>
  );
};

// export default WeekGrid;
export default WeekGrid; // memo, чтобы один раз столбик расчитался, а потом уже 6 раз из памяти рендерился
