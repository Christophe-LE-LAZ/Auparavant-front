import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="relative">
      <Header />
      <div className='relative pt-40 pb-20 sm:pt-0 sm:pb-0'>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
