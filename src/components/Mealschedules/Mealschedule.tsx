import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import ColorHeader from '../ColorHeader/ColorHeader';
import { ArrSubMenu } from '../../data/arrSubMenu';
import SubMenu from '../SubMenu/SubMenu';
import MealscheduleForm from './MealscheduleForm';
import MealscheduleList from './MealscheduleList';

const Mealschedule: FC = () => {
  const activeSubMenu = useAppSelector((state) => state.indexSubMenu);

  return (
    <>
      {/* indexItem - это для [1,2,3,4].slice(indexItem-2, indexItem) => [1,2] or [3,4] в ArrSubMenu.tsx */}
      {/* подменю: 'Add new', 'Mealschedules' */}
      <SubMenu indexItem={4} />
      {activeSubMenu == 0 ? (
        <>
          {/* цветной заголовок страниц для Recipes, Mealschedule и auth)*/}
          <ColorHeader
            title={ArrSubMenu[activeSubMenu + 2].colorHeader}
            iconName={'SlNote'}
          />
          <MealscheduleForm />
        </>
      ) : (
        <>
          {/* цветной заголовок страниц для Recipes, Mealschedule и auth)*/}
          <ColorHeader
            title={ArrSubMenu[activeSubMenu + 2].colorHeader}
            iconName={'FaRegListAlt'}
          />
          <MealscheduleList />
        </>
      )}
    </>
  );
};

export default Mealschedule;

