//! Окно рецепта для Day - при наведении на ячейку с приёмом ЛС - поляляется развернутая информация
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../store/hooks';
import {
  MyButton,
  WrapperMyButton,
  WrapperRecipe,
  WrapperRecipeWindow,
} from '../../stylesDayGrid/sc_DayGrid';
import moment from 'moment';
import { RecipeService } from '../../../../../services/recipe.service';
import { IRecipeRepository } from '../../../../../types/types';

const RecipeWindow: FC = () => {
  //Redux-toolkit - из hooks.tsx -
  // получили id лекарства
  const idMed = useAppSelector((state) => state.chosenMedicine); // изменение состояния (useAppDispatch) в DayUsingrecipes.tsx
  // получить рецепт по id, на который клинули
  const [recipe, setRecipe] = useState<IRecipeRepository>();
  //! GetAll 
  const getOneRecipe = async (id: string) => {
    const response = await RecipeService.getOne(id);
    // console.log(response);
      setRecipe(response);
    // toast.success('Рецепт один: загружен');
  };

  useEffect(() => {
    getOneRecipe(`${idMed}`);
  }, [idMed]);

  if (recipe) {
    return (
      <WrapperRecipeWindow>
        {/* сторая обертка, чтобы позиционировать элментами не выхоодя за белый фон */}
        <WrapperRecipe>
          <h2>Схема приема препарата: </h2>
          {/* при обновлении, лекарство не вырбано, если так то сообщение о клике на ЛС */}
          {recipe ? (
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
                            ? ' часов'
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
                      : `Спустя ${recipe.interval.hour}:${recipe.interval.minute} ` +
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
                    ? 'месяца/месяцев'
                    : 'год'}
                </p>
              </li>
              <li>
                Начало приёма:
                <br />
                <p>{moment(recipe.start, 'YYYY-MM-DD').format('YYYY-MM-DD')}</p>
              </li>
              <li>
                {/* сколько осталось принимать (diff - это разница) */}
                Осталось принимать: <br />
                <p>
                  {moment(recipe.start, 'YYYY-MM-DD').add(
                    recipe.duration.index,
                    `${recipe.duration.title}`,
                  ) > moment() // если старт + курс > текущего дня, то
                    ? moment(recipe.start, 'YYYY-MM-DD')
                        .add(recipe.duration.index, `${recipe.duration.title}`)
                        .diff(moment(), 'day') + ' день/дней/дня' // (стартовый день + длительность курса) - текущее время = сколько осталось принимать
                    : `завершение курса ${moment(recipe.start, 'YYYY-MM-DD')
                        .add(recipe.duration.index, `${recipe.duration.title}`)
                        .format('YYYY-MM-DD')} `}{' '}
                </p>
              </li>
              <li>
                Завершение курса (до): <br />
                <p>
                  {moment(recipe.start, 'YYYY-MM-DD')
                    .add(recipe.duration.index, `${recipe.duration.title}`)
                    .format('YYYY-MM-DD')}
                </p>
              </li>
            </ul>
          ) : (
            <p style={{ fontSize: '3em' }}>
              Чтобы узнать подробности <br /> - кликните мышкой по любому
              лекарству
            </p>
          )}
        </WrapperRecipe>
        <WrapperMyButton>
          {recipe && <MyButton>Изменить</MyButton>}
        </WrapperMyButton>
      </WrapperRecipeWindow>
    );
  } else {
    return (
      <WrapperRecipeWindow>
        <WrapperRecipe>
        <p style={{ fontSize: '3em' }}>
          Чтобы узнать подробности <br /> - кликните мышкой по любому лекарству
        </p>
        </WrapperRecipe>
      </WrapperRecipeWindow>
    );
  }
};

export default RecipeWindow;
