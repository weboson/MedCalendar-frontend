//! Step 5: Поле ввода "Курс приёма" (продолжительность приёма ЛС): input type="number" и Select
import { FC } from 'react';
import {
  Control,
  Controller,
  UseFormRegister,
} from 'react-hook-form';
import { FormStep } from '../../stylesRecipePage/sc_RecipePage';
import { FormControl, FormHelperText, MenuItem, Select, Typography } from '@mui/material';
import NumberInputMUI from './NumberInputMUI';
import { IRecipe } from '../../../../types/types';

interface IProps {
  register: UseFormRegister<IRecipe>; // от 'react-hook-form'
  control: Control<IRecipe, any>;
}

const StepFive: FC<IProps> = ({ control, register }) => {
  return (
    //! Курс приёма */}
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
        Шаг #5: Курс приёма ЛС
      </Typography>
      <FormHelperText>*Пример: "1 месяцев"</FormHelperText>
      <Controller
        control={control} // передали через пропсы из RecipeForm
        name="duration.index" //! имя поля
        defaultValue={1} // ? set defaultValue
        rules={{
          required: true, // поле обязательное
        }}
        render={({ field }) => (
          // Компонент от Material-UI в данном файле (выше)
          <>
            <NumberInputMUI
              placeholder="число"
              min={1}
              max={30}
              id="durationIndex"
              {...field} // ловит значение (от react-hook-form)
              //! чтобы при изменении значений, сохранялись в кеш для перехода назад и вперед
              onChange={(_, value) => {
                // событие изменение
                field.onChange(value); // присваивает значение
                console.log(value)
              }}
            />
          </>
        )}
      />

      <FormControl fullWidth>
        <br />
        <Controller
          control={control} // передали через пропсы из RecipeForm
          name="duration.title" //! имя поля, также, как register
          defaultValue={'months'} // ? set defaultValue
          rules={{
            required: true, // обязательное к заполнению поле
          }}
          render={({ field }) => (
            // Select от Material-UI: https://mui.com/material-ui/react-select/
            <>
              <Select
                {...register('duration.title')}
                name="duration.title" //! имя поля, также, как register
                id="durationTitle"
                required={true}
                defaultValue={'months'}
              >
                <MenuItem value={'days'}>день</MenuItem>
                <MenuItem value={'weeks'}>неделя</MenuItem>
                <MenuItem value={'months'}>месяц</MenuItem>
                <MenuItem value={'years'}>год</MenuItem>
              </Select>
            </>
          )}
        />
      </FormControl>
    </FormStep>
  );
};

export default StepFive;
