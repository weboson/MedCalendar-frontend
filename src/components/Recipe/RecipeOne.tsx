//! Таблица (ряд): каждого рецепта
// used client\src\components\Recipe\RecipeList.tsx
import { FC } from 'react';
import { IRecipeRepository } from '../../types/types';
import { CellRecipe } from './stylesRecipePage/sc_RecipePage';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineDoNotDisturb } from 'react-icons/md';
import { IconButton } from '@mui/material';

interface IProps {
  recipe: IRecipeRepository
  index: number
  removeRecipe: (id: any) => Promise<void>
}

const RecipeOne: FC<IProps> = ({ recipe, index, removeRecipe}) => {

  return (
    <>
      <CellRecipe style={{ textAlign: 'center' }}>{index}</CellRecipe>
      <CellRecipe>{recipe.title}</CellRecipe>
      <CellRecipe style={{ textAlign: 'center' }}>
        {recipe.independently ? (
          <IoMdCheckmarkCircleOutline color={'#1acc1a'} />
        ) : (
          <MdOutlineDoNotDisturb />
        )}
      </CellRecipe>
      {!recipe.independently ? (
        <CellRecipe>
          {`${
            recipe.interval.hour >= 0 || recipe.interval.minute >= 0
              ? `[${recipe.interval.hour}:${recipe.interval.minute}]`
              : ''
          } ${
            recipe.position == 'before'
              ? 'перед'
              : recipe.position == 'after'
              ? 'после'
              : recipe.position == 'while'
              ? 'вовремя'
              : ''
          } ${
            recipe.action == 'eating'
              ? '[Приём пищи]'
              : recipe.action == 'firstBreakfast'
              ? '[Завтрак]'
              : recipe.action == 'lastSupper'
              ? '[Ужин]'
              : '[Сон]'
          }`}
        </CellRecipe>
      ) : (
        <CellRecipe>
          <MdOutlineDoNotDisturb />
        </CellRecipe>
      )}
      <CellRecipe>{`${recipe.quantity} раз/раза`}</CellRecipe>
      <CellRecipe>{`${recipe.duration.index} ${recipe.duration.title}`}</CellRecipe>
      <CellRecipe>{recipe.start}</CellRecipe>
      <CellRecipe style={{ textAlign: 'center' }}>
        <IconButton aria-label="delete" color="primary" onClick={() => {removeRecipe(recipe.id)}}>
          <FaRegTrashAlt />
        </IconButton>
      </CellRecipe>
    </>
  );
};

export default RecipeOne;
