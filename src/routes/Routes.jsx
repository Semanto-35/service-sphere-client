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

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <h3> 404 Not found</h3>,
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
        element: <ServiceDetails></ServiceDetails>
      },
      {
        path: '/add-service',
        element: <AddService></AddService>
      },
      {
        path: '/my-services',
        element: <MyServices></MyServices>
      },
      {
        path: '/my-reviews',
        element: <MyReviews></MyReviews>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
    ]
  }
]);

export default router;