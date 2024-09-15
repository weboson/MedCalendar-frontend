//! MyPopup - при наведении на ячейку с приёмом ЛС - поляляется развернутая информация
import { FC, useEffect, useState } from 'react';
import { MyButton, WrapperMyModal } from './stylesMyPopup/sc_MyPopup';
import { useAppSelector } from '../../store/hooks';
import { IRecipeRepository } from '../../types/types';
import { RecipeService } from '../../services/recipe.service';
// DataBase array
// import takingMedications from '../../data/localDataBase/LocalDB_WaysUsing';

const MyPopup: FC = () => {
  //Redux-toolkit - из hooks.tsx -
  // получили id лекарства
  const idMed = useAppSelector((state) => state.popupData); // изменение состояния (useAppDispatch) в Usingrecipes.tsx
  // получить рецепт по id, на который клинули
  const [recipe, setRecipe] = useState<IRecipeRepository | Object>({});
  const [popup, setPopup] = useState(false);
  //! GetOne
  const getOneRecipe = async (id: string) => {
    const response = await RecipeService.getOne(id);
    // console.log(response);
    setRecipe(response)
    // toast.success('Рецепт один: загружен');
  };

  useEffect(() => {
    getOneRecipe(`${idMed}`);
  }, [idMed]);

  if (recipe.id) {
    return (
      <WrapperMyModal
        id="IdPopup"
        style={
          popup
            ? { display: 'flex', animation: '' }
            : { animation: 'hidden 1s forwards' }
        }
        onMouseOver={() => setPopup(true)}
        onMouseOut={() => setPopup(false)}
      >
        <h6>Схема приема препарата: </h6>
        <ul>
          <li>
            Наименование: <p>"{recipe?.title}"</p>
          </li>
          <li>
            Способ приёма:&nbsp;
            <br />
            <p>
              {!recipe?.independently
                ? recipe?.position == 'before'
                  ? `За ${recipe.interval.hour}${
                      recipe.interval.minute == 0
                        ? 'часов'
                        : `:${recipe.interval.minute}`
                    } ` +
                    'до ' +
                    `${
                      recipe?.action == 'eating'
                        ? 'еды'
                        : recipe?.action == 'first breakfast'
                        ? 'завтрака'
                        : 'ужина'
                    }`
                  : recipe?.position == 'while'
                  ? 'Вовремя ' +
                    `${
                      recipe?.action == 'eating'
                        ? 'еды'
                        : recipe?.action == 'first breakfast'
                        ? 'завтрака'
                        : 'ужина'
                    }`
                  : `Спустя ${recipe?.interval.hour}:${recipe?.interval.minute} ` +
                    'после ' +
                    `${
                      recipe?.action == 'eating'
                        ? 'еды'
                        : recipe?.action == 'first breakfast'
                        ? 'завтрака'
                        : 'ужина'
                    }`
                : 'Независимо'}
            </p>
          </li>
          <li>
            Количество приёмов:&nbsp;
            <p>
              {recipe?.quantity} раза в
              {recipe?.unitTime == 'day'
                ? ' день'
                : recipe?.unitTime == 'week'
                ? ' в неделю'
                : 'в месяц'}
            </p>
          </li>
          <li>
            Курс лечения:{' '}
            <p>
              {recipe?.duration.index + ' '}
              {recipe?.duration.title == 'days'
                ? 'дня/дней/день'
                : recipe?.duration.title == 'weeks'
                ? 'недели/ей'
                : recipe?.duration.title == 'months'
                ? 'месяц/месяцев'
                : 'год'}
            </p>
          </li>
        </ul>
        <MyButton>Изменить</MyButton>
      </WrapperMyModal>
    );
  }
};

export default MyPopup;
