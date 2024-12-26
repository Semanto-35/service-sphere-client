import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { Button, Card, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react';
import { ExclamationCircleIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';


const MyServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [search, setSearch] = useState('');

  const { register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    fetchServices(search);
  }, [user, search]);

// search functionality
  const fetchServices = async (searchQuery = '') => {
    try {
      if (!user?.email) {
        return
      }

      // Include search query in the API call
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/services/${user.email}?search=${search}`
      );
      setServices(data);
    } catch (error) {
      console.log('Error fetching services:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
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
          const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/service/${id}`);

          Swal.fire({
            title: "Deleted!",
            text: "Your posted service has been deleted.",
            icon: "success"
          });
          fetchAllaServices();
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  // update functionality
  const handleOpen = (service) => {
    setSelectedService(service);
    reset(service);
    setOpen(!open);
  };
  const handleUpdateSubmit = async (formData) => {
    const { _id, ...updateData } = formData;
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/service/${selectedService._id}`, updateData);
      Swal.fire({
        title: 'Updated!',
        text: 'Your service has been updated successfully.',
        icon: 'success',
      });
      fetchAllaServices();
      console.log('done dona dan done');
      setOpen(false);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };



  return (
    <div className="border-2 max-w-7xl mx-auto my-12">
      <Card className="h-full w-full overflow-scroll">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none py-3 flex flex-col gap-3 md:flex-row items-center justify-between"
        >
          <Typography variant='h5'>My Posted Services ({services?.length})</Typography>
          <div className='md:w-96'>
            <Input
              value={search}
              onChange={handleSearchChange}
              label="Search Services"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </CardHeader>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700">
              <th className="p-2 border">Service Title</th>
              <th className="p-2 border">Company Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Added Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services?.length > 0 ? (services.map((service) => (
              <tr key={service._id}>
                <td className='border p-2'>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {service.serviceTitle}
                  </Typography>
                </td>
                <td className='border p-2'>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {service.companyName}
                  </Typography>
                </td>
                <td className='border p-2'>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {service.category}
                  </Typography>
                </td>
                <td className='border p-2'>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    $ {service.price}
                  </Typography>
                </td>
                <td className='border p-2'>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {service.addedDate}
                  </Typography>
                </td>
                <td className='border p-2'>
                  <div className="flex items-center gap-2">
                    <IconButton onClick={() => handleDelete(service._id)} variant="text" size="sm" color='red'>
                      <TrashIcon className="h-6 w-6" />
                    </IconButton>
                    <IconButton onClick={() => handleOpen(service)} color='blue' variant="text" size="sm">
                      <PencilSquareIcon
                        className="h-6 w-6"
                      />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))) : (<tr><td className='text-center py-2'>No Services found.</td></tr>)
            }
          </tbody>
        </table>
      </Card>

      <Dialog size="sm" open={open} handler={handleOpen}>
        <form onSubmit={handleSubmit(handleUpdateSubmit)}>
          <DialogHeader>
            <Typography variant="h4" color="blue-gray">
              Update Service
            </Typography>
          </DialogHeader>
          <DialogBody className="space-y-4 pb-6">
            <div className="">
              <Input
                defaultValue={selectedService?.serviceImage}
                color="blue"
                label="Service Image URL"
                type="url"
                {...register("serviceImage", {
                  required: "Service Image URL is required",
                  pattern: {
                    value: /^(https?:\/\/[^\s]+)$/,
                    message: "Invalid URL format"
                  }
                })}
              />
              {errors?.serviceImage && <Typography
                variant="small"
                color="red"
                className="mt-1 flex items-center gap-1 font-normal"
              >
                <ExclamationCircleIcon className="w-5" />
                {errors?.serviceImage?.message}
              </Typography>}
            </div>
            <div className="flex items-center justify-between gap-6">
              <div>
                <Input
                  defaultValue={selectedService?.serviceTitle}
                  color="blue"
                  label="Service Title"
                  type="text"
                  {...register("serviceTitle", {
                    required: "Service Title is required",
                    minLength: {
                      value: 6,
                      message: "Service Title must be at least 6 characters long"
                    }
                  })}
                />
                {errors?.serviceTitle && <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  <ExclamationCircleIcon className="w-5" />
                  {errors?.serviceTitle?.message}
                </Typography>}
              </div>
              <div>
                <Input
                  defaultValue={selectedService?.companyName}
                  color="blue"
                  label="Company Name"
                  type="text"
                  {...register("companyName", {
                    required: "Company Name is required",
                    minLength: {
                      value: 6,
                      message: "Company Name must be at least 6 characters long"
                    }
                  })}
                />
                {errors?.companyName && <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  <ExclamationCircleIcon className="w-5" />
                  {errors?.companyName?.message}
                </Typography>}
              </div>
            </div>

            <div>
              <Input
                defaultValue={selectedService?.website}
                color="blue"
                label="Website"
                type="url"
                {...register("website", {
                  required: "Website is required",
                  pattern: {
                    value: /^(https?:\/\/[^\s]+)$/,
                    message: "Invalid URL format"
                  }
                })}
              />
              {errors?.website && <Typography
                variant="small"
                color="red"
                className="mt-1 flex items-center gap-1 font-normal"
              >
                <ExclamationCircleIcon className="w-5" />
                {errors?.website?.message}
              </Typography>}
            </div>

            <div className="flex items-center justify-between gap-6">
              <div>
                <Controller
                  defaultValue={selectedService?.category}
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select color="blue" label="Select Category"
                      value={field.value || ''}
                      onChange={e => field.onChange(e)}
                    >
                      <Option value="Web Hosting">Web Hosting</Option>
                      <Option value="Digital Marketing">Digital Marketing</Option>
                      <Option value="Graphic Design">Graphic Design</Option>
                      <Option value="Software Development">Software Development</Option>
                      <Option value="Consulting">Consulting</Option>
                    </Select>
                  )}
                />
                {errors?.category && <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  <ExclamationCircleIcon className="w-5" />
                  {errors?.category?.message}
                </Typography>}
              </div>
              <div>
                <Input
                  defaultValue={selectedService?.price}
                  color="blue"
                  label="Price (in USD)"
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: {
                      value: 50,
                      message: "Price must be at least 50"
                    }
                  })}
                />
                {errors?.price && <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  <ExclamationCircleIcon className="w-5" />
                  {errors?.price?.message}
                </Typography>}
              </div>
            </div>

            <div className="">
              <Textarea
                defaultValue={selectedService?.description}
                color="blue"
                label="Description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 30,
                    message: "Description must be at least 30 characters long"
                  }
                })}
              />
              {errors?.description && <Typography
                variant="small"
                color="red"
                className="mt-1 flex items-center gap-1 font-normal"
              >
                <ExclamationCircleIcon className="w-5" />
                {errors?.description?.message}
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

export default MyServices;