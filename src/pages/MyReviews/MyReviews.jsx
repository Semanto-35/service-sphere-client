import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { Avatar, Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, Rating, Textarea, Typography } from '@material-tailwind/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyReviews = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState(null);

  const { register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchAllReviews();
  }, [user]);

  const fetchAllReviews = async () => {
    try {
      const { data } = await axiosSecure.get(`/all-review/${user?.email}`);
      setReviews(data);
    } catch (error) {
      console.log('Error fetching services:', error);
    }
  };

  // delete functionality
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
          const { data } = await axiosSecure.delete(`/review/${id}`);

          Swal.fire({
            title: "Deleted!",
            text: "Your posted review has been deleted.",
            icon: "success"
          });
          fetchAllReviews();
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  // update functionality
  const handleOpen = (review) => {
    setSelectedReviews(review);
    reset(review);
    setOpen(!open);
  };
  const handleUpdateSubmit = async (formData) => {
    const { _id, serviceTitle, ...updateData } = formData;
    try {
      const { data } = await axiosSecure.put(`/review/${selectedReviews._id}`, updateData);
      Swal.fire({
        title: 'Updated!',
        text: 'Your review has been updated successfully.',
        icon: 'success',
      });
      fetchAllReviews();
      setOpen(false);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-12">
      <Typography variant="h4" className="mb-4 mx-4">
        My Reviews ({reviews?.length})
      </Typography>
      <div className="grid grid-cols-1 gap-4 mx-4">
        {reviews.map((review) => (
          <Card key={review._id} color="transparent" shadow={false} className="w-full border shadow-md px-4">
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
                <Typography variant='h5'>
                  {review?.serviceTitle}
                </Typography>
                <div className="flex items-center justify-between">
                  <Typography variant="h6" color="blue-gray">
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
                <div className='flex justify-end gap-4'>
                  <Button onClick={()=> handleDelete(review._id)} size='sm' color='red'>
                    <TrashIcon className='w-6 h-6' />
                  </Button>
                  <Button onClick={()=>handleOpen(review)} size='sm'>
                    <PencilSquareIcon className='w-6 h-6' />
                  </Button>

                </div>
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
        ))}
      </div>

      <Dialog size="sm" open={open} handler={handleOpen}>
        <form onSubmit={handleSubmit(handleUpdateSubmit)}>
          <DialogHeader>
            <Typography variant="h4" color="blue-gray">
              Update Review
            </Typography>
          </DialogHeader>
          <DialogBody className="space-y-4 pb-6">
            <div className="mb-4">
              <Textarea
              defaultValue={selectedReviews?.reviewText} label="Review Here"
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
              defaultValue={selectedReviews?.ratings}
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
          </DialogBody>
          <DialogFooter>
            <Button type="submit">Update</Button>
            <Button variant="text" color="red" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default MyReviews;