import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import { Avatar, Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, Rating, Textarea, Typography } from '@material-tailwind/react';
import { PencilSquareIcon, TrashIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const fetchAllReviews = async () => {
    try {
      const { data } = await axiosSecure.get(`/all-review/${user?.email}`);
      setReviews(data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch your reviews',
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchAllReviews();
    }
  }, [user?.email, axiosSecure]);

  // Delete review functionality
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/review/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your posted review has been deleted.",
            icon: "success"
          });
          fetchAllReviews();
        } catch (err) {
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete the review',
            icon: 'error',
          });
        }
      }
    });
  };

  // Update functionality
  const handleOpen = (review) => {
    setSelectedReviews(review);
    reset({
      reviewText: review.reviewText,
      ratings: review.ratings
    });
    setOpen(!open);
  };

  const handleUpdateSubmit = async (formData) => {
    try {
      await axiosSecure.put(`/review/${selectedReviews._id}`, {
        reviewText: formData.reviewText,
        ratings: formData.ratings
      });
      
      Swal.fire({
        title: 'Updated!',
        text: 'Your review has been updated successfully.',
        icon: 'success',
      });
      fetchAllReviews();
      setOpen(false);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to update the review',
        icon: 'error',
      });
    }
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto mt-[76px] py-16 px-4">
      <Typography variant="h4" className="mb-8 text-center md:text-left">
        My Reviews ({reviews?.length})
      </Typography>
      
      {reviews.length === 0 ? (
        <Typography variant="h6" className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
          You haven't posted any reviews yet.
        </Typography>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {reviews.map((review) => (
            <Card key={review._id} color="transparent" shadow={false} className="w-full border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="flex items-center gap-4 pt-4 pb-6 text-black dark:text-white px-6"
              >
                <Avatar
                  size="lg"
                  variant="circular"
                  src={review?.userPhoto}
                  alt={review?.userName || 'User'}
                  className="border border-gray-200"
                />
                <div className="flex w-full flex-col gap-1">
                  <Typography variant='h5' className="font-medium">
                    {review?.serviceTitle}
                  </Typography>
                  <div className="flex items-center justify-between">
                    <Typography variant="h6" className="">
                      {review?.userName || 'Name'}
                    </Typography>

                    <Rating 
                      style={{ maxWidth: 100 }}
                      value={review?.ratings}
                      readOnly
                    />
                  </div>
                  <Typography variant='small' className="text-gray-500">
                    {new Date(review?.reviewDate).toLocaleDateString()}
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="mb-4 py-0 text-black dark:text-white px-6">
                <Typography className="italic">
                  &quot;{review?.reviewText}&quot;
                </Typography>
              </CardBody>
              <div className="flex justify-end gap-4 px-6 pb-4">
                <Button 
                  onClick={() => handleDelete(review._id)} 
                  size='sm' 
                  color='red'
                  className="flex items-center gap-2"
                >
                  <TrashIcon className="w-4 h-4" /> Delete
                </Button>
                <Button 
                  onClick={() => handleOpen(review)} 
                  size='sm'
                  className="flex items-center gap-2"
                >
                  <PencilSquareIcon className="w-4 h-4" /> Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Review Dialog */}
      <Dialog size="sm" open={open} handler={() => setOpen(!open)}>
        <form onSubmit={handleSubmit(handleUpdateSubmit)}>
          <DialogHeader>
            <Typography variant="h4" color="blue-gray">
              Update Review
            </Typography>
          </DialogHeader>
          <DialogBody className="space-y-4 pb-6">
            <div className="mb-4">
              <Textarea
                label="Review Text"
                className="min-h-[120px]"
                {...register("reviewText", {
                  required: "Review text is required",
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
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {errors.reviewText.message}
                </Typography>
              )}
            </div>
            <div className="mb-4">
              <Typography variant='lead' className="block font-semibold mb-2">
                Rating:
              </Typography>
              <Controller
                name='ratings'
                control={control}
                rules={{ required: "Rating is required" }}
                render={({ field }) => (
                  <Rating
                    transition='position'
                    style={{ maxWidth: 150 }}
                    value={field.value}
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
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {errors?.ratings?.message}
                </Typography>
              )}
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" color="red" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Update Review
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default MyReviews;