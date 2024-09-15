'use client';

import Link from 'next/link';

type NavbarProps = {
  title: string
};

const Navbar = ({ title }: NavbarProps) => {
  return (
    <nav className='fixed top-0 left-0 w-full bg-gray-800 text-white'>
      <div className='container mx-auto px-4 py-2 flex items-center justify-between'>
        <div className='text-lg font-bold'>
          {title}
        </div>
        <div className='space-x-4'>
          <Link href='/'>
            Home
          </Link>
          <Link href='/create'>
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
