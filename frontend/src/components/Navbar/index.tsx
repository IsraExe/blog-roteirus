'use client';

import Link from 'next/link';

type NavbarProps = {
  title: string
};

const Navbar = ({ title }: NavbarProps) => {
  return (
    <nav className='fixed top-0 left-0 w-full bg-gray-800 text-white h-16'>
      <div className='flex justify-end items-center h-full pr-5'>
        <div className='text-lg font-bold'>
          {title}
        </div>
        <div className='space-x-4'>
          <Link href='/' className='text-white'>
            Home
          </Link>
          <Link href='/createArticle' className='text-white'>
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
