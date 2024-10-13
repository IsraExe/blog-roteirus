import { useState } from 'react';

const Pagination = ({ totalPosts }: { totalPosts: number }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalPosts / 5);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const previousPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className='mb-2'>
      <nav aria-label='Page navigation all blogs list'>
        <ul className='flex items-center -space-x-px h-8 text-sm'>
          <li>
            <button onClick={previousPage} disabled={currentPage === 1} className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
              <span className='sr-only'>Previous</span>
              <svg className='w-2.5 h-2.5 rtl:rotate-180' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
                <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 1 1 5l4 4' />
              </svg>
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center px-3 h-8 leading-tight border 
                    ${page === currentPage
                    ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
              >
                {page}
              </button>
            </li>
          ))}

          <li>
            <button onClick={nextPage} disabled={currentPage === totalPages} className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
              <span className='sr-only'>Next</span>
              <svg className='w-2.5 h-2.5 rtl:rotate-180' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
                <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 9 4-4-4-4' />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );

};

export default Pagination;