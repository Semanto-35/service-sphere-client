import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Collapse, List, ListItem, Textarea, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const ServiceDetails = () => {
  const [service, setService] = useState({});
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const [serviceResponse, reviewsResponse] = await Promise.all([
          axios.get(`${apiUrl}/service/${id}`),
          axios.get(`${apiUrl}/reviews/${id}`)
        ]);
        
        setService(serviceResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
      const { data: newReview } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-review`, 
        reviewData
      );
      setReviews([...reviews, newReview]);
      toast.success("Review added successfully");
      reset();
    } catch (error) {
      toast.error("Failed to add review");
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className='w-full max-w-screen-2xl mx-auto mt-24 pb-16 lg:pb-24 px-4'>
      <HeroSection />
      
      <Typography variant='h3' className='text-center mt-16'>
        Explore Service
      </Typography>

      <div className='flex flex-col lg:flex-row gap-8 mt-12'>
        <ServiceCard 
          serviceImage={serviceImage} 
          category={category} 
          serviceTitle={serviceTitle || "Service Title"} 
          companyName={companyName || "Company Name"} 
          description={description || "No description available"} 
          price={price || 0} 
          addedDate={addedDate} 
          website={website}
          userEmail={user?.email}
        />

        <ReviewsSection 
          reviews={reviews}
          open={open}
          setOpen={setOpen}
        />
      </div>
      
      <ReviewForm 
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        control={control}
      />
    </div>
  );
};

const HeroSection = () => (
  <div 
    className="w-full h-[400px] bg-cover bg-center bg-opacity-50 flex flex-col justify-center items-center text-white rounded-lg"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80')",
    }}
  >
    <Typography variant='h3' className='text-center'>
      Explore service and share your thought
    </Typography>
    <Typography variant='lead'>
      Help others to make the right choice
    </Typography>
  </div>
);

const ServiceCard = ({ 
  serviceImage, 
  category, 
  serviceTitle, 
  companyName, 
  description, 
  price, 
  addedDate, 
  website,
  userEmail
}) => {
  return (
    <Card className="flex-1 shadow-lg border border-gray-200 bg-white dark:bg-[rgb(1,21,30)] rounded-lg">
      <CardHeader floated={false} className="relative h-72 md:h-96">
        {serviceImage ? (
          <img
            src={serviceImage}
            alt={serviceTitle}
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-t-lg">
            <Typography variant="h6" className="text-gray-500 dark:text-gray-400">
              No image available
            </Typography>
          </div>
        )}
        {category && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full">
            {category}
          </div>
        )}
      </CardHeader>
      <CardBody className='text-black dark:text-white'>
        <Typography variant="h5" className="mb-2">
          {serviceTitle}
        </Typography>
        <Typography className="text-sm mb-4">
          by <span className="font-medium">{companyName}</span>
        </Typography>
        <Typography className="mb-4">
          {description}
        </Typography>
        <div className="flex items-center justify-between">
          <Typography className="text-blue-500 font-semibold text-xl">
            ${price}/month
          </Typography>
          {addedDate && (
            <div className="flex items-center space-x-2 text-sm">
              <CalendarIcon className="h-5 w-5" />
              <span>Added: {new Date(addedDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="filled"
            color="blue"
            onClick={() => website && window.open(website, "_blank")}
          >
            Visit Website
          </Button>
          <Typography variant='small' className="text-black dark:text-white">
            Contact: {userEmail || "N/A"}
          </Typography>
        </div>
      </CardFooter>
    </Card>
  );
};

const ReviewsSection = ({ reviews, open, setOpen }) => (
  <div className='flex-1'>
    <div className="flex border shadow-md p-6 rounded-lg justify-between items-center">
      <Typography variant="h4" className="font-bold">
        Reviews ({reviews?.length || 0})
      </Typography>
      <Button
        className='text-black dark:text-white'
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
    <Collapse open={open} className='max-h-[400px] md:max-h-[600px] overflow-y-auto'>
      <List>
        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem key={review._id || Math.random().toString()} review={review} />
          ))
        ) : (
          <ListItem>
            <Typography className="dark:text-gray-50 text-center">
              No reviews yet. Be the first to leave a review!
            </Typography>
          </ListItem>
        )}
      </List>
    </Collapse>
  </div>
);

const ReviewItem = ({ review }) => (
  <ListItem className='p-0'>
    <Card shadow={false} className="w-full m-0">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="lg"
          variant="circular"
          src={review?.userPhoto || "https://via.placeholder.com/150"}
          alt={review?.userName || "User"}
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {review?.userName || 'Anonymous'}
            </Typography>

            <Rating 
              style={{ maxWidth: 100 }}
              value={review?.ratings || 0}
              readOnly
            />
          </div>
          <Typography variant='small' color="blue-gray">
            {review?.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : 'Unknown date'}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 py-0 items-center">
        <Typography>
          &quot;{review?.reviewText || 'No comment provided'}&quot;
        </Typography>
      </CardBody>
    </Card>
  </ListItem>
);

const ReviewForm = ({ handleSubmit, onSubmit, register, errors, control }) => (
  <Card className='border bg-white dark:bg-[rgb(1,21,30)] text-black dark:text-white shadow-md p-6 mt-8'>
    <Typography variant="h2" className="font-bold mb-4">
      Add a Review
    </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Textarea
          className='dark:text-white' 
          label="Review Here"
          {...register("reviewText", {
            required: "Review is required",
            minLength: {
              value: 20,
              message: "Review must be at least 20 characters",
            },
          })}
        />
        {errors.reviewText && (
          <Typography
            variant="small"
            color="red"
            className="mt-1 flex items-center gap-1 font-normal"
          >
            <ExclamationCircleIcon className="w-5" />
            {errors.reviewText.message}
          </Typography>
        )}
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
        {errors?.ratings && (
          <Typography
            variant="small"
            color="red"
            className="mt-1 flex items-center gap-1 font-normal"
          >
            <ExclamationCircleIcon className="w-5" />
            {errors?.ratings?.message}
          </Typography>
        )}
      </div>
      <Button
        color='blue'
        type="submit"
      >
        Add review
      </Button>
    </form>
  </Card>
);

export default ServiceDetails;