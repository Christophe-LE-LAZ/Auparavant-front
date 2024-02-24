import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { clearMemoryState } from '../../store/createMemoryReducer';
import { fetchMemories } from '../../store/memoriesReducer';

export default function Layout() {
  const dispatch = useAppDispatch();

  // Effacer le state de memory lorsqu'on change de page
  const location = useLocation();
  useEffect(() => {
    dispatch(clearMemoryState());
  }, [location]);

  return (
    <div className="relative m-auto w-auto max-w-7xl">
      <Header />
      <div className="relative pt-40 pb-16 sm:pt-0 sm:pb-0">
        <main className="shadow-lg mt-5 pb-2 sm:mt-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
