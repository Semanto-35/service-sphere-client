import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import AddService from "../pages/AddService/AddService";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import MyServices from "../pages/MyServices/MyServices";
import MyReviews from "../pages/MyReviews/MyReviews";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../components/ErrorPage";
import About from "../pages/About/About";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/services',
        element: <Services></Services>
      },
      {
        path: '/service/:id',
        element: <PrivateRoutes><ServiceDetails></ServiceDetails></PrivateRoutes>
      },
      {
        path: '/add-service',
        element: <PrivateRoutes><AddService></AddService></PrivateRoutes>
      },
      {
        path: '/my-services',
        element: <PrivateRoutes><MyServices></MyServices></PrivateRoutes>
      },
      {
        path: '/my-reviews',
        element: <PrivateRoutes><MyReviews></MyReviews></PrivateRoutes>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/about',
        element: <About />
      },
    ]
  }
]);

export default router;