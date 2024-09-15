// Стили для Popup (окно подробного описания приёма ЛС)

import styled from 'styled-components';

export const WrapperMyModal = styled('div')`
  /* по-умолчанию */
  display: none; // изночально его Popup нет на верстке (а то он изображен при переходе меню)
  position: fixed;
  flex-direction: column; // display: flex в UsingMedicines и MyPopup
  margin: 20px;
  padding: 20px;
  z-index: 3; // выше top-panel дней недели
  background-color: #e6e6e6;
  color: #565759; 
  /* width: 400px;
    height: 400px; */
  min-width: fit-content; // шириной в контент // положение меняется в UsingMedicines.tsx
  min-height: fit-content; // высотой в контент
  font-family: Roboto, serif;
  line-height: 1;
  border: 6px solid #565759;  
  /* transition: "1s ease-in";  */
  /* animation: show 10 s; */
  /* -webkit-animation: fadeIn 2s;
  -moz-animation: fadeIn 12s;
  -o-animation: fadeIn 12s;
  -ms-animation: fadeIn 2s; */
 @keyframes show {
    // медленное появление 
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes hidden {
    // медленное исчезновение: повешано, как на заголовок ЛС, так и на сам MyPopup (когда курсор уходит)
    0% {
      opacity: 1;
      display: flex;
    }
    100% {
      opacity: 0;  
      display: none;
    }
  }
  
  h6 {
    font-size: 24px;
    line-height: 0px;
    margin: 25px 0 25px 0;
    word-wrap: break-word; // перенос по словам (если не помещаются в окне)
  }
  ul > li {
    font-size: 20px;
  }
  p {
    color: red;
    line-height: 0;
    font-size: 22px;
  }
`;

// кнопка "изменить"
export const MyButton = styled.button`
  cursor: pointer;
  border: unset;
  height: 40px;
  padding-right: 16px;
  padding-left: 16px;
  margin-bottom: 0px;
  font-weight: bold;
  border-radius: 4px;
  background-color: #565759;
  color: #e6e6e6;
  text-align: center;
  &:hover {
    // при наведении
    background-color: #1e1f21;
  }
  &:active {
    // при клике
    padding-top: 4px;
  }
`;

// триугольник
// export const Triangle = styled.div`
// width: 0;
// height: 0;
// border-top: 10px solid transparent;
// border-right: 20px solid #E6E6E6;
// border-bottom: 10px solid transparent;
// transform: translate(-150%, -90%);
// `
