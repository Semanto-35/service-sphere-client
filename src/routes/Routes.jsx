import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import AddService from "../pages/AddService/AddService";

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
    ]
  }
]);

export default router;