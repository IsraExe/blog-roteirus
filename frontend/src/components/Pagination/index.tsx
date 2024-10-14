import { useSearchParams } from 'next/navigation';
import { useSetSearchParams } from '@/hooks/useSetSearchParams';

const Pagination = ({ totalPosts }: { totalPosts: number }) => {
  const searchParams = useSearchParams();
  const { setSearchParams } = useSetSearchParams();

  const searchParamsPage = searchParams.get('page') || '1';
  const currentPage = Number(searchParamsPage);

  const postsPerPage = 10;

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const nextPage = () => setSearchParams('page', currentPage + 1);
  const previousPage = () => setSearchParams('page', currentPage - 1);

  const maxVisiblePages = 10;

  const halfVisible = Math.floor(maxVisiblePages / 2);
  const startPage = Math.max(1, Math.min(currentPage - halfVisible, totalPages - maxVisiblePages + 1));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  return (
    <div className='mb-2'>
      <nav aria-label='Page navigation all blogs list'>
        <ul className='flex items-center -space-x-px h-8 text-sm'>
          <li>
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <span className='sr-only'>Previous</span>
              <svg
                className='w-2.5 h-2.5 rtl:rotate-180'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 1 1 5l4 4'
                />
              </svg>
            </button>
          </li>

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
            <li key={page}>
              <button
                onClick={() => setSearchParams('page', page)}
                className={`flex items-center justify-center px-3 h-8 leading-tight border 
                    ${String(page) === String(currentPage)
                    ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
              >
                {page}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <span className='sr-only'>Next</span>
              <svg
                className='w-2.5 h-2.5 rtl:rotate-180'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 9 4-4-4-4'
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
