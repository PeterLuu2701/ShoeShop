import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const HomeTemplate = () => {
  return (
    <>
      <Header />
      <section className="content" style={{ minHeight: '65vh' }}>
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default HomeTemplate;
