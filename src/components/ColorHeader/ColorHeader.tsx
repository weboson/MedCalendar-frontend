//! Цветной заголовок, используется в:
// Recipe.tsx (форма и список - зависит от ArrSubMenu.tsx)
// Mealschedule.tsx (форма или список - зависит от ArrSubMenu.tsx)
// Auth.tsx (login(fasle) или logout(true))
import { FC } from 'react';
import { SlNote } from 'react-icons/sl';
import { FaRegListAlt } from 'react-icons/fa';
import { HeadlineBlock, HeadlineWrapper } from './sc_ColorHeader';
import { MdOutlineLogin, MdOutlineLogout } from 'react-icons/md';

interface IColorHeader {
  title: string;
  iconName: string;
}

const ColorHeader: FC<IColorHeader> = ({ title, iconName }) => {
  return (
    <HeadlineBlock>
      <HeadlineWrapper>
        <h1>
          {iconName == 'SlNote' ? ( // 
            <SlNote /> // иконка форма
          ) : (iconName == 'FaRegListAlt') ? (
            <FaRegListAlt /> // иконка список
          ) : iconName == 'MdOutlineLogin' ? (
            <MdOutlineLogin /> // иконка войти
          ) : (
            <MdOutlineLogout /> // иконка выйти
          )}
          {title}
        </h1>
      </HeadlineWrapper>
    </HeadlineBlock>
  );
};

export default ColorHeader;
