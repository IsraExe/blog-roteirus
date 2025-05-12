'use client';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const getMenuList = (pathname: string) => {
  return [
    {
      href: '/',
      label: 'Home',
      active: pathname === '/',
    },
    {
      href: '/criar-artigo',
      label: 'Criar review',
      active: pathname.includes('/criar-artigo'),
    },
    {
      href: '/meu-perfil',
      label: 'Meu perfil',
      active: pathname.includes('/meu-perfil'),
    },
  ];
};

const Navbar = () => {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <nav className='fixed top-0 left-0 w-full mx-auto bg-gray-800 text-white h-16 z-10 px-2 lg:px-0'>
      <div className='flex items-center mx-auto h-full max-w-4xl'>
        <div className='text-lg font-bold'>
          <Link href='/'>
            <Image src='/logo_positive.png' alt='logo' width={50} height={50} priority />
          </Link>
        </div>
        <div className='flex-1 justify-end h-full self-end flex gap-2'>
          {menuList.map((menu) => (
            <div key={menu.href} className={cn('h-full px-1 flex items-center', menu.active && 'border-b-2 border-[#f1ebeb] pt-0.5')}>
              <Link href={menu.href} className={cn('text-sm', menu.active ? 'text-white' : 'text-[#fffcfcd8]')}>
                {menu.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;