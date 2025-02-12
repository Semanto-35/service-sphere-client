import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { Card, Typography, Input, Textarea, Button, Select, Option } from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import registerLottie from '../../assets/lottie/register.json';
import Lottie from "lottie-react";

const AddService = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    const serviceData = {
      ...data,
      addedDate: new Date().toISOString(),
      userEmail: user?.email,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/add-service`, serviceData);
      toast.success('Service added successfully')
      navigate('/services')
      reset();
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-10 max-w-screen-2xl mx-auto mt-[76px] py-16">
      <div className="flex justify-center mb-10">
      <Lottie className='md:w-96' animationData={registerLottie}></Lottie>
      </div>
      <Card className="shadow-md p-8">
        <Typography variant="h2" className="font-bold text-blue-600 mb-6 text-center">
          Add a New Service
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="">
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

          <div className="">
            <Button type="submit" color="blue">
              Add Service
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddService;
