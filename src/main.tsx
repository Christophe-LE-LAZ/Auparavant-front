import React from 'react';
import ReactDOM from 'react-dom/client';

import Root from './components/Root/Root';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import Disclaimer from './components/Disclaimer/Disclaimer';
import Register from './components/Register/Register';
import AboutUs from './components/AboutUs/AboutUs';
import Contact from './components/Contact/Contact';
import Contributions from './components/Contributions/Contributions';
import Loader from './components/Loader/Loader';
import Home from './components/Home/Home';
import FAQ from './components/FAQ/FAQ';
import Memories from './components/Memories/Memories';
import Memory from './components/Memory/Memory';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Create from './components/Create/Create';
import Update from './components/Update/Update';

// Store redux
import { Provider } from 'react-redux';
import store from './store';

// import 'tailwindcss/tailwind.css';

// Router 
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' loader={Loader} element={<Layout />}>
        <Route index loader={Loader} element={<Home />} />
        <Route path='/memories' loader={Loader} element={<Memories />}/>
        <Route path='/memories/create' element={<Create />}/>
        <Route path='/memories/:id' element={<Memory />}/>
        <Route path='/memories/:id/update' element={<Update />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/contributions' element={<Contributions />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/about-us' element={<AboutUs />}/>
        <Route path='/disclaimer' element={<Disclaimer />}/>
        <Route path='/faq' element={<FAQ />}/>
        <Route path="*" element={<NotFound />}/>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>  
          <RouterProvider router={router} />
       </Provider> 
  </React.StrictMode>
);



