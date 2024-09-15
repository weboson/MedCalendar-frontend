// show from above: current date (exemple: November 30 (from Month), 2023 (from Year)) + < tody >
// 
import { FC } from 'react';
import {
  DivWrapper,
  TextWrapper,
  TitleWrapper,
  ButtonsWrapper,
  ButtonWrapper,
  TodayButton,
} from '../Monitor/stylesMonitor/sc_Monitor';
import { useAppSelector } from '../../store/hooks';
import { modesMonitor } from '../../data/modesMonitor';
import { Moment } from 'moment';
import moment from 'moment';

// ts тип для пропс
interface IMonitorProps {
  currentDate: Moment;
  prevHandler: () => void;
  todayHandler: () => void;
  nextHandler: () => void;
}

const Monitor: FC<IMonitorProps> = ({
  currentDate,
  prevHandler,
  todayHandler,
  nextHandler,
}) => {
  // для режима отображения: November 2023 (Month) или 2023 (Year)
  const index = useAppSelector((state) => state.menu);

  const mode = modesMonitor[index].mode; // 'month' (режим отображения заголовка в Monitor: Month)
  // console.log(typeof(modesMonitor[0].mode))
  
  // active button (mode): "<", "Today" or ">"
  // const [modeDate, setModeDate] = useState(false)
  // setModeDate(true); // active mode Date

  return (
    <DivWrapper>
      {mode == 'months' ? (
        <div id="red">
          <TitleWrapper>{currentDate.format('MMMM')}</TitleWrapper>
          <TextWrapper>{currentDate.format('YYYY')}</TextWrapper>
        </div>
      ) : mode == 'years' ? (
        <div>
          <TitleWrapper>{currentDate.format('YYYY')}</TitleWrapper>
        </div>
      ) : mode == 'weeks' ? (
        <div>
          <TitleWrapper>{`${currentDate
            .clone()
            .startOf('week')
            .format('D')}-${currentDate
            .clone()
            .endOf('week')
            .format('D')} `}</TitleWrapper>
          <TextWrapper>{currentDate.format('MMMM yyyy')}</TextWrapper>
        </div>
      ) : mode == 'days' ? (
        <div>
          <TitleWrapper>{currentDate.format('MMMM, dddd')}</TitleWrapper>
          <TextWrapper>{currentDate.format('D,')}</TextWrapper>
          <TextWrapper>{currentDate.format(' H:mm')}</TextWrapper>
        </div>
      ) : ( //это не обязательно: если ничего, то режим отображения, как в Day 
        <div>
          <TitleWrapper>{currentDate.format('MMMM, dddd')}</TitleWrapper>
          <TextWrapper>{currentDate.format('D,')}</TextWrapper>
          <TextWrapper>{currentDate.format(' H:mm')}</TextWrapper>
        </div>
      )}
      <ButtonsWrapper>
        <ButtonWrapper
          onClick={prevHandler}
          $isActiveDate={moment().isAfter(currentDate, mode) ? true : false}
        >
          {' '}
          &lt;{' '}
        </ButtonWrapper>
        <TodayButton
          onClick={todayHandler}
          $isActiveDate={currentDate.isSame(moment(), mode) ? true : false}
        >
          Today
        </TodayButton>
        <ButtonWrapper
          onClick={nextHandler}
          $isActiveDate={moment().isBefore(currentDate, mode) ? true : false}
        >
          {' '}
          &gt;{' '}
        </ButtonWrapper>
      </ButtonsWrapper>
    </DivWrapper>
  );
};

export default Monitor;
