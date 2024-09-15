//! Step 4: Поле ввода "Количество приёмов": например: "3" раза в "день"/"неделя"/"месяц"...
import { FC } from 'react';
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { FormStep } from '../../stylesRecipePage/sc_RecipePage';
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import NumberInputMUI from './NumberInputMUI';
import { IRecipe } from '../../../../types/types';

interface IProps {
  register: UseFormRegister<IRecipe>; // от 'react-hook-form'
  watch: UseFormWatch<IRecipe>;
  control: Control<IRecipe, any>;
}

const StepFour: FC<IProps> = ({ register, watch, control }) => {
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
        Шаг #4: Количество приёмов
      </Typography>
      {/* сколько раз? */}
      <Controller
        control={control} // передали через пропсы из RecipeForm
        name="quantity" //! имя поля
        defaultValue={3} // ? set defaultValue
        rules={{
          required: true, // поле обязательное
        }}
        render={({ field }) => (
          // Компонент от Material-UI в данном файле (выше)
          <>
            <FormHelperText>*Пример: 3 раз/в день</FormHelperText>
            <NumberInputMUI
              disabled={watch('independently') || watch('position') == 'while'} //? кнопки не активны
              placeholder="часы"
              aria-label="Quantity Input"
              min={0}
              max={24}
              id="intervalMinute"
              {...field} // ловит значение (от react-hook-form)
              //! чтобы при изменении значений, сохранялись в кеш для перехода назад и вперед
              onChange={(_, value) => {
                // событие изменение
                field.onChange(value); // присваивает значение
              }}
            />
          </>
        )}
      />

      {/*//* Controller от "react-hook-form", чтобы значения при "disabled" не отправлялись данные из "defaultValue" */}
      {/*// Обычный {...register()}  при "disabled" всё равно отправляет объекты со значениями (defaultValue) */}
      <FormControl fullWidth>
        <Controller
          control={control} // передали через пропсы из RecipeForm
          name="unitTime" // имя поля
          defaultValue={'day'} // ? set defaultValue
          rules={{
            required: true, // обязательное к заполнению поле
          }}
          render={({ field }) => (
            // Select от Material-UI: https://mui.com/material-ui/react-select/
            <>
              <FormHelperText>раз[a]/в</FormHelperText>
              <Select
                {...register('unitTime')}
                name="unitTime"
                id="unitTime"
                required={true}
                defaultValue={'day'}
              >
                <MenuItem value={'day'}>день</MenuItem>
                <MenuItem value={'week'}>неделю</MenuItem>
                <MenuItem value={'month'}>месяц</MenuItem>
              </Select>
            </>
          )}
        />
      </FormControl>
    </FormStep>
  );
};

export default StepFour;
