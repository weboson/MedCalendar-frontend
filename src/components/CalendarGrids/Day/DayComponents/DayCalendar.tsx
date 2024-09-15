//! мини календарь - так и не задействовал в проекте 
// import { FC } from 'react'; // day: calednar
// import {
//   CellDay,
//   CellWeek,
//   GridCalendarSection,
//   WrapperWeek,
//   СellMonth,
// } from '../stylesDayGrid/sc_DayGrid';
// import { Moment } from 'moment';
// import moment from 'moment';

// interface IProps {
//   currentDate: Moment;
// }

// const GridCalendar: FC<IProps> = ({ currentDate }) => {

//   return (
//     <GridCalendarSection>
//       {/* Week */}
//       <WrapperWeek>
//         {[...Array(7)].map((_, indx) => (
//           <CellWeek key={indx + 2}>
//             {moment()
//               .day(indx + 1)
//               .format('ddd')}
//           </CellWeek>
//         ))}
//       </WrapperWeek>
//       {/* Day of Month */}
//       <СellMonth>
//         {[...new Array(42)].map((_, i) => {
//           // сохраню хоть что-то в перменную, чтобы не дублировать код
//           const iDay = currentDate
//             .clone()
//             .startOf('month')
//             .startOf('week')
//             .add(i, 'day'); // переменная каждого дня

//           return (
//             <CellDay
//               key={i}
//               $isCurrentDay={
//                 iDay.isSame(moment(), 'day') &&
//                 currentDate.isSame(moment(), 'month')
//               }
//               $isCurrentDays={
//                 iDay.isSame(moment(), 'month') &&
//                 currentDate.isSame(moment(), 'month')
//               }
//             >
//               {iDay.format('D')}
//             </CellDay>
//           );
//         })}
//       </СellMonth>
//     </GridCalendarSection>
//   );
// };

// export default GridCalendar;
