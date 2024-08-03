import { Typography } from '@mui/material';

type FieldErrorProps = {
  message: string
};

export default function FieldError({ message }: FieldErrorProps) {
  return (
    <div>
      <Typography sx={{ fontSize: '14px' }}>{message}</Typography>
    </div>
  );
}