import React from 'react';
import Banner from './Banner';
import FeaturedServices from './FeaturedServices';
import OurPartners from './OurPartners';
import HowItWorks from './HowItWorks';
import Counts from '../../components/Counts';
import AboutUs from '../../components/AboutUs';
import Newsletter from './NewsLetter';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedServices></FeaturedServices>
      <OurPartners></OurPartners>
      <HowItWorks></HowItWorks>
      <Counts></Counts>
      <AboutUs></AboutUs>
      <Newsletter/>
    </div>
  );
};

export default Home;