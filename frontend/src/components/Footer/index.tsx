export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className='mx-auto py-4 w-full bg-gray-800'>
      <p className='text-center text-sm text-gray-300'>
        Copyright © <a href='#' className='text-gray-100 hover:underline'> Roteirus </a> {currentYear}.
      </p>
    </div>
  );
};