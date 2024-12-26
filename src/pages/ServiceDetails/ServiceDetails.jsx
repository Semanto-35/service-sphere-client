import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Collapse, List, ListItem, Textarea, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import useAuth from '../../hooks/useAuth';


const ServiceDetails = () => {
  const [service, setService] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();


  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/service/${id}`);
        setService(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const fetchReviewsData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchServiceData();
    fetchReviewsData();
  }, [id]);

  const { description, serviceTitle, serviceImage, companyName, addedDate, category, price, website } = service || {};



  const onSubmit = async (data) => {
    const reviewData = {
      serviceId: id,
      serviceTitle,
      userEmail: user?.email,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      ...data,
      reviewDate: new Date(),
    };

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-review`, reviewData);
      setReviews([...reviews, data]);
      reset();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className='border-2 max-w-7xl mx-auto px-4 my-8'>
      <div className="w-full h-[400px] bg-cover bg-center bg-opacity-50 flex flex-col justify-center items-center text-white rounded-md"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80')",
        }}
      >
        <Typography variant='h3'>Explore service and share your thought</Typography>
        <Typography variant='lead'>
          Help others to make the right choice
        </Typography>
      </div>
      <Typography variant='h3' className='text-center mt-12'>
        Explore Service
      </Typography>

      <div className='flex flex-col lg:flex-row gap-8 mt-8'>
        <Card className="flex-1 shadow-lg border border-gray-200 rounded-lg">
          <CardHeader floated={false} className="relative h-96">
            <img
              src={serviceImage}
              alt={serviceTitle}
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full">
              {category}
            </div>
          </CardHeader>
          <CardBody>
            <Typography variant="h5" className="font-bold text-gray-800 mb-2">
              {serviceTitle}
            </Typography>
            <Typography className="text-sm text-gray-600 mb-4">
              by <span className="font-medium text-gray-800">{companyName}</span>
            </Typography>
            <Typography className="text-gray-700 mb-4">
              {description}
            </Typography>
            <div className="flex items-center justify-between">
              <Typography className="text-blue-500 font-semibold text-xl">
                ${price}/month
              </Typography>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span>Added: {new Date(addedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Button
                size="sm"
                variant="filled"
                color="blue"
                onClick={() => window.open(website, "_blank")}
              >
                Visit Website
              </Button>
              <Typography variant='small' className="">
                Contact: <span className="font-medium text-gray-800">{user?.email}</span>
              </Typography>
            </div>
          </CardFooter>
        </Card>

        <div className='flex-1 '>
          <div className="flex border shadow-md p-6 rounded-lg justify-between items-center">
            <Typography variant="h4" className="font-bold">
              Reviews ({reviews.length})
            </Typography>
            <Button
              size='sm'
              variant="text"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <Typography variant='small' className='flex items-center gap-2'>
                  hide
                  <ChevronUpIcon className="h-4 w-4" strokeWidth={2} />
                </Typography>
              ) : (
                <Typography variant='small' className='flex items-center gap-2'>
                  see all
                  <ChevronDownIcon className="h-4 w-4" strokeWidth={2} />
                </Typography>
              )}
            </Button>
          </div>
          <Collapse open={open} className='max-h-[600px] overflow-y-scroll'>
            <List>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <ListItem key={review._id}>
                    <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
                      <CardHeader
                        color="transparent"
                        floated={false}
                        shadow={false}
                        className="mx-0 flex items-center gap-4 pt-0 pb-8"
                      >
                        <Avatar
                          size="lg"
                          variant="circular"
                          src={review?.userPhoto}
                          alt=""
                        />
                        <div className="flex w-full flex-col gap-0.5">
                          <div className="flex items-center justify-between">
                            <Typography variant="h5" color="blue-gray">
                              {review?.userName || 'hajja'}
                            </Typography>

                            <Rating style={{ maxWidth: 100 }}
                              value={review?.ratings}
                              readOnly
                            />
                          </div>
                          <Typography variant='small' color="blue-gray">
                            {new Date(review?.reviewDate).toLocaleDateString()}
                          </Typography>
                        </div>
                      </CardHeader>
                      <CardBody className="mb-6 p-0">
                        <Typography>
                          &quot;
                          {review?.reviewText}
                          &quot;
                        </Typography>
                      </CardBody>
                    </Card>
                  </ListItem>
                ))
              ) : (
                <Typography className="text-gray-500 text-center">
                  No reviews yet. Be the first to leave a review!
                </Typography>
              )}
            </List>
          </Collapse>
        </div>
      </div>
      <Card className='border shadow-md p-6 mt-8'>
        <Typography variant="h2" className="font-bold mb-4">
          Add a Review
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Textarea label="Review Here"
              {...register("reviewText", {
                required: "Review is required",
                minLength: {
                  value: 20,
                  message: "Review must be at least 20 characters",
                },
              })}
            />
            {errors.reviewText && <Typography
              variant="small"
              color="red"
              className="mt-1 flex items-center gap-1 font-normal"
            >
              <ExclamationCircleIcon className="w-5" />
              {errors.reviewText.message}
            </Typography>}
          </div>
          <div className="mb-4">
            <Typography variant='lead' className="block font-semibold mb-1">
              Rating:
            </Typography>
            <Controller
              name='ratings'
              control={control}
              rules={{ required: "Select a rating" }}
              render={({ field }) => (
                <Rating
                  transition='position'
                  style={{ maxWidth: 150 }}
                  value={field.value || 0}
                  onChange={field.onChange}
                />
              )}
            />
            {errors?.ratings && <Typography
              variant="small"
              color="red"
              className="mt-1 flex items-center gap-1 font-normal"
            >
              <ExclamationCircleIcon className="w-5" />
              {errors?.ratings?.message}
            </Typography>}
          </div>
          <Button
            type="submit"
          >
            Add review
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ServiceDetails;