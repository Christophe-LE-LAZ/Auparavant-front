import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="absolute h-screen w-screen">
      <Header />
      <div className='absolute inset-y-40'>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
