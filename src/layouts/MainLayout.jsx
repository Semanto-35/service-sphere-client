import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div>
      <header>
        <NavbarComponent></NavbarComponent>
      </header>
      <main className='min-h-[calc(100vh-80px)]'>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;