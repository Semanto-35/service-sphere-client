import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';
import Title from '../components/Title';

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Title></Title>
      <header>
        <NavbarComponent></NavbarComponent>
      </header>
      <main className='flex-grow bg-blue-gray-50 dark:bg-blue-gray-800 text-gray-800 dark:text-gray-50'>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;