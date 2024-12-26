import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginLottie from '../../assets/lottie/login.json';

const Login = () => {
  const { loginWithGoogle, loginUser, } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await loginUser(email, password);
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      console.log(err)
    }
  };

  const googleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-10 max-w-7xl mx-auto bg-blue-100 py-12">
      <div className="flex justify-center">
        <Lottie animationData={loginLottie}></Lottie>
      </div>
      <Card className="shadow-md p-8 w-full max-w-md">
        <Typography variant="h2" className="font-bold text-green-500">
          Login Here
        </Typography>
        <Typography variant="small" color="gray" className="font-normal mb-6">
          Welcome back!!!
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              color="green"
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
          <div className="mb-1">
            <Input
              color="green"
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]*$/,
                  message: "Password must have at least one uppercase and one lowercase letter",
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
          <div className="mb-6">
            <a href="#" className="text-xs hover:underline">
              Forgot Password?
            </a>
          </div>
          <Button fullWidth type="submit" color="green">
            Login
          </Button>
        </form>
        <Typography variant="small" className="my-4 text-center">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-600 font-medium hover:underline">
            Register here
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

export default Login;
