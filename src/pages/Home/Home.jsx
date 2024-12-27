import React from 'react';
import Banner from './Banner';
import FeaturedServices from './FeaturedServices';
import OurPartners from './OurPartners';
import HowItWorks from './HowItWorks';
import Counts from '../../components/Counts';
import AboutUs from '../../components/AboutUs';

const Home = () => {
  return (
    <div>
      <header className='mt-6'>
        <Banner></Banner>
      </header>
      <section>
        <FeaturedServices></FeaturedServices>
      </section>
      <section>
        <OurPartners></OurPartners>
        <HowItWorks></HowItWorks>
        <Counts></Counts>
        <AboutUs></AboutUs>
      </section>
    </div>
  );
};

export default Home;