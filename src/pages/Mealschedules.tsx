import { Moment } from 'moment';
import { FC } from 'react';
import { useOutletContext } from 'react-router-dom';
import Monitor from '../components/Monitor/Monitor';
import Mealschedule from '../components/Mealschedules/Mealschedule';

//type для констант context-а от 'react-router-dom'
interface ArrayContextType extends Array<Moment> {}

const Mealschedules: FC = () => {
  // useOutletContext - это из (Outlet, Lauout.tsx) react-router-dom (чтобы передать пропсы)
  const [currentDate, prevHandler, todayHandler, nextHandler] =
    useOutletContext<ArrayContextType>();

  return (
    <>
      <Monitor
        currentDate={currentDate}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />
      <Mealschedule />
    </>
  );
};

export default Mealschedules;
