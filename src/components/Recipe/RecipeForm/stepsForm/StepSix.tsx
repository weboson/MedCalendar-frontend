//! Step 6: Поле ввода "Дата старта курса" (дата начала приёма ЛС): input type="date"
//! + Button
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'; // для DatePicker
import 'dayjs/locale/ru'; // для формата даты
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormStep } from '../../stylesRecipePage/sc_RecipePage';
import { Button, Typography } from '@mui/material';
import moment from 'moment';
import { IRecipe } from '../../../../types/types';

interface IProps {
  control: Control<IRecipe, any>; // от 'react-hook-form'
}

const StepSix: FC<IProps> = ({ control }) => {
  return (
    //! дата старта
    <FormStep>
      <Typography
        id="stepTitle"
        variant="h6"
        component="h6"
        margin="normal"
        sx={{
          fontSize: '1.6em',
          color: '#6f6e6e',
          margin: '2%',
        }}
      >
        Шаг #6: Дата начала курса:
      </Typography>

      <LocalizationProvider dateAdapter={AdapterMoment}>
        {/* воспользуюсь moment() для текущего дня */}
        {/* по обычному захватить значение не получится, нужно "...fieldProps"*/}
        {/* проблема: возращаемый формат не нравится ("2024-07-07T19:00:00.000Z") (от defaultValue не зависит), придется при отправке на сервер: JSON.stringify(data.start).slice(0,11) */}
        {/* // onChange={(e) => onChange(e.target.value.slice(0, 11))} // также => "2024-07-07T19:00:00.000Z" */}
        {/* // defaultValue={moment('DD.MM.YYYY')} и 'moment('2022-04-17')' // также => "2024-07-07T19:00:00.000Z" + сообщение об устаривании*/}
        <Controller
          control={control}
          name="start"
          defaultValue={moment()}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, ...fieldProps } }) => {
            return (
              <>
                <DatePicker
                  setLocaleToValue
                  {...fieldProps.value.typeof}
                  onChange={onChange}
                  defaultValue={moment()}
                  format={'DD.MM.YYYY'} // формат показываемой даты
                  name="start"
                  //minDate={moment()} // помогает отключить прошлые даты
                  disablePast // или так, также помогает отключить прошлые даты
                />
              </>
            );
          }}
        />
      </LocalizationProvider>
      {/* //! кнопка "отправить" */}
      <Button style={{margin: '3px 0'}} variant="contained" type="submit">Отправить</Button>
    </FormStep>
  );
};

export default StepSix;
