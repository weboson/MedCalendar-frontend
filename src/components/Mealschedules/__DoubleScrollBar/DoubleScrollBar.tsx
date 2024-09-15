//! Это двойной почти нативный input type=range с регитсрацией полей для react-hook-form
//! НЕ задействован, используется Material UI версия Range Slider: https://mui.com/material-ui/react-slider/#range-slider
import { FC, useState, useEffect } from 'react';
import './DoubleScrollBar.css';
import { FieldValues, UseFormRegister } from 'react-hook-form';

// ts тип для пропс
interface IDoubleScrollBarProps {
  min: number;
  max: number;
  forid: string;
  step: number;
  classElem: string;
  register: UseFormRegister<FieldValues> // из 'react-hook-form'
}

export const DoubleScrollBar: FC<IDoubleScrollBarProps> = ({
  min,
  max,
  forid,
  step,
  classElem,
  register
}) => {
  // max = 24, min - 1
  const [inputFrom, setInputFrom] = useState(9); //! по-умолчанию от 9 часов для line
  const [inputTo, setInputTo] = useState(21); //! до 22

  // !-------
  useEffect(() => {
    // вывод 2-х значений
    const display = document.getElementById(forid); // display1 или display2 в RecipeForm.tsx
    // полоска между точками
    const slider = document.getElementById(`slider-${forid}`);
    // console.log({ inputFrom, inputTo });
    // чтобы диапазон был от 16 до 12 часов бодровствования (завтрак-ужин)
    if (inputTo - inputFrom <= 16 && inputTo - inputFrom >= 12) {
      if (inputFrom < inputTo) {
        display!.innerHTML = `Первый завтрак: ${inputFrom}:00 - Последний ужин: ${inputTo}:00`;
        slider!.style.right = `${100 - ((inputTo - min) / (max - min)) * 100}%`;
        slider!.style.left = `${((inputFrom - min) / (max - min)) * 100}%`;
        // цвет линии синий, если входит в дипазон:
          slider!.style.cssText += 'background-color: #2268f3; ';
      }
    } else {
      display!.innerHTML = `Первый завтрак: ${inputFrom}:00 - Последний ужин: ${inputTo}:00`;
      slider!.style.right = `${100-(inputTo-min)/(max-min)*100}%`;
      slider!.style.left = `${(inputFrom-min)/(max-min)*100}%`;
      // если не входит в диапазон, то красная линия и добавляется предупреждение
        slider!.style.cssText += 'background-color: red; ';
      // преждупреждение
      display!.innerHTML = "*Рекомендуется спать от 8 до 12 часов"

    }
  }, [inputFrom, inputTo, min, max, forid, step, classElem]);

  return (
    <div className={`${classElem}`}>
      <div className="range-slider">
        <span className="range-selected" id={`slider-${forid}`}></span>
      </div>
      <div className="range-input">
        <input
        {...register(`modeRegime.${classElem}.start`)} //! например "modeRegime":{"weekday":{"start":"9","end":"21"},"weekend":{"start":"9","end":"21"}}
          type="range"
          onChange={(e) => setInputFrom(parseFloat(e.target.value))} // чтобы дипазон часов не был слишком малым, можно сделать в обработчике (To - From >= 14 && To - From <= 16) для каждого класса инпута
          min={min} // 1
          max={max} // 24
          step={step} // 1
          defaultValue={9} // значение по-умолчанию для поинтов
        />
        <input
          {...register(`modeRegime.${classElem}.end`)} //! например "modeRegime":{"weekday":{"start":"9","end":"21"},"weekend":{"start":"9","end":"21"}}
          type="range"
          onChange={(e) => setInputTo(parseFloat(e.target.value))}
          min={min}
          max={max}
          step={step}
          defaultValue={21} // значение по-умолчанию для поинтов
        />
      </div>
    </div>
  );
};
