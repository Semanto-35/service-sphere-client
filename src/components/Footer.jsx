import { Link } from "react-router-dom";
import { Typography } from '@material-tailwind/react';
import facebook from '../assets/icons/facebook_2.png';
import instagram from '../assets/icons/instagram.png';
import linkedin from '../assets/icons/linkedin.png';
import twitter from '../assets/icons/twitter.png';
import logo from '../assets/icons/logo-icon.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-gray-900 text-gray-400">
      <div className="mx-auto w-full max-w-screen-2xl px-8 md:px-4 py-12">
        <div className="grid grid-cols-1 justify-between gap-8 md:grid-cols-7">
          <div className="md:col-span-3">
            <Link to={'/'}>
              <Typography
                variant="h4"
                color="light-blue"
                className="mr-4 flex gap-2 items-center py-1.5 mb-2"
              >
                <img className='w-12' src={logo} alt="" />
                ServiceSphere
              </Typography>
            </Link>
            <Typography variant="small" className="text-gray-500">
              ServiceSphere is a platform that connects users to a variety of services, offering reviews and recommendations.
            </Typography>
          </div>

          <div className="md:col-span-2">
            <Typography variant="h6" color="light-blue" className="mb-4">
              Quick Links
            </Typography>
            <ul className="space-y-2">
              <Typography as="li" variant="small" >
                <Link to="/" className="hover:text-light-blue-500 transition-colors">
                  Home
                </Link>
              </Typography>
              <Typography as="li" variant="small" >
                <Link to="/services" className="hover:text-light-blue-500 transition-colors">
                  Services
                </Link>
              </Typography>
              <Typography as="li" variant="small" >
                <Link to="/add-service" className="hover:text-light-blue-500 transition-colors">
                  Add Service
                </Link>
              </Typography>
              <Typography as="li" variant="small" >
                <Link to="/my-services" className="hover:text-light-blue-500 transition-colors">
                  My Services
                </Link>
              </Typography>
              <Typography as="li" variant="small" >
                <Link to="/my-reviews" className="hover:text-light-blue-500 transition-colors">
                  My Reviews
                </Link>
              </Typography>
            </ul>
          </div>

          <div className="md:col-span-2">
            <Typography variant="h6" color="light-blue" className="mb-4">
              Contact Us
            </Typography>
            <address className="not-italic space-y-1">
              <Typography variant="small" >
                123 Service Street
              </Typography>
              <Typography variant="small" >
                Dhaka, Bangladesh
              </Typography>
              <Typography variant="small" >
                Email: servicesphere@gmail.com
              </Typography>
              <Typography variant="small" >
                Phone: (123) 456-7890
              </Typography>
            </address>
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal md:mb-0"
          >
            &copy; {currentYear} <a href="/">ServiceSphere System</a>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-4 sm:justify-center">
            <Typography as="a" href="https://www.facebook.com/semanto3521" className="opacity-80 transition-opacity hover:opacity-100">
              <img className="w-5 h-5" src={facebook} alt="" />
            </Typography>
            <Typography as="a" href="https://www.facebook.com/semanto3521" className="opacity-80 transition-opacity hover:opacity-100">
              <img className="w-5 h-5" src={instagram} alt="" />
            </Typography>
            <Typography as="a" href="https://x.com/Semanto_35" className="opacity-80 transition-opacity hover:opacity-100">
              <img className="w-5 h-5" src={twitter} alt="" />
            </Typography>
            <Typography as="a" href="https://www.linkedin.com/in/sabbir-hossain-semanto/" className="opacity-80 transition-opacity hover:opacity-100">
              <img className="w-5 h-5" src={linkedin} alt="" />
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;