import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Button, Card, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react';
import { ExclamationCircleIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyServices = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch services on component mount or when search changes
  useEffect(() => {
    if (user?.email) {
      fetchServices();
    }
  }, [user?.email, search]);

  // Search functionality
  const fetchServices = async () => {
    setIsLoading(true);
    try {
      if (!user?.email) return;

      const { data } = await axiosSecure.get(`/services/${user.email}?search=${search}`);
      setServices(data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch services',
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Delete functionality
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
          await axiosSecure.delete(`/service/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your posted service has been deleted.",
            icon: "success"
          });
          fetchServices();
        } catch (err) {
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete the service',
            icon: 'error',
          });
        }
      }
    });
  };

  // Update functionality
  const handleOpen = (service) => {
    setSelectedService(service);
    reset(service);
    setOpen(!open);
  };

  const handleUpdateSubmit = async (formData) => {
    try {
      const { _id, ...updateData } = formData;
      await axiosSecure.put(`/service/${selectedService._id}`, updateData);
      
      Swal.fire({
        title: 'Updated!',
        text: 'Your service has been updated successfully.',
        icon: 'success',
      });
      
      fetchServices();
      setOpen(false);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to update the service',
        icon: 'error',
      });
    }
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto mt-[76px] py-16 px-4">
      <Card className="h-full w-full overflow-hidden shadow-lg border-0">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none py-4 px-4 m-0 flex flex-col gap-4 md:flex-row items-center justify-between bg-gray-50 dark:bg-blue-gray-800 text-gray-800 dark:text-gray-50"
        >
          <Typography variant="h5" className="font-medium">
            My Posted Services ({services?.length})
          </Typography>
          <div className="w-full md:w-72">
            <Input
              className="border-gray-300 dark:text-white"
              value={search}
              onChange={handleSearchChange}
              label="Search Services"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left bg-white dark:bg-[rgb(1,21,30)] text-black dark:text-white">
            <thead>
              <tr className="bg-blue-gray-50 dark:bg-blue-gray-800">
                <th className="p-4 border-b border-gray-200 dark:border-gray-700">Service Title</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-700">Company Name</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-700">Category</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-700">Price</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-700">Added Date</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">Loading services...</td>
                </tr>
              ) : services?.length > 0 ? (
                services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50 dark:hover:bg-blue-gray-900/20 transition-colors">
                    <td className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <Typography variant="small" className="font-medium">
                        {service.serviceTitle}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <Typography variant="small" className="font-normal">
                        {service.companyName}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <Typography variant="small" className="font-normal">
                        {service.category}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <Typography variant="small" className="font-normal">
                        ${service.price}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <Typography variant="small" className="font-normal">
                        {service.addedDate}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <IconButton 
                          onClick={() => handleDelete(service._id)} 
                          variant="text" 
                          size="sm" 
                          color="red"
                          className="rounded-full"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleOpen(service)} 
                          color="blue" 
                          variant="text" 
                          size="sm"
                          className="rounded-full"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8">No services found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Service Dialog */}
      <Dialog size="md" open={open} handler={() => setOpen(!open)}>
        <form onSubmit={handleSubmit(handleUpdateSubmit)}>
          <DialogHeader className="bg-gray-50 dark:bg-blue-gray-800 text-black dark:text-white">
            <Typography variant="h4">
              Update Service
            </Typography>
          </DialogHeader>
          
          <DialogBody className="grid grid-cols-1 gap-4 pt-4">
            <div>
              <Input
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
              {errors?.serviceImage && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {errors?.serviceImage?.message}
                </Typography>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  color="blue"
                  label="Service Title"
                  type="text"
                  {...register("serviceTitle", {
                    required: "Service Title is required",
                    minLength: {
                      value: 6,
                      message: "Service Title must be at least 6 characters"
                    }
                  })}
                />
                {errors?.serviceTitle && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-1 flex items-center gap-1 font-normal"
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors?.serviceTitle?.message}
                  </Typography>
                )}
              </div>
              
              <div>
                <Input
                  color="blue"
                  label="Company Name"
                  type="text"
                  {...register("companyName", {
                    required: "Company Name is required",
                    minLength: {
                      value: 6,
                      message: "Company Name must be at least 6 characters"
                    }
                  })}
                />
                {errors?.companyName && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-1 flex items-center gap-1 font-normal"
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors?.companyName?.message}
                  </Typography>
                )}
              </div>
            </div>

            <div>
              <Input
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
              {errors?.website && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {errors?.website?.message}
                </Typography>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select 
                      color="blue" 
                      label="Select Category"
                      value={field.value || ''}
                      onChange={field.onChange}
                    >
                      <Option value="Web Hosting">Web Hosting</Option>
                      <Option value="Digital Marketing">Digital Marketing</Option>
                      <Option value="Graphic Design">Graphic Design</Option>
                      <Option value="Software Development">Software Development</Option>
                      <Option value="Consulting">Consulting</Option>
                    </Select>
                  )}
                />
                {errors?.category && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-1 flex items-center gap-1 font-normal"
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors?.category?.message}
                  </Typography>
                )}
              </div>
              
              <div>
                <Input
                  color="blue"
                  label="Price (in USD)"
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: {
                      value: 50,
                      message: "Price must be at least $50"
                    }
                  })}
                />
                {errors?.price && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-1 flex items-center gap-1 font-normal"
                  >
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors?.price?.message}
                  </Typography>
                )}
              </div>
            </div>

            <div>
              <Textarea
                color="blue"
                label="Description"
                className="min-h-36"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 30,
                    message: "Description must be at least 30 characters"
                  }
                })}
              />
              {errors?.description && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-1 flex items-center gap-1 font-normal"
                >
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {errors?.description?.message}
                </Typography>
              )}
            </div>
          </DialogBody>
          
          <DialogFooter className="space-x-2 bg-gray-50 dark:bg-blue-gray-800">
            <Button variant="text" color="red" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Update Service
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default MyServices;