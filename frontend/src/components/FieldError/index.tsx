type FieldErrorProps = {
  message: string;
};

const FieldError = ({ message }: FieldErrorProps) => {
  return (
    <span className='text-red-500 text-sm'>{message}</span>
  );
};

export default FieldError;