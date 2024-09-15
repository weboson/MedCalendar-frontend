//! страница /recipes (Рецепта) (используется в route.tsx)
import { FC } from 'react';
import { useOutletContext } from 'react-router-dom';
import Monitor from '../components/Monitor/Monitor';
import { Moment } from 'moment';
import Recipe from '../components/Recipe/Recipe';

//type для констант context-а
interface ArrayContextType extends Array<Moment> {}

const Recipes: FC = () => {
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
      <Recipe />
    </>
  );
};

export default Recipes;
