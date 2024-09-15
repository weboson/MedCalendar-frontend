//! Главный шаблон "Layout" (из react-router-dom):
// в нем header, monitor + уникальный контент (Outlet) + footer(которого у меня нет)
// видео с поясением: https://www.youtube.com/watch?v=ApftxkYnXdo&ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9
import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; // означет главный шаблон для всех компонентов (всё что находится в массиве в router.tsx)
import styled from 'styled-components';
import { Header } from '../components/Header/Header';
import { Moment } from 'moment';
import moment from 'moment';
import currentMoment from '../data/currentMoment';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { modesMonitor } from '../data/modesMonitor'; // МАССИВ режимов отображения в Monitor
import { readingToggle } from '../store/features/toggleButtonsMonitorSlice';

// sc-style
const ShadowWrapper = styled('div')`
  width: 100%;
`;

const Layout: FC = () => {
  const dispatch = useAppDispatch();
  const toggle = useAppSelector((state) => state.toggle);

  //! текущее время currentDate
  const [currentDate, setToday] = useState<Moment>(currentMoment || ''); // currentDate в currentDate.ts

  // redux-toolkit
  const index = useAppSelector((state) => state.menu);
  const mode: string = modesMonitor[index].mode; // 'day','week','month','year' (режим отображения контента в '/'(home))

  //  For dinamic (update) time (чтобы не нужно было обновлять каждый раз, когда время изменилось и обновлялись компоненты)
  useEffect(() => {
    const timer = setInterval(() => {
      // если currentDate !не равна текущему времени, значит изменить его в текущее время
      !currentDate.isSame(moment()) && setToday(moment());
      // шаблон для установки времени: moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss");
      //- setToday(moment('30.04.2024', 'DD.MM.YYYY'))
      //  или setToday(moment('7:00', 'hh:mm')) - время почему-то не устанавливается
      // - для проверки зависимсоти от установленного нами текущей даты
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  });

  // обработчики для кнопок <, today и >
  // (prev) => prev - это конструкция от useState
  const prevHandler = () => {
    setToday((prev) => prev.clone().subtract(1, mode));
    dispatch(readingToggle(!toggle)); // датчик для подгрузку актулаьных данных (Mealschedules) для DayGrid, Week
  };
  const todayHandler = () => {
    setToday(moment());
    dispatch(readingToggle(!toggle));
  };
  const nextHandler = () => {
    setToday((next) => next.clone().add(1, mode));
    dispatch(readingToggle(!toggle));
  };

  return (
    <>
      <ShadowWrapper>
        <Header />
        {/*//! Outlet - это уникальный контент (Home.tsx, Recipes.tsx etc. but not ErrorPage.tsx) от 'react-router-dom'*/}
        <Outlet
          context={[currentDate, prevHandler, todayHandler, nextHandler]}
        />
      </ShadowWrapper>
    </>
  );
};

export default Layout;
