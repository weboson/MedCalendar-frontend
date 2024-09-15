//! Home page
//* в moment.js месяцы начинаются с 0 по 11
import { FC, useEffect } from 'react';
import Monitor from '../components/Monitor/Monitor';
import YearGrid from '../components/CalendarGrids/Year/YearGrid';
import MonthGrid from '../components/CalendarGrids/Month/MonthGrid';
import { menuModesDate } from '../data/dataMenu';
import { useAppSelector } from '../store/hooks';
import WeekGrid from '../components/CalendarGrids/Week/WeekGrid';
import Day from '../components/CalendarGrids/Day/Day';
import { useOutletContext } from 'react-router-dom';
import { Moment } from 'moment';

//type для констант context-а
interface ArrayContextType extends Array<Moment> {}

const Home: FC = () => {
    //! текущее время (currentDate) передается, как context из <Outlet context={f}/> - файл Lauout.tsx 
    const [currentDate, prevHandler, todayHandler, nextHandler] = useOutletContext<ArrayContextType>(); //! useOutletContext - это из react-router-dom (чтобы передать пропсы)

  
    const firstDayOfWeek = currentDate.clone().startOf('month').startOf('week'); // стартовый день: 01.понедельник.2023
  
    // auto scroll "week"/"Day"for id=#autoScroll: 
    // если данный код установить прямо в GridDayWithHours.tsx - то автоскролл каждый раз при переключении на Week
    // в GridDayWithHours.tsx, ListDayHalfHours.tsx есть элемент с id=#autoScroll
    useEffect(() => {
      setTimeout(
        () =>
          // автосролл
          document
            .querySelector('#autoScroll')! //Знак ! - в TS значит, что уверены, что объект не равен null или Uundefined
            .scrollIntoView({
              // https://learn.javascript.ru/size-and-scroll-window#scrollintoview
              behavior: 'smooth',
              block: 'center',
              inline: 'center',
            }),
  
        1200,
      );
    }, []);


  // выбранный режим меню (day, week, month, year)
  const indexMenu = useAppSelector((state) => state.menu); // из Readux-toolkit
  // console.log(renderMeds)
  return (
    <>
      <Monitor
        currentDate={currentDate}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />

      {
        // mode menu: Day, Week, Month, Year
        menuModesDate[indexMenu].title == 'Day' ? (
          <Day currentDate={currentDate} />
        ) : menuModesDate[indexMenu].title == 'Week' ? (
          <WeekGrid currentDate={currentDate} />
        ) : menuModesDate[indexMenu].title == 'Month' ? (
          <MonthGrid
            firstDayOfWeek={firstDayOfWeek}
            currentDate={currentDate || null}
          />
        ) : menuModesDate[indexMenu].title == 'Year' ? (
          <YearGrid currentDate={currentDate} />
        ) : menuModesDate[indexMenu].title == 'Recipes' ? ( // RecipesPage 
          <Day currentDate={currentDate} />) : null
      }
    </>
  );
};

export default Home;
