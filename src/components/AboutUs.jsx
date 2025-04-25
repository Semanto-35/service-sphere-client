// import React from 'react';

// const AboutUs = () => {
//   return (
//     <div className="w-full pb-16 max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center bg-gray-50 gap-8 my-12">
//       <div className="lg:w-1/2">
//         <img
//           src="https://i.ibb.co.com/jG0xqt6/service-2.jpg"
//           alt="About Us"
//           className="rounded-lg shadow-lg w-full h-full"
//         />
//       </div>
//       <div className="lg:w-1/2 mx-4">
//         <h3 className="text-2xl font-bold mb-4">Who We Are</h3>
//         <p className="text-gray-600">
//           We are a dedicated platform focused on connecting users with top-notch
//           services while fostering a community of trust and transparency. Our mission
//           is to empower users with reliable reviews and provide seamless interaction
//           with service providers.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;


// import React from 'react';

// const AboutUs = () => {
//   return (
//     <section className="w-full max-w-screen-2xl mx-auto px-4 lg:px-8 py-20 bg-white">
//       <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
//         {/* Text Content */}
//         <div className="space-y-6">
//           <span className="text-sm uppercase text-primary font-semibold tracking-wider">
//             About Us
//           </span>
//           <h2 className="text-4xl font-bold text-gray-800 leading-tight">
//             Empowering Connections, Building Trust
//           </h2>
//           <p className="text-gray-600 text-lg leading-relaxed">
//             At the core of our platform lies a commitment to bridging the gap between service providers and users. We believe in transparency, trust, and reliability—helping you make informed decisions backed by real experiences.
//           </p>
//           <p className="text-gray-600 text-lg leading-relaxed">
//             Whether you're searching for top-rated professionals or looking to share your own feedback, our platform offers a seamless, user-focused experience.
//           </p>
//         </div>

//         {/* Image */}
//         <div className="w-full">
//           <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
//             <img
//               src="https://i.ibb.co.com/jG0xqt6/service-2.jpg"
//               alt="Professional collaboration"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-20" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;


import React from 'react';

const AboutUs = () => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto py-16 px-4">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-6">
            Who We Are
          </h2>
          <p className="leading-relaxed text-lg">
            We are a dedicated platform committed to connecting users with top-tier services,
            while cultivating a culture of trust and transparency. Our mission is to empower
            users with insightful reviews and ensure seamless interactions with verified
            service providers.
          </p>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            src="https://i.ibb.co.com/jG0xqt6/service-2.jpg"
            alt="Team collaborating"
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
