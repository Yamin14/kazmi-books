import React, { Suspense } from 'react'
import { useLocation } from 'react-router';
import Loading from './Loading';
const Navbar = React.lazy(() => import('./Nav/Navbar'));
const Footer = React.lazy(() => import('./Footer'));

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  //paths
  const location = useLocation();
  const noFooterPaths = ['/books/', '/auth/'];
  const navBarPaths = ['/books'];

  //return
  return (
    <Suspense fallback={<Loading />}>
      <div className='min-h-screen h-full flex flex-col'>
        {navBarPaths.includes(location.pathname) && <Navbar />}
        <main className='flex-grow'>{children}</main>
        {!noFooterPaths.some((path) => location.pathname.startsWith(path)) && <Footer />}
      </div>
    </Suspense>
  )
}

export default Layout