import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../components/Spinner';

const FeaturedServices = () => {
  const { data: services, isLoading, isError } = useQuery({
    queryKey: ['featuredServices'], queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/featuredServices`)
      return data
    }
  });

  if (isLoading) return <Spinner />
  if (isError) return <p className="text-red-500">Failed to load services.</p>;


  return (
    <div className='w-full max-w-7xl mx-auto my-12'>
      <Typography
        variant='h2'
        className='text-center'
      >
        Featured Services
      </Typography>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mx-4'>
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
                  src={service.serviceImage}
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