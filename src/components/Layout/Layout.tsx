import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="relative m-auto w-auto max-w-6xl">
      <Header />
      <div className='relative pt-40 pb-16 sm:pt-0 sm:pb-0'>
        <main className='shadow-lg pb-5 mt-5 sm:mt-10'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
