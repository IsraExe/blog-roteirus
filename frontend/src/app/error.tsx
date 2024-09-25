'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>Oops! Something went wrong.</h1>
        <p className='text-gray-600 mb-6'>An unexpected error occurred. Please try again.</p>
        <button
          className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300'
          onClick={() => reset()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};