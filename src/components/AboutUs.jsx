import React from 'react';

const AboutUs = () => {
  return (
    <div className="w-full pb-16 max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center bg-gray-50 gap-8 my-12">
      <div className="lg:w-1/2">
        <img
          src="https://i.ibb.co.com/jG0xqt6/service-2.jpg"
          alt="About Us"
          className="rounded-lg shadow-lg w-full h-full"
        />
      </div>
      <div className="lg:w-1/2 mx-4">
        <h3 className="text-2xl font-bold mb-4">Who We Are</h3>
        <p className="text-gray-600">
          We are a dedicated platform focused on connecting users with top-notch
          services while fostering a community of trust and transparency. Our mission
          is to empower users with reliable reviews and provide seamless interaction
          with service providers.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
