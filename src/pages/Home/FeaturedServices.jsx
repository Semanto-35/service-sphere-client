import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';



import axios from 'axios';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Skeleton component for loading state
const ServiceSkeleton = () => {
  return (
    <Card className="overflow-hidden bg-white dark:bg-[rgb(1,21,30)] h-full">
      <CardHeader shadow={false} floated={false} className="h-64 relative overflow-hidden">
        <div className="h-full w-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
      </CardHeader>
      <CardBody className='flex-grow'>
        <div className="mb-2 flex items-center justify-between">
          <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-6 w-1/5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-4" />
      </CardBody>
      <CardFooter className="pt-0">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
};

const FeaturedServices = () => {
  const { data: services, isLoading, isError, refetch } = useQuery({
    queryKey: ['featuredServices'], 
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/featuredServices`);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 2
  });

  // Rendering skeletons during loading
  if (isLoading) {
    return (
      <div className='w-full max-w-screen-2xl mx-auto my-16 lg:my-24 px-4'>
        <Typography variant='h2' className='text-center'>Featured Services</Typography>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
          {[...Array(6)].map((_, index) => (
            <ServiceSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-screen-2xl mx-auto my-16 lg:my-24 px-4 text-center">
        <Typography variant="h2" className="text-center">Featured Services</Typography>
        <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-lg mt-12">
          <Typography variant="h4" color="red" className="mb-2">
            ⚠️ Unable to Load Services
          </Typography>
          <Typography className="mb-4 text-gray-700 dark:text-gray-300">
            We're having trouble connecting to our servers. Please try again later.
          </Typography>
          <Button onClick={refetch} color="red" className="mt-2">
            Retry Loading
          </Button>
        </div>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="w-full max-w-screen-2xl mx-auto my-16 lg:my-24 px-4 text-center">
        <Typography variant="h2" className="text-center">Featured Services</Typography>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg mt-12">
          <Typography variant="h4" className="mb-2">
            No Featured Services Available
          </Typography>
          <Typography className="mb-4 text-gray-700 dark:text-gray-300">
            Check back soon for our featured selections.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full max-w-screen-2xl mx-auto my-16 lg:my-24 px-4'>
      <Typography variant='h2' className='text-center'>
        Featured Services
      </Typography>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
        {services.map(service => (
          <motion.div 
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.025 }}
            className="h-full"
          >
            <Card className="overflow-hidden group bg-white dark:bg-[rgb(1,21,30)] h-full">
              <CardHeader shadow={false} floated={false} className="h-64 relative overflow-hidden">
                <img
                  src={service.serviceImage}
                  alt={service.serviceTitle}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
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
                  className="font-normal dark:text-white/50 line-clamp-3"
                >
                  {service.description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/service/${service._id}`}>
                  <Button
                    color='light-blue'
                    fullWidth={true}
                    className="flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                  >
                    See Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedServices;