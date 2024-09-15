// styled for Monitor.tsx
import styled from "styled-components";


export const DivWrapper = styled('div')`
    height: 7vh; /* index.css(100vh), cs_calendarHeader.tsx(4vh), sc_Monitor.tsx(7vh), sc_DayGrid.tsx(89vh)/ */
    display: flex;
    min-width: 300px;
    justify-content: space-between;
    background-color: #1e1f21;
    color: #DCDDDD;
    padding: 10px 16px;
`

export const TextWrapper = styled('span')`
    font-size: 32px;
`;
// наследование в styled-components
export const TitleWrapper = styled(TextWrapper)`
    font-weight: bold;
    margin-right: 8px;
`
export const ButtonsWrapper = styled('div')`
    display: flex;
    align-items: center;
`
interface IButtonWrapper {
    $isActiveDate: boolean
}
export const ButtonWrapper = styled('button')<IButtonWrapper>`
    border: unset;
    background-color: #565759;
    height: 20px;
    color: #E6E6E6;
    cursor: pointer;
        /* кнопки < и > "светятся", если отображена текущая неделя, день, месяц, год, */
  ${(props) =>
    props.$isActiveDate ? 'background-color: #E6E6E6; color: #565759;' : null}
    /* &:nth-child(1) {
        margin-bottom: 20px;
        color: red !important;
    } */
    /* закругление краёв первой и последней кнопки */
    &:first-child {
        border-radius: 4px 0 0 4px
  }
    &:last-child {
        border-radius: 0 4px 4px 0 
  }
`
interface ITodayButton {
    $isActiveDate: boolean
}
export const TodayButton = styled(ButtonWrapper)<ITodayButton>` // styled(ButtonWrapper) - наследует стили
    padding-right: 16px;
    padding-left: 16px;
    font-weight: bold;
    cursor: pointer;
    /* кнопка ToDay "светится", если отображена текущая неделя, день, месяц, год, */
  ${(props) =>
    props.$isActiveDate ? 'background-color: #E6E6E6; color: #565759;' : null}
`;
