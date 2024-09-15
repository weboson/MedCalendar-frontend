//! Step 3: Поле ввода (input type="number") интервала времени приёма лекарства
import { FC } from 'react';
import { FormStep } from '../../stylesRecipePage/sc_RecipePage';
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { IRecipe } from '../../../../types/types';

interface IProps {
  register: UseFormRegister<IRecipe>; // от 'react-hook-form'
  watch: UseFormWatch<IRecipe>;
  control: Control<IRecipe, any>;
}

const StepThree: FC<IProps> = ({ watch, control, register }) => {
  return (
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
        Шаг #3: Особенности приёма
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontSize: '1.2em',
          color: '#6f6e6e',
          fontWeight: '400',
          margin: '2%',
        }}
      >
        Принимать лекарство:{' '}
      </Typography>
      <FormHelperText>*Пример: "перед" - "приём пищи"</FormHelperText>
      {/* //! перед, вовремя, после */}
      {/*//* Controller от "react-hook-form", чтобы при "disabled" данные совсем не отправлялись */}
      {/* // Обычный {...register()}  в "Controller" работает, как надо - без onChange */}
      <FormControl fullWidth>
        <Controller
          control={control} // передали через пропсы из RecipeForm
          name="position" // имя поля
          defaultValue={'before'} // ? set defaultValue
          rules={{
            //? условия "приём независимо"
            required: !watch('independently'), // если галочки нет на "вне зависимости", то поле обязательное
            disabled: watch('independently'), //? true = ничего отправляет
          }}
          render={({ field }) => (
            // Select от Material-UI: https://mui.com/material-ui/react-select/
            <>
              <Select
                {...register('position')} //! Обычный {...register()}  в "Controller" работает, как надо - без onChange
                id="position"
                disabled={watch('independently')} // если галочка то не активна
                defaultValue={'before'}
                //! работает без onChange:
                // onChange={(_, value) => {
                //   field.onChange(value);
                // }}
              >
                <MenuItem value={'before'} >
                  перед
                </MenuItem>
                <MenuItem value={'while'}>вовремя</MenuItem>
                <MenuItem value={'after'}>после</MenuItem>
              </Select>
            </>
          )}
        />
      </FormControl>

      {/* //! еда, завтрак, ужин... */}
      <FormControl fullWidth>
        <Controller
          control={control} // передали через пропсы из RecipeForm
          name="action" // имя поля
          defaultValue={'eating'} // ? set defaultValue
          rules={{
            //? условия "приём независимо"
            required: !watch('independently'), // если галочки нет на "вне зависимости", то поле обязательное
            disabled: watch('independently'), //? true = ничего отправляет
          }}
          render={({ field }) => (
            // Select от Material-UI: https://mui.com/material-ui/react-select/
            <>
              <Select
                {...register('action')} //! Обычный {...register()}  в "Controller" работает, как надо и без onChange
                id="action"
                disabled={watch('independently')} // если галочка то не активна
                defaultValue={'eating'}
                //! работает без onChange:
                // onChange={(_, value) => {
                //   field.onChange(value);
                // }}
              >
                <MenuItem value={'eating'} selected>
                  приём пищи
                </MenuItem>
                <MenuItem value={'firstBreakfast'}>завтрак</MenuItem>
                <MenuItem value={'lastSupper'}>ужин</MenuItem>
                <MenuItem value={'sleep'}>сон</MenuItem>
              </Select>
            </>
          )}
        />
      </FormControl>

    </FormStep>
  );
};

export default StepThree;
