import { Moment } from 'moment';
import { FC, useEffect } from 'react';
import {
  DayGridSection,
  RecipeSection,
  WrapperBlock,
} from './stylesDayGrid/sc_DayGrid';
import DayGrid from './DayComponents/DayGrid/DayGrid';
import RecipeWindow from './DayComponents/RecipeWindow/RecipeWindow';

interface IProps {
  currentDate: Moment;
}

const Day: FC<IProps> = ({ currentDate }) => {
  // Memorization/Recovery Scroll position (сохраняет текущий скролл (как в Week), даже после перехода на другие компоненты - не нужно постоянно мотать до того места, где остановился)
  // Знак ! - в TS значит, что уверены, что объект не равен null или Uundefined
  useEffect(() => {
    //1 после события скроллинга пользователя - срабатывает сохраннение в sessionStorage(localStorage сохраняет даже после перезагрузки - нам это не нужно, на только после обновления)
    document
      .querySelector('#saveScrollDay')!
      .addEventListener('scroll', function () {
        const currentScrollDay = document
          .querySelector('#saveScrollDay')!
          .scrollTop.toString(); // получили текущий сролл (to String)
        sessionStorage.setItem('nameCurrentScrollDay', currentScrollDay); // сохранили в Storage
      });

    //2  получаем значение свойств scrollTop и используем его, чтобы скроллить на эту позицию
    // console.log(sessionStorage.getItem('position'))
    document
      .querySelector('#saveScrollDay')!
      .scrollTo(0, +sessionStorage.getItem('nameCurrentScrollDay')!); // Знак ! - в TS значит, что уверены, что объект не равен null или Undefined
  }, []);

  return (
    <WrapperBlock>
      {/* Left */}
      <DayGridSection>
        <DayGrid currentDate={currentDate} />
      </DayGridSection>

      {/* Right */}
      <RecipeSection>
        <RecipeWindow currentDate={currentDate}/>
      </RecipeSection>
    </WrapperBlock>
  );
};

export default Day;
