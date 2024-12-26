import React from 'react';
import Banner from './Banner';
import FeaturedServices from './FeaturedServices';
import OurPartners from './OurPartners';

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
      </section>
    </div>
  );
};

export default Home;