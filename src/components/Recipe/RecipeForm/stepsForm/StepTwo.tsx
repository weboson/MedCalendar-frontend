//! Step 2: Поле ввода (input type="number") интервала времени приёма лекарства
// Численный input в Material-UI двольно сложно реализуется: https://mui.com/base-ui/react-number-input/
import { FC } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { FormStep } from '../../stylesRecipePage/sc_RecipePage';
import { Checkbox, FormControlLabel, FormHelperText, Typography } from '@mui/material';
import NumberInputMUI from './NumberInputMUI';
import { IRecipe } from '../../../../types/types';


interface IProps {
  register: UseFormRegister<IRecipe>; // от 'react-hook-form'
  errors: FieldErrors<FieldValues>; // от 'react-hook-form'
  watch: UseFormWatch<IRecipe>;
  control: Control<IRecipe, any>;
}

const StepTwo: FC<IProps> = ({ register, watch, control }) => {
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
        Шаг #2: Зависимость приёма
      </Typography>
      {/* //! Checkbox - вне зависимости */}
      <div>
        <FormControlLabel
          control={<Checkbox />}
          label="Приём вне зависимости" // onClick={() => unregister('independently')} // если выбрано, то не отправлять (не регистрировать) значение полей name="action"
          {...register('independently')}
          name="independently"
          defaultChecked={false}
          sx={{ margin: '0' }}
        />
      </div>
      {/* //! Интервал времени */}
      <div className="interval">
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
          Интервал времени: введите время{' '}
        </Typography>
        <FormHelperText>*Пример: приём за "1 час" и "0 мин" перед приёмом пищи </FormHelperText>
        <label htmlFor="intervalMinute">часы: </label>
        {/*//* Controller от "react-hook-form", чтобы взять данные с нестандартного поля MUI */}
        {/*// Обычный {...register()}  не ловит измененное значение*/}
        <Controller
          control={control} // передали через пропсы из RecipeForm
          name="interval.hour" //! имя поля
          defaultValue={0} // ? set defaultValue
          rules={{
            required: !watch('independently'), // если галочка нет на "вне зависимости", то поле обязательное
            //? условия "независимо" или приём вовремя еды - активное или неактивное
            disabled: watch('independently') || watch('position') == 'while', //? отправляет пустой объект "interval":{}}
          }}
          render={({ field }) => (
            // Компонент от Material-UI в данном файле (выше)
            <>
              <NumberInputMUI
                disabled={
                  watch('independently') || watch('position') == 'while'
                } //? кнопки не активны
                placeholder="часы"
                aria-label="Quantity Input"
                min={0}
                max={24}
                id="intervalMinute"
                {...field} // ловит значение (от react-hook-form)
                //! чтобы при изменении значений, сохранялись в кеш для перехода назад и вперед
                onChange={(_, value) => {
                  // событие изменение
                  field.onChange(value);  // присваивает значение
                }}
              />
            </>
          )}
        />

        <label htmlFor="intervalMinute">минуты: </label>
        <br />
        <Controller
          control={control} // передали через пропсы из RecipeForm
          name="interval.minute"
          defaultValue={0}
          rules={{
            required: !watch('independently'), // если галочка нет на "вне зависимости", то поле обязательное
            //? условия "независимо" или приём вовремя еды - активное или неактивное
            disabled: watch('independently') || watch('position') == 'while', //? отправляет пустой объект "interval":{}}
          }}
          render={({ field }) => (
            // Компонент от Material-UI в данном файле (выше)
            <>
              <NumberInputMUI
                disabled={
                  watch('independently') || watch('position') == 'while'
                } //? кнопки не активны
                placeholder="минуты"
                aria-label="Quantity Input"
                // defaultValue={0}
                min={10}
                max={50}
                step={10}
                id="intervalMinute"
                {...field}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
              />
            </>
          )}
        />
      </div>
    </FormStep>
  );
};

export default StepTwo;
