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
    <footer className="relative w-full bg-blue-gray-900 text-blue-gray-200">
      <div className="mx-auto w-full max-w-7xl px-8 py-12">
        <div className="grid grid-cols-1 justify-between gap-8 md:grid-cols-2">
          <div>
            <Link to={'/'}>
              <Typography
                variant="h4"
                className="mr-4 flex gap-2 items-center py-1.5 mb-2"
              >
                <img className='w-12' src={logo} alt="" />
                ServiceSphere
              </Typography>
            </Link>
            <Typography variant="small" className="text-gray-400">
              ServiceSphere is a platform that connects users to a variety of services, offering reviews and recommendations.
            </Typography>
          </div>
          <div className="grid grid-cols-3 justify-between gap-4">
            <ul>
              <Typography
                variant="small"
                color="blue"
                className="mb-3 font-medium"
              >
                Product
              </Typography>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  Overview
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  Features
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  Solutions
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  Tutorials
                </Typography>
              </li>
            </ul>
            <ul>
              <Typography
                variant="small"
                color="blue"
                className="mb-3 font-medium"
              >
                Company
              </Typography>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  Home
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  Services
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  Reviews
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  About us
                </Typography>
              </li>
            </ul>
            <ul>
              <Typography
                variant="small"
                color="blue"
                className="mb-3 font-medium"
              >
                Resource
              </Typography>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  Blog
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  Newslatter
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  Events
                </Typography>
              </li>
              <li>
                <Typography
                  as="a"
                  href="#"
                  className="py-1.5 font-normal transition-colors hover:text-blue-500"
                >
                  Help center
                </Typography>
              </li>
            </ul>
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
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <img className="w-5 h-5" src={facebook} alt="" />
            </Typography>
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <img className="w-5 h-5" src={instagram} alt="" />
            </Typography>
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <img className="w-5 h-5" src={twitter} alt="" />
            </Typography>
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <img className="w-5 h-5" src={linkedin} alt="" />
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;