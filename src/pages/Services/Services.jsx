import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Option, Select, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { SquaresPlusIcon } from '@heroicons/react/24/solid';


const Services = () => {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');


  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-services?filter=${filter}&search=${search}`
        );

        const sortedData = [...data].sort((a, b) =>
          sortOrder === 'ascending' ? a.price - b.price : b.price - a.price
        );

        setServices(sortedData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchAllServices();
  }, [filter, search, sortOrder]);

  const handleReset = () => {
    setFilter('');
    setSearch('');
    setSortOrder('ascending');
  }

  const h2Variants = {
    hidden: { opacity: 0, y: -150 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  const pVariants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  return (
    <div className='w-full max-w-screen-2xl mx-auto mt-[76px] pb-16 lg:pb-24'>
      <div className="w-full h-[400px] bg-cover bg-center bg-opacity-50 flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80')",
        }}
      >
        <motion.h2
          className="text-4xl font-semibold"
          variants={h2Variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Find a company you can trust
        </motion.h2>
        <motion.p
          className="text-xl mt-4"
          variants={pVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Realviews by real people.
        </motion.p>
      </div>
      <Typography
        variant='h3'
        className='mt-16 text-center'
      >
        All Services
      </Typography>
      <div className='mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6'>
        <div>
          <Select color="blue" label="Select Category"
            value={filter}
            onChange={(value) => setFilter(value)}
          >
            <Option value="">All Categories</Option>
            <Option value="Web Hosting">Web Hosting</Option>
            <Option value="Digital Marketing">Digital Marketing</Option>
            <Option value="Graphic Design">Graphic Design</Option>
            <Option value="Software Development">Software Development</Option>
            <Option value="Consulting">Consulting</Option>
          </Select>
        </div>
        <div>
          <Input
            label='Search services title....'
            type='text'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div>
          <Select color="blue" label="Sort by Price" value={sortOrder} onChange={(value) => setSortOrder(value)}>
            <Option value="ascending">Ascending</Option>
            <Option value="descending">Descending</Option>
          </Select>
        </div>
        <div>
          <Button variant='outlined' color='blue' onClick={handleReset}>reset</Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mx-4 lg:mx-0'>
        {services.length > 0 ? (
          services.map(service => (<motion.div key={service._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.025 }}
          >
            <Card className="overflow-hidden group bg-white dark:bg-[rgb(1,21,30)] h-full">
              <CardHeader shadow={false} floated={false} className="h-64 relative overflow-hidden">
                <img
                  src={service.serviceImage}
                  alt="card-image"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </CardHeader>
              <CardBody className='flex-grow'>
                <div className="mb-2 flex items-center justify-between text-black dark:text-white">
                  <div>
                    <Typography variant='lead'>
                      {service.serviceTitle}
                    </Typography>
                    <Typography variant='small' className="flex items-center gap-2 font-medium">
                      <SquaresPlusIcon className='w-4 text-amber-400' />
                      {service.category}
                    </Typography>
                  </div>
                  <Typography color="amber" className="font-medium">
                    ${service.price}
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  className="font-normal dark:text-white/50"
                >
                  {service.description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/service/${service._id}`}>
                  <Button
                    fullWidth
                    color='light-blue'
                  >
                    See Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>))
        ) : (
          <Typography variant="h6" className="text-center">
            No services found.
          </Typography>
        )
        }
      </div>
    </div>
  );
};

export default Services;