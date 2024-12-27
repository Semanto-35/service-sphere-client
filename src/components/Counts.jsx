import React from 'react';
import CountUp from 'react-countup';

const Counts = () => {
  return (
    <div className="max-w-7xl bg-white py-12 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Platform Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center bg-cyan-100 rounded-lg">
        <div className="p-8">
          <h3 className="text-xl font-semibold text-blue-600">Total Services</h3>
          <CountUp start={0} end={1050} duration={2.5} separator="," className="text-4xl font-bold text-gray-800" />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-green-600">Total Reviews</h3>
          <CountUp start={0} end={4500} duration={2.5} separator="," className="text-4xl font-bold text-gray-800" />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-orange-600">Active Users</h3>
          <CountUp start={0} end={2000} duration={2.5} separator="," className="text-4xl font-bold text-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default Counts;