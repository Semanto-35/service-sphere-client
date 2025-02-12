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
      <Banner></Banner>
      <FeaturedServices></FeaturedServices>
      <OurPartners></OurPartners>
      <HowItWorks></HowItWorks>
      <Counts></Counts>
      <AboutUs></AboutUs>
    </div>
  );
};

export default Home;