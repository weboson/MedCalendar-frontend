import { FC, useEffect, useState } from 'react';
import {
  Background,
  CellColumn,
  GapBackground,
  GridRecipes,
  GridTitle,
  GridWrapperRecipes,
  PaginationWrapper,
  TableWrapper,
} from './stylesRecipePage/sc_RecipePage';
import { RecipeService } from '../../services/recipe.service';
import { IRecipeRepository } from '../../types/types';
import RecipeOne from './RecipeOne';
import { Pagination } from '@mui/material';
import { instance } from '../../api/axios.api';
import { toast } from 'react-toastify';

interface IProps {
  limit: number;
}

const RecipeList: FC<IProps> = ({ limit = 10 }) => {


  // для пагинации: https://youtu.be/7tTtLfw-acU?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=4142
  // получаю порциями (limit), а не все (GetAll в Day и Week)
  const [recipes, setRecipes] = useState<IRecipeRepository[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // текущая страница
  const [totalPages, setTotalPages] = useState<number>(0); // общее количество страниц

  // метод запроса на пагинацию: recipes/pagination?page=1&limit=1
  const fetchRecipes = async (page: number) => {
    const allRecipes = await RecipeService.getAll(); //  все рецепты из БД
    const limitRecipes = await instance.get(
      `recipes/pagination?page=${page}&limit=${limit}`, // порции расчитываются в бэкенде (server\src\recipe\recipe.service.ts)
    ); // порции рецептов для пагинации
    setRecipes(limitRecipes.data); // порция
    setTotalPages(Math.ceil(allRecipes.length / limit)); // всего страниц
  };

  // изменение страницы (пример кода из MUI: https://mui.com/material-ui/react-pagination/)
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]); // изменении страницы - производится запрос порции

  //! удаление
  const removeRecipe  = async (id: number): Promise<void> => {
    const response = await RecipeService.removeOne(id);
    fetchRecipes(currentPage); // снова делаем новый запрос на порцию данных
    toast.success('Рецепт удален');
  };

  const columnArr = [
    '№',
    'Наименование лекарства',
    'Приём вне зависимости',
    'Особенности приёма',
    'Количество приёмов',
    'Курс приёма ЛС',
    'Дата начала курса',
    'Удалить',
  ];

  if (recipes.length) {
    return (
      <Background>
        <TableWrapper>
          <GapBackground>
            {/* //! Заголовки */}
            {/* адаптация: Заголовки исчезают при сжатии >8 колонок */}
            <GridTitle>
              {columnArr.map((item, index, array) => (
                <CellColumn key={index + 1}>
                  <p>{item}</p>
                </CellColumn>
              ))}
            </GridTitle>
            {/* //! Рецепты */}
            <GridWrapperRecipes>
              {recipes.map((id, index, arr) => (
                <GridRecipes key={index + 2}>
                  <RecipeOne recipe={id} index={++index} removeRecipe={removeRecipe}/>
                </GridRecipes>
              ))}
            </GridWrapperRecipes>
          </GapBackground>
        </TableWrapper>
        {/* пагинация */}
        <PaginationWrapper>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </PaginationWrapper>
      </Background>
    );
  }
};

export default RecipeList;
