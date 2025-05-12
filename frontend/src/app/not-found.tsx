'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Página não encontrada</h1>
        <p className='text-lg text-gray-600 mb-6'>Erro 404 - A página que você está procurando não existe.</p>
        <Link
          href='/'
          className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300'
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};