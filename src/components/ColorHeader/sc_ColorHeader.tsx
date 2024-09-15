//! Цветной заголовок (используется в RecipePage, Mealschedules и Auth)
import styled from "styled-components";

export const HeadlineBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background: #00ffd5;
  box-shadow: 0 -200px 100px -120px skyblue inset; // skyblue - это цвет
  animation: background 10s infinite alternate;
  /* анимация градиента */
  @keyframes background {
    50% {
      background: skyblue;
      box-shadow: 0 -200px 100px -100px yellowgreen inset;
    }
  }
`;

// Wrapper H1 (чтобы разместить с иконкой в строку)
export const HeadlineWrapper = styled.div`
  display: inline;
  /* заголовок */
  h1 {
    display: flex;
    align-items: center; // текс по центру по вертикали
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    text-align: center;
    margin: 10px;
    font-size: 2.6em;
    color: #2a282d;
    height: 100%;
  }
`;