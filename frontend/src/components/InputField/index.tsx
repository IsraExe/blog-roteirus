import { InputHTMLAttributes, forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
};

const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {

  return (
    <TextField
      {...props as TextFieldProps}
      margin='none'
      required
      fullWidth
      autoComplete='off'
      inputRef={ref}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'primary.main',
          },
          '&:hover fieldset': {
            borderColor: 'primary.dark',
          },
          // '&.Mui-focused fieldset': {
          //   borderColor: 'primary.main',
          // },
        },
      }}
    />
  );
});

InputField.displayName = 'InputField';

export default InputField;