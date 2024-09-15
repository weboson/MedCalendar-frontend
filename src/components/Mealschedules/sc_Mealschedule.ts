import styled from "styled-components";

// Form Wrapper (обертка для секотров формы)
export const FormWrappeer = styled.div`
  height: 77.8vh;
  background-color: #e6e6e6;
  padding: 3%;

  form {
    display: flex;
    flex: 600px;
    justify-content: space-between;
    min-height: 100%;
    flex-direction: column;
    border: 1px solid #b1b1b1;
    border-radius: 5px;
    padding: 10px;
  }
  h2 {
    //! стили переопределены в MUI (RecipeForm.tsx)
  }
`;

//! СПИСОК
// Для списка графиков питания
export const ListWrappeer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 77.8vh;
  background-color: #e6e6e6;
  h1, h2, h3 {
    color: #2a282d;  
    text-align: left;
    margin: 0;
    color: #2a282d;
    padding: 2%;
  }
  h1 {
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 1.6em;
    }
`;

// секции 
export const SectionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
    height: 40%;
  }
  ruby rt {
    font-weight: 600;
  }
`
// секция + рамка
export const Section = styled.div`
  border: 1px solid #b1b1b1;
  border-radius: 5px;
  width: 50%;
  height: 100%;
  margin: 1%;
  @media (max-width: 768px) {
    width: 100%;
  }
  h2 {
    margin: 2%;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 1.8em;
    text-align: center;
  }
`
// контент
// icons line
export const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 4%;
  span {
    font-weight: 600;
    font-size: 1.6em;
  }
`
//icons
export const stylesSun = {
  color: 'yellow',
  margin: '1px 1px 0 0',
}
export const stylesMoon = {
  color: '#323280',
  margin: '1px 1px 0 0',
}

// кривая линия (дуга)
export const Curve = styled.div`
  height: 20px;
  width: 87%;
  border-bottom: dashed 1px #1e1f21;;
`
// кнопки 'удалить' и 'изменить'
export const ButtonsWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
width: 100vw;
margin: 1%;
  button {
    margin: 1%;
    width: 15%;
  }

`

// ОШИБКА:не найдено графиков
export const NotFoundWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    width: 50%;
  }
`