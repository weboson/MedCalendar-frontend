import styled from 'styled-components'; // библиотека, которая упрощает стилизацию компонентов (CSS with JS)


// Main wrapper
export const WrapperYear = styled.div`
  height: 89vh; //! главная высота в index.css(100vh), и остальное cs_calendarHeader.tsx(4vh), sc_Monitor.tsx(7vh)
  width: 100%;
  background-color: #1e1f21;
`

export interface IGridWrapperYearProps {
}

// for Main Grid 4 * 3 example
export const GridWrapperYear = styled.div<IGridWrapperYearProps>`
  display: grid;
  justify-items: center;
  background-color: #1e1f21;
  grid-template-columns: repeat(4, 1fr); 
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: start;
  border-bottom: 5px solid '#1e1f21';
  padding: 20px;
  /* border: solid 1px green; */
`;


// Cell Months
interface IWrapperMothCellProps {
  $isCurrentMonth?: boolean
}

export const WrapperMothCell = styled.div<IWrapperMothCellProps>`
  margin: 5px;
  padding: 5px;
  /* border: solid 1px blue; */
  ${(props) => (props.$isCurrentMonth) ? 'color: red' : 'color: white'} 
`
// Title Month
export const MothTitle = styled.div`
  margin: 0 10px 10px 10px;
  font-weight: bold;
`



// Inner Grid for months
export const СellMonths = styled.div`
  background-color: #1e1f21;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* grid-gap: 1px; */
  /* margin-top: 5px; */
  /* border: solid 1px red; */
`


// Week (дни недели)
export const WrapperWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding-bottom: 10px;
  justify-items: center;
  /* padding-top: 5px; */
  padding-left: 1px;
  width: 320px;
`
export const CellWeek = styled.div`
  font-size: 16px;
  align-items: end;
  color: #565759;
`

// Current Day
export const CurrentDay = styled.div`
  color: red;
`


// For Cell Days
interface ICellDayProps  {
  // это выходной день?
  $isWeekend?: boolean
  // это текущий день?
  $isCurrentDay?: boolean
  // эти дни входят в текущий месяц?
  $isCurrentDaysOfMonth?: boolean
  // в этот день есть приём лекарства?
  $isMedicines: boolean
}

export const CellDay = styled.div<ICellDayProps>`
  display: flex;
  text-align: center;
  font-size: 18px;
  background-color: #1e1f21;
  ${(props => (
    (props.$isWeekend) ? 'color: #212121' : 
    (props.$isCurrentDay) ? 'color: red' :
    (props.$isCurrentDaysOfMonth) ? 'color: #ffffff' :
    'color: #919294'
  ))};
  ${(props => ((props.$isMedicines) ? 'background-color: #353434' : null))};
`


