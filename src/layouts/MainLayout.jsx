import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';
import Title from '../components/Title';

const MainLayout = () => {
  return (
    <div>
      <Title></Title>
      <header>
        <NavbarComponent></NavbarComponent>
      </header>
      <main className='min-h-[calc(100vh-640px)]'>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;