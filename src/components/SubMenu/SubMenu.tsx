//! подменю (используется в RecipePage, Mealschedules и Auth (login/logout))
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SubMenuUl, SubMenuWrapper } from './sc_SubMenu';
import { ArrSubMenu } from '../../data/arrSubMenu';
import { readingIndexSubMenu } from '../../store/features/indexSubMenuSlice';

interface Isubmenu {
  indexItem: number
}

const Submenu: FC<Isubmenu> = ({indexItem}) => { // id - это 2 элемента до id в ArrSubMenu.tsx 

const activeSubMenu = useAppSelector((state) => state.indexSubMenu); // src\store\features\modesRecipeSlice.ts
const dispatch = useAppDispatch();
const handleClick = (index: number) => {
    //* записал активную кнопку меню в хранилище, используется в modesDateSlice.ts
    sessionStorage.setItem('indexSubMenu', index.toString()); // например, если нажать на кнопку "New Add", то после обновления страницы, будет режим "RecipesForm.tsx"
    // redux-toolkit
    dispatch(readingIndexSubMenu(index));
    // console.log()
  };
  return (
    <SubMenuWrapper>
      {/* arr[0,1,2,3].slice(0, 2) => [0,1] */}
      {ArrSubMenu.slice(indexItem-2, indexItem).map((item, index, array) => (
        (index <= indexItem) && (
          <div key={index}>
          {/* Menu */}
          <SubMenuUl
            $isActiveModeDate={activeSubMenu == index ? true : false}
            $borderRadiusLeft={index == 0 ? true : false}
            $borderRadiusRight={index == 1 ? true : false}
          >
            <li onClick={() => handleClick(index)} key={index+2}>{item.title}</li>
          </SubMenuUl>
        </div>
        )
      ))}
    </SubMenuWrapper>
  );
};

export default Submenu;
