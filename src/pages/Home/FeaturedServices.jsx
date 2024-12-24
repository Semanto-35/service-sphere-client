import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const FeaturedServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/featuredServices`);
        setServices(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);


  return (
    <div className='w-full max-w-7xl mx-auto border-2 my-12'>
      <Typography
        variant='h2'
        className='text-center'
      >
        Featured Services
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
                  <Typography color="blue-gray" className="font-medium">
                    {service.serviceTitle}
                  </Typography>
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

export default FeaturedServices;