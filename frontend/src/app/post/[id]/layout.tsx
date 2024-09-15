import Navbar from '@/components/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar title='' />
      {children}
    </>
  )
};

export default Layout;