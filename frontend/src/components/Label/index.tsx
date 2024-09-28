import { LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  text: string;
};

const Label = ({ text, ...props }: LabelProps) => {
  return (
    <label {...props} className='text-lg font-medium text-gray-700'>{text}</label>
  );
};

export default Label;