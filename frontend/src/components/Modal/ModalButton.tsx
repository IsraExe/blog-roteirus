
interface ModalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
};

export function ModalButton({ text, loading, ...props }: ModalButtonProps) {

  return (
    <button
      type='button'
      className={`w-full rounded-lg px-3 py-2 font-bold flex justify-center items-center 
        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
      {...props}
    >
      {loading ? 'Carregando...' : text}
    </button>
  );

};