import styled from "styled-components";

//! Menu: 'Add new' & 'Recipes'
export const SubMenuWrapper = styled.div`
  height: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: #2a282d;
`;

interface IRecipeMenuUlProps {
  $isActiveModeDate: boolean;
  $borderRadiusLeft: boolean;
  $borderRadiusRight: boolean;
}

export const SubMenuUl = styled.ul<IRecipeMenuUlProps>`
  list-style: none;
  display: flex;
  align-items: center; // текст по центру по вертикали
  flex-direction: row; // в строку
  height: 20px;
  padding: 0; // убрать отступ слева у ul
  font-weight: 500; // bold = 500
  cursor: pointer;
  ${(props) =>
    props.$isActiveModeDate
      ? 'background-color: #e6e6e6; color: #565759;'
      : 'background-color: #565759; color: #e6e6e6;'}
  ${(props) => (props.$borderRadiusLeft ? 'border-radius: 4px 0 0 4px;' : null)}
      ${(props) =>
    props.$borderRadiusRight ? 'border-radius: 0 4px 4px 0;' : null}
  li {
    padding-right: 16px;
    padding-left: 16px;
    font-size: 1em;
  }
`;