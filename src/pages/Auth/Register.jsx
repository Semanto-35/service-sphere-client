import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Lottie from 'lottie-react';
import registerLottie from '../../assets/lottie/register.json';
import { toast } from 'react-toastify';
import axios from 'axios';


const Register = () => {
  const { setUser, createNewUser, loginWithGoogle, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    const { email, password, name, photoURL } = data;
    const userData = { email, password, name, photoURL, createdAt: new Date() }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData);
      const result = await createNewUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      setUser({ ...result.user, photoURL, displayName: name })
      toast.success('Signup Successful')
      navigate("/");
    } catch (err) {
      toast.error(err?.message)
    }
  };

  const googleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Signin Successful')
      navigate("/");
    } catch (err) {
      toast.error(err?.message)
    }
  };


  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-10 max-w-screen-2xl mx-auto py-12 mt-20 px-4">
      <div className="flex justify-center">
        <Lottie className='w-96' animationData={registerLottie}></Lottie>
      </div>
      <Card className="shadow-md p-8 w-full max-w-md">
        <Typography variant="h2" className="font-bold text-blue-600">
          Register Now
        </Typography>
        <Typography variant="small" color="gray" className="font-normal mb-6">
          Nice to meet you! Enter your details to register.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              color="blue"
              label="Name"
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 6,
                  message: "Name must be at least 6 characters",
                },
              })}
            />
            {errors?.name && <Typography
              variant="small"
              color="red"
              className="mt-1 flex items-center gap-1 font-normal"
            >
              <ExclamationCircleIcon className="w-5" />
              {errors?.name?.message}
            </Typography>}
          </div>
          <div className="mb-4">
            <Input
              color="blue"
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors?.email && <Typography
              variant="small"
              color="red"
              className="mt-1 flex items-center gap-1 font-normal"
            >
              <ExclamationCircleIcon className="w-5" />
              {errors?.email?.message}
            </Typography>}
          </div>
          <div className="mb-4">
            <Input
              color="blue"
              label="PhotoURL"
              type="url"
              {...register("photoURL", {
                required: "PhotoURL is required",
                pattern: {
                  value: /^(https?:\/\/[^\s]+)$/,
                  message: "Invalid URL format"
                }
              })}
            />
            {errors?.photoURL && <Typography
              variant="small"
              color="red"
              className="mt-1 flex items-center gap-1 font-normal"
            >
              <ExclamationCircleIcon className="w-5" />
              {errors?.photoURL?.message}
            </Typography>}
          </div>
          <div className="mb-6">
            <Input
              color="blue"
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message: "Password must have at least one uppercase, one lowercase letter, one number and one special characters",
                },
              })}

            />
            {errors?.password && <Typography
              variant="small"
              color="red"
              className="mt-1 flex items-center gap-1 font-normal"
            >
              <ExclamationCircleIcon className="w-5" />
              {errors?.password?.message}
            </Typography>}
          </div>
          <Button fullWidth type="submit" color="blue">
            Register
          </Button>
        </form>
        <Typography variant="small" className="my-4 text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 font-medium hover:underline">
            Login now
          </Link>
        </Typography>
        <Button onClick={googleLogin}
          variant="outlined"
          color="blue-gray"
          className="flex items-center justify-center gap-3"
        >
          <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
          Continue with Google
        </Button>
      </Card>
    </div>
  );
};

export default Register;