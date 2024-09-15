// ! пока не задействован
import { FC } from 'react';
import { InputWrapper } from '../stylesRecipePage/sc_RecipePage';

// ts тип для пропс
interface IMyLabelProps {
  type: string
  name: string
  placeholder: string
  label: string
  value: string | null
}

const MyLabel: FC<IMyLabelProps> = ({ type, name, placeholder, label, value }) => {
  return (
  <InputWrapper>
    <label htmlFor={name}>{label}</label>
    <input type={type} name={name} placeholder={placeholder} value={value}/>
  </InputWrapper>)
};

export default MyLabel;
