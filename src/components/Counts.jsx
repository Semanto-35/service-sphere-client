import axios from 'axios';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const Counts = () => {
  const [stats, setStats]=useState({services: 0,
    reviews: 0,});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/stats`);
        setStats(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);


  return (
    <div className="max-w-7xl bg-white py-12 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Platform Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center bg-cyan-100 rounded-lg">
        <div className="p-8">
          <h3 className="text-xl font-semibold text-blue-600">Total Services</h3>
          <CountUp start={0} end={stats.services} duration={2.5} separator="," className="text-4xl font-bold text-gray-800" />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-green-600">Total Reviews</h3>
          <CountUp start={0} end={stats.reviews} duration={2.5} separator="," className="text-4xl font-bold text-gray-800" />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-orange-600">Active Users</h3>
          <CountUp start={0} end={10} duration={2.5} separator="," className="text-4xl font-bold text-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default Counts;