//! Наименования (список) имеющегося у user графика (MealscheduleList)
import { FC, useEffect, useState } from 'react';
import {
  ButtonsWrapper,
  Curve,
  IconsWrapper,
  ListWrappeer,
  NotFoundWrapper,
  Section,
  SectionsWrapper,
  stylesMoon,
  stylesSun,
} from './sc_Mealschedule';
import { MealScheduleService } from '../../services/mealschedule.service';
import { useAppDispatch } from '../../store/hooks';
import { readingIndexSubMenu } from '../../store/features/indexSubMenuSlice';
import { Button } from '@mui/material';
import { GoSun } from 'react-icons/go';
import { BsMoon } from 'react-icons/bs';
import { MdOutlineDinnerDining, MdOutlineFreeBreakfast } from 'react-icons/md';
import { toast } from 'react-toastify';
import { IMealscheduleRepository } from '../../types/types';

const MealscheduleList: FC = () => {
  // если нет графика, будет кнопка для перехода на 'Add new'
  const dispatch = useAppDispatch();
  const handleClick = (index: number) => {
    //* записал активную кнопку меню в хранилище, используется в modesDateSlice.ts
    //sessionStorage.setItem('indexSubMenu', index.toString()); // например, если нажать на кнопку "New Add", то после обновления страницы, будет режим "RecipesForm.tsx"
    // redux-toolkit
    dispatch(readingIndexSubMenu(index));
    // console.log()
  };
  // получим созданную в форме id графика (в MealscheduleForm.tsx и изменненую в ReduxTK)
  // const id = localStorage.getItem('idMealschedules');
  //! пустые данные
  const [data, setData] = useState<IMealscheduleRepository | Object>({});
  const [id, setId] = useState<number>(); // id для кнопки удалить (removeMealSchedule)

  // получить объект графика из массива[0]
  const getMealSchedule = async () => {
    const response = await MealScheduleService.getAll();
    // console.log(response);
    if (response.length !== 0) { // если есть график в БД (не удален)
      setData(response[0]); // в массиве таблицы графики - есть только один график, т.к. (@OneByOne: MedCalendar-backend\src\mealschedule\entities\mealschedule.entity.ts)
      setId(response[0].id) // id для кнопки удалить (removeMealSchedule)
    }

    return data;
  };
  useEffect(() => {
    getMealSchedule();
  }, []);

  // удалить по id, который получаем запросе, если есть график - если нет графика, то и кнопка не показывается
  const removeMealSchedule = async () => {
    try {
      const response = await MealScheduleService.removeOne(id);
      if (response) {
        setData({}); // пустые данные с state
        toast.success('Вы удалили график');
        // localStorage.removeItem('idMealschedules') // очистить в localStorage
      }
    } catch (err: any) {
      const error = await err.response?.data.message; // если есть response то ...
      toast.error(error?.toString());
    }
  };

  // псевдо "update" 
  // сначала удалаяет - потому перенаправляет на sybmenu "Add new" - (в client\src\services\mealschedule.service.ts нет update)
  const removeAndCreate = async () => {
    try {
      const response = await MealScheduleService.removeOne(id);
      if (response) {
        setData({id: null}); // пустые данные с state
        localStorage.removeItem('idMealschedules') // очистить в localStorage
        dispatch(readingIndexSubMenu(0)); // перенаправление на 'Add new'
        toast.success('Пересоздайте график');
        return response;
      }
    } catch (err: any) {
      const error = await err.response?.data.message; // если есть response то ...
      toast.error(error?.toString());
    }
  }

  // update
  // const updateMealSchedule = async (data: IMealSchedule) => {
  //   try {
  //     const response = await MealScheduleService.updateOne(id, data);
  //     if (response) {
  //       dispatch(readingIndexSubMenu(0)); // перенаправление на 'Add new'
  //       toast.success('Пересоздайте график');
  //       return response;
  //     }
  //   } catch (err: any) {
  //     const error = await err.response?.data.message; // если есть response то ...
  //     toast.error(error?.toString());
  //   }
  // }


  return (
    <ListWrappeer>
      {data.id ? (
        //! если нет графиков
        <>
          <h1>Список Ваших графиков приёма пищи: id: {data.id}</h1>
          <SectionsWrapper>
            <Section>
              <>
                <h2>
                  <ruby>
                    В будни:<rt>weekday</rt>
                  </ruby>
                </h2>
                <IconsWrapper>
                  <GoSun size="40px" style={stylesSun} />
                  <MdOutlineFreeBreakfast size="40px" style={stylesSun} />
                  <Curve />
                  <MdOutlineDinnerDining size="40px" style={stylesMoon} />
                  <BsMoon size="40px" style={stylesMoon} />
                </IconsWrapper>
                <IconsWrapper>
                  <span>{data.weekday[0]}:00</span>
                  <span>{data.weekday[1]}:00</span>
                </IconsWrapper>

                <IconsWrapper>
                  <p>
                    Первый <br />
                    приём пищи
                  </p>
                  <p>
                    Последний <br />
                    приём пищи
                  </p>
                </IconsWrapper>
              </>
            </Section>

            <Section>
              <>
                <h2>
                  <ruby>
                    В выходные:<rt>weekend</rt>
                  </ruby>
                </h2>
                <IconsWrapper>
                  <GoSun size="40px" style={stylesSun} />
                  <MdOutlineFreeBreakfast size="40px" style={stylesSun} />
                  <Curve />
                  <MdOutlineDinnerDining size="40px" style={stylesMoon} />
                  <BsMoon size="40px" style={stylesMoon} />
                </IconsWrapper>
                <IconsWrapper>
                  <span>{data.weekend[0]}:00</span>
                  <span>{data.weekend[1]}:00</span>
                </IconsWrapper>

                <IconsWrapper>
                  <p>
                    Первый <br />
                    приём пищи
                  </p>
                  <p>
                    Последний <br />
                    приём пищи
                  </p>
                </IconsWrapper>
              </>
            </Section>
          </SectionsWrapper>
          <ButtonsWrapper>
            <Button variant="contained" type="submit" onClick={() => removeMealSchedule()}>
              Удалить
            </Button>
            <Button variant="contained" type="submit" onClick={() => removeAndCreate()}>
              Изменить
            </Button>
          </ButtonsWrapper>
        </>
      ) : (
        <NotFoundWrapper>
          <h1>У Вас пока, нет графиков. Создайте их.</h1>
          <img src="images/undefuned_data.jpg" alt="" />
          <Button
            sx={{ margin: '30px' }}
            variant="contained"
            onClick={() => handleClick(0)}
          >
            Создать график
          </Button>
        </NotFoundWrapper>
      )}
    </ListWrappeer>
  );
};

export default MealscheduleList;
