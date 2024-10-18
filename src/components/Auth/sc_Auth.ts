import styled from "styled-components";

export const FormWrappeer = styled.div`
height: 77.8vh;
background-color: #e6e6e6;
padding: 3%;

form {
  min-height: 100%;
  border: 1px solid #b1b1b1;
  border-radius: 5px;
  padding: 10px;
}
section {
    display: flex;
    align-items: center;
    flex-direction: column;
}

button {
    display: flex;
    text-align: center;
    justify-content: center;
}

`;


export const FormFrame = styled.div`
  display: flex;
  flex: 600px;
  justify-content: space-between;
  min-height: 100%;
  flex-direction: column;
  border: 1px solid #b1b1b1;
  border-radius: 5px;
  margin: 10px 10px 0 10px; // внизу 0, чтобы не было двойного margin между блоками
  padding: 10px;
`;


