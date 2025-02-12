import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../components/Spinner';

const FeaturedServices = () => {
  const { data: services, isLoading, isError, refetch } = useQuery({
    queryKey: ['featuredServices'], queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/featuredServices`)
      return data
    }
  });

  if (isLoading) return <Spinner />
  if (isError) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>⚠️ Failed to load services. Please try again.</p>
        <Button onClick={refetch} className="mt-2 bg-red-500">Retry</Button>
      </div>
    );
  }


  return (
    <div className='w-full max-w-screen-2xl mx-auto my-16 lg:my-24'>
      <Typography
        variant='h2'
        className='text-center'
      >
        Featured Services
      </Typography>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mx-4'>
        {
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
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </CardHeader>
              <CardBody className='flex-grow'>
                <div className="mb-2 flex items-center justify-between text-black dark:text-white">
                  <Typography variant='h5'>
                    {service.serviceTitle}
                  </Typography>
                  <Typography color='amber' variant='h6'>
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
                    color='light-blue'
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