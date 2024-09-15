import { FC } from 'react';
import { WrapperRecipes } from './stylesRecipePage/sc_RecipePage';
import RecipeForm from './RecipeForm/RecipeForm';
import { useAppSelector } from '../../store/hooks';
import RecipeList from './RecipeList';
import ColorHeader from '../ColorHeader/ColorHeader';
import SubMenu from '../SubMenu/SubMenu';
import { ArrSubMenu } from '../../data/arrSubMenu';

const Recipe: FC = () => {
  const activeMenu = useAppSelector((state) => state.indexSubMenu);
  
  return (
    <WrapperRecipes>
      {/* indexItem - это для [1,2,3,4].slice(indexItem-2, indexItem) => [1,2] or [3,4] в ArrSubMenu.tsx */}
      {/* подменю: 'Add new', 'Recipes' */}
      <SubMenu indexItem={2}/> 

      {activeMenu == 0 ? (
        <>
          {/* цветной заголовок страниц для Recipes и Mealschedule)*/}
          <ColorHeader
            title={
              ArrSubMenu[activeMenu].colorHeader
            }
            iconName={'SlNote'}
          />
          <RecipeForm />
        </>
      ) : (
        <>
          {/* цветной заголовок страниц для Recipes и Mealschedule)*/}
          <ColorHeader
            title={
              ArrSubMenu[activeMenu].colorHeader
            }
            iconName={'FaRegListAlt'}
          />
          <RecipeList limit={10} />
        </>
      )}
      {/* форма */}
    </WrapperRecipes>
  );
};

export default Recipe;
