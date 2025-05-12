import { FaCircleNotch } from 'react-icons/fa6';

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
      <div className='flex flex-col items-center gap-2'>
        <FaCircleNotch className='w-16 h-16 animate-spin text-gray-600' />
      </div>
    </div>
  );
};

export default Loading;