import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar, Typography, List, IconButton, Collapse } from "@material-tailwind/react";
import { HomeIcon, IdentificationIcon, MapIcon, PencilSquareIcon, PowerIcon, } from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/icons/logo-icon.png';
import useAuth from "../hooks/useAuth";
import ToggleTheme from "./ToggleTheme";


const NavbarComponent = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false),
    );
  }, []);

  const links = <>
    <NavLink to="/">
      {({ isActive }) => (
        <Typography
          as="li"
          variant="small"
          className={`flex items-center gap-1 py-2 pr-4 transition-all ${isActive && 'text-light-blue-700 underline font-medium'} hover:text-light-blue-700 hover:underline hover:font-medium`}
        >
          <HomeIcon className="w-5 h-5" />
          Home
        </Typography>
      )}
    </NavLink>
    <NavLink to="/services">
      {({ isActive }) => (
        <Typography
          as="li"
          variant="small"
          className={`flex items-center gap-1 py-2 pr-4 transition-all ${isActive && 'text-light-blue-700 underline font-medium'}  hover:text-light-blue-700 hover:underline hover:font-medium`}
        >
          <HomeIcon className="w-5 h-5" />
          Services
        </Typography>
      )}
    </NavLink>
    {user && (<>
      <NavLink to="/add-service">
        {({ isActive }) => (
          <Typography
            as="li"
            variant="small"
            className={`flex items-center gap-1 py-2 pr-4 transition-all ${isActive && 'text-light-blue-700 underline font-medium'}  hover:text-light-blue-700 hover:underline hover:font-medium`}
          >
            <PencilSquareIcon className="w-5 h-5" />
            Add Service
          </Typography>
        )}
      </NavLink>
      <NavLink to="/my-reviews">
        {({ isActive }) => (
          <Typography
            as="li"
            variant="small"
            className={`flex items-center gap-1 py-2 pr-4 transition-all ${isActive && 'text-light-blue-700 underline font-medium'}  hover:text-light-blue-700 hover:underline hover:font-medium`}
          >
            <MapIcon className="w-5 h-5" />
            My Reviews
          </Typography>
        )}
      </NavLink>
      <NavLink to="/my-services">
        {({ isActive }) => (
          <Typography
            as="li"
            variant="small"
            className={`flex items-center gap-1 py-2 pr-4 transition-all ${isActive && 'text-light-blue-700 underline font-medium'}  hover:text-light-blue-700 hover:underline hover:font-medium`}
          >
            <IdentificationIcon className="w-5 h-5" />
            My Services
          </Typography>
        )}
      </NavLink>
    </>)}
  </>

  return (
    <Navbar fullWidth className={`fixed top-0 left-0 z-50 p-0 bg-gray-50 dark:bg-gray-800 border-none shadow-none`}>
      <div className={`flex items-center justify-between max-w-screen-2xl mx-auto py-2 text-gray-800 dark:text-gray-50 px-4 ${open && 'border-b'}`}>
        {/* Logo */}
        <Link to={'/'}>
          <Typography
            variant="h4"
            className="flex items-center gap-2 py-1.5"
          >
            <img className='w-12' src={logo} alt="" />
            ServiceSphere
          </Typography>
        </Link>

        {/* navlist */}
        <div className="hidden lg:block">
          <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 text-gray-800 dark:text-gray-50">
            {links}
          </List>
        </div>

        <div className="flex items-center gap-3">
          <ToggleTheme />

          {/* user/auth buttons */}
          {user ?
            (<div className='hidden lg:block'>
              <Menu placement="bottom-end">
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    size="md"
                    alt=""
                    withBorder={true}
                    color="blue-gray"
                    className="p-0.5"
                    src={user?.photoURL}
                  />
                </MenuHandler>
                <MenuList className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-50">
                  <div className="px-4 py-2">
                    <Typography variant="h6">
                      {user?.displayName}
                    </Typography>
                    <Typography variant="small">
                      {user?.email}
                    </Typography>
                  </div>
                  <hr />
                  {/* menu items */}
                  <div className="flex flex-col gap-1 p-2">
                    {links}
                  </div>

                  {/* Log Out */}
                  <MenuItem onClick={logOut} className="flex items-center gap-2 text-red-500">
                    <PowerIcon className="w-4 h-4" />
                    <Typography variant="small" className="font-medium">
                      Log Out
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
            ) : (<div className="hidden gap-3 lg:flex">
              <Link to={'/login'}>
                <Button color="light-blue" variant="outlined" size="sm">
                  LogIn
                </Button>
              </Link>
              <Link to={'/register'}>
                <Button color="light-blue" size="sm">
                  Register
                </Button>
              </Link>
            </div>)
          }

          {/* Mobile Menu Button */}
          <IconButton
            variant="text"
            className="lg:hidden text-gray-800 dark:text-gray-50"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <Collapse className='lg:hidden px-4' open={open}
      >
        <List className="my-4 p-0 lg:my-0 lg:p-1 text-gray-800 dark:text-gray-50">
          {
            user && <div>
              <div className="flex items-center gap-4">
                <Avatar src={user?.photoURL} alt="avatar" />
                <div>
                  <Typography variant="h6">
                    {user?.displayName}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    {user?.email}
                  </Typography>
                </div>
              </div>
              <hr className='mt-3' />
            </div>
          }
          {links}
        </List>
        {user ? (
          <div className="w-full pb-4">
            <Button onClick={logOut} className='flex items-center gap-2' variant="text" size="md" color="red">
              <PowerIcon className='w-4 h-4' />
              Log Out
            </Button>
          </div>)
          : (<div className="flex w-full flex-nowrap items-center gap-2 lg:hidden pb-4">
            <Link className='w-1/2' to={'/login'}>
              <Button color="light-blue" variant="outlined" size="sm" fullWidth>
                LogIn
              </Button>
            </Link>
            <Link className='w-1/2' to={'/register'}>
              <Button color="light-blue" size="sm" fullWidth>
                Register
              </Button>
            </Link>
          </div>)}
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
