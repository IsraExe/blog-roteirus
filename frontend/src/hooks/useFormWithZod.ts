import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type UseFormWithZod<T extends FieldValues> = {
  schema: ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
};

export function useFormWithZod<T extends FieldValues>({ schema, onSubmit }: UseFormWithZod<T>) {

  const { register, handleSubmit, formState: { errors } } = useForm<T>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = handleSubmit(async (data) => await onSubmit(data));

  return {
    register,
    handleFormSubmit,
    errors,
  };

};