'use client';
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
    <nav className='fixed top-0 left-0 w-full mx-auto bg-gray-800 text-white h-16'>
      <div className='flex items-center mx-auto h-full max-w-4xl'>
        <div className='text-lg font-bold'>
          <Link href='/'>
            <Image src='/logo_positive.png' alt='logo' width={50} height={50} />
          </Link>
        </div>
        <div className='flex-1 justify-end h-full self-end flex gap-2'>
          {menuList.map((menu) => (
            <div key={menu.href} className={`h-full px-1 pt-3 ${menu.active && 'border-b-4 border-[#f1ebeb]'}`}>
              <Link href={menu.href} className={`text-white block p-0 flex items-start ${menu.active ? 'text-white' : 'text-[#fffcfcba]'}`}>
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