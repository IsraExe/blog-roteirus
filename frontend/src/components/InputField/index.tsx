import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {};

const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="w-full">
      <input
        {...props}
        ref={ref}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
