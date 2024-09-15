import { FC, useState } from 'react';
import { Moment } from 'moment';
import { MyPopupListStyle, MyPopupListStyleLi } from './stylesMonthGrid/sc_MonthGrid';
import moment from 'moment';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { IRecipeRepository } from '../../../types/types';

interface Iprops {
  dayItem: Moment
  index: number
  recipes: Array<IRecipeRepository>
}

const MyPopupList: FC<Iprops> = ({dayItem, index, recipes}) => {
  // если навести на счетчик, то MyPopupList display: block, если убрать то noneя (но фактически их несколько, с уник id)
  // при наведении на сам Popup - Popup отображается 
  const [popup, setPopup] = useState(false);
 
  return (
    <MyPopupListStyle
      id={`MyPopupList${index}`} //! окна не видимы в каждой ячейке, и уникальыне классы
      style={popup ? { display: 'flex',  animation: '', } : { animation: 'hidden 1s forwards'}}
      onMouseOver={() => setPopup(true)}
      onMouseOut={() => setPopup(false)}
    >
      <h6 style={{lineHeight: '0',}}>Список лекарств:</h6>
      <div>
        {recipes.map(
            (medItem, index) => 
            // '2024-06-03'
              moment(medItem.start, 'YYYY-MM-DD') <= dayItem &&
              dayItem <
                moment(medItem.start, 'YYYY-MM-DD')
                  .clone()
                  .add(medItem.duration.index, medItem.duration.title) && (
                <MyPopupListStyleLi
                  key={index}
                  style={{display: 'block'}}
                >
                  <RiMedicineBottleLine className={`medElemUnic${medItem.id}`} />
                  <span>{medItem.title}</span>
                </MyPopupListStyleLi>
              ),
          )}
      </div>
    </MyPopupListStyle>
  );
};

export default MyPopupList;
