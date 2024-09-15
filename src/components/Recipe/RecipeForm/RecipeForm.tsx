import { FC } from 'react';
import { FormWrappeer } from '../stylesRecipePage/sc_RecipePage';
import { SubmitHandler, useForm } from 'react-hook-form'; // lib for forms
import StepOne from './stepsForm/StepOne';
import StepTwo from './stepsForm/StepTwo';
import StepThree from './stepsForm/StepThree';
import StepFour from './stepsForm/StepFour';
import StepFive from './stepsForm/StepFive';
import StepSix from './stepsForm/StepSix';
import { IRecipe } from '../../../types/types';
import { RecipeService } from '../../../services/recipe.service';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../store/hooks';
import { readingIndexSubMenu } from '../../../store/features/indexSubMenuSlice';

const RecipeForm: FC = () => {
  // handleSubmit - wrapper обработчика
  // watch - получать нужное значение, чтобы его использовать  форме
  // unregister - не регистрировать значение элемента (не отпрвлять данные в объекте)
  // register - регистрировать значение элемента (отпрвлять данные в объекте)
  // formState - состояние формы
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }, // вывод ошибки на валидацию
  } = useForm<IRecipe>({
    mode: 'onChange', //! режим реагирования на изменение
  });

  // метод переключения на пункт в submenu
  const dispatch = useAppDispatch();
  const switchHandler = (index: number) => {
    dispatch(readingIndexSubMenu(index)); // пункт sub menu [0, 1] (Submenu.tsx, arrSubMenu.ts, indexSubMenuSlice.ts)
  };

  //* обработчик для создания (client\src\services\recipe.service.ts)
  const createHandler: SubmitHandler<IRecipe> = async (data: IRecipe) => {
    try {
      const response = await RecipeService.create(data);

      if (response) {
        // localStorage.setItem('idMealschedules', JSON.stringify(response.id)); //! сохранить в localStorage, чтобы при обновлении id в списке не сбрасывался на по-умолчанию (0)
        // dispatch(readingIdMealschedules(response.id)) // изменил id графика (idMealschedulesSilce.ts), чтобы использовать при получении (в MealscheduleList, и в календаре: Day, Week)
        toast.success('Рецепт успешно создан');
        switchHandler(1); // переход на submenu: 'recipes' (список рецептов)
      }
    } catch (err: any) {
      const error = await err.response?.data.message; // если есть response то ...
      toast.error(error?.toString());
    }
  }; // data возращает handleSubmit от 'react-hook-form'

  return (
    <>
      <FormWrappeer>
        <form onSubmit={handleSubmit(createHandler)}>
          {/* Step #1: Поле ввода названия лекарства (пропсы от 'react-hook-form')*/}
          <StepOne register={register} errors={errors} />
          {/* Step #2 Поле ввода интервала времени приёма лекарства (пропсы от 'react-hook-form')*/}
          <StepTwo
            register={register}
            errors={errors}
            watch={watch}
            control={control}
          />
          {/* Step #3 Поле ввода "Особенности приёма": До, вовремя, после И  еды/завтрака...(пропсы от 'react-hook-form')*/}
          <StepThree register={register} watch={watch} control={control} />
          {/* Step #4 Поле ввода "Количество приёмов": например: 3 раза в день...(пропсы от 'react-hook-form')*/}
          <StepFour register={register} watch={watch} control={control} />
          {/* Step #5 Поле ввода "Курс приёма" (продолжительность приёма ЛС): (пропсы от 'react-hook-form')*/}
          <StepFive register={register} control={control} />
          {/* Step #6 Поле ввода "Дата старта курса" (дата начала приёма ЛС): (пропсы от 'react-hook-form')*/}
          {/* // + button отправки в StepSix*/}
          <StepSix control={control} />
        </form>
      </FormWrappeer>
    </>
  );
};

export default RecipeForm;
