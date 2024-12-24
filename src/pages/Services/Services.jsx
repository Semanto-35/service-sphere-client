import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { SquaresPlusIcon } from '@heroicons/react/24/solid';


const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/services`);
        setServices(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const h2Variants = {
    hidden: { opacity: 0, y: -150 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  const pVariants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  return (
    <div className='w-full max-w-7xl mx-auto border-2 mt-6 mb-12'>
      <div className="w-full h-[500px] bg-cover bg-center bg-opacity-50 flex flex-col justify-center items-center text-white rounded-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80')",
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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
        {
          services.map(service => (<motion.div key={service._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.025 }}
          >
            <Card className="">
              <CardHeader shadow={false} floated={false} className="h-80">
                <img
                  src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <Typography variant='lead' color="blue-gray" className="font-medium">
                      {service.serviceTitle}
                    </Typography>
                    <Typography variant='small' color="blue-gray" className="flex items-center gap-2 font-medium">
                      <SquaresPlusIcon className='w-4' />
                      {service.category}
                    </Typography>
                  </div>
                  <Typography color="blue-gray" className="font-medium">
                    ${service.price}
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75"
                >
                  {service.description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/service/${service._id}`}>
                  <Button
                    fullWidth={true}
                  >
                    See Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>))
        }
      </div>
    </div>
  );
};

export default Services;