import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar, ListItem, Typography, List, IconButton, Collapse } from "@material-tailwind/react";
import { HomeIcon, IdentificationIcon, MapIcon, NewspaperIcon, PencilSquareIcon, PowerIcon, } from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/icons/logo-icon.png';


const NavbarComponent = () => {
  const [open, setOpen] = useState(false);
  const user = 'dd'
  const links = <>
    <NavLink
      to="/"
      className={({ isActive }) => `font-medium ${isActive ? 'text-blue-500 underline' : 'text-blue-gray'}`}
    >
      <ListItem className="flex items-center gap-1 py-2 pr-4">
        <HomeIcon className='w-5 h-5' />
        <Typography variant="small" className="font-medium">
          Home
        </Typography>
      </ListItem>
    </NavLink>
    <NavLink
      to="/services"
      className={({ isActive }) => `font-medium ${isActive ? 'text-blue-500 underline' : 'text-blue-gray'}`}
    >
      <ListItem className="flex items-center gap-1 py-2 pr-4">
        <NewspaperIcon className='w-5 h-5' />
        <Typography variant="small" className="font-medium">
          Services
        </Typography>
      </ListItem>
    </NavLink>
    {user && (<>
      <NavLink
        to="/add-service"
        className={({ isActive }) => `font-medium ${isActive ? 'text-blue-500 underline' : 'text-blue-gray'}`}
      >
        <ListItem className="flex items-center gap-1 py-2 pr-4">
          <PencilSquareIcon className='w-5 h-5' />
          <Typography variant="small" className="font-medium">
            Add Service
          </Typography>
        </ListItem>
      </NavLink>
      <NavLink
        to="/my-reviews"
        className={({ isActive }) => `font-medium ${isActive ? 'text-blue-500 underline' : 'text-blue-gray'}`}
      >
        <ListItem className="flex items-center gap-1 py-2 pr-4">
          <MapIcon className='w-5 h-5' />
          <Typography variant="small" className="font-medium">
            My Reviews
          </Typography>
        </ListItem>
      </NavLink>
      <NavLink
        to="/my-services"
        className={({ isActive }) => `font-medium ${isActive ? 'text-blue-500 underline' : 'text-blue-gray'}`}
      >
        <ListItem className="flex items-center gap-1 py-2 pr-4">
          <IdentificationIcon className='w-5 h-5' />
          <Typography variant="small" className="font-medium">
            My Services
          </Typography>
        </ListItem>
      </NavLink>
    </>)}
  </>

  return (
    <Navbar fullWidth className="mx-auto max-w-7xl px-4 py-2 shadow-md">
      <div className="flex items-center justify-between text-blue-gray-900">
        {/* Logo */}
        <Link to={'/'}>
          <Typography
            variant="h4"
            className="mr-4 flex items-center gap-2 py-1.5"
          >
            <img className='w-12' src={logo} alt="" />
            ServiceSphere
          </Typography>
        </Link>

        <div className="flex items-center gap-6">
          {/* navlist */}
          <div className="hidden lg:block">
            <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
              {links}
            </List>
          </div>

          {/* user/auth buttons */}
          {user ?
            (<div className='hidden lg:block'>
              <Menu allowHover placement="bottom-end">
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    size="md"
                    alt={user}
                    withBorder={true}
                    color="blue-gray"
                    className="p-0.5"
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                  />
                </MenuHandler>
                <MenuList className="p-1">
                  <div className="px-4 py-2">
                    <Typography variant="h6" color="blue-gray">
                      Name
                    </Typography>
                    <Typography variant="small" color="gray">
                      sabbir@gmail.com
                    </Typography>
                  </div>
                  <hr className="my-1" />
                  {/* Home Link */}
                  <MenuItem className="flex items-center gap-2">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `w-full ${isActive ? "text-blue-500 font-semibold" : "text-blue-gray"}`
                      }
                    >
                      <Typography variant="small" className="flex items-center gap-1 font-medium">
                        <HomeIcon className='w-5 h-5' />
                        Home
                      </Typography>
                    </NavLink>
                  </MenuItem>

                  {/* Services Link */}
                  <MenuItem className="flex items-center gap-2">
                    <NavLink
                      to="/services"
                      className={({ isActive }) =>
                        `w-full ${isActive ? "text-blue-500 font-semibold" : "text-blue-gray"}`
                      }
                    >
                      <Typography variant="small" className="flex items-center gap-1 font-medium">
                        <NewspaperIcon className='w-5 h-5' />
                        Services
                      </Typography>
                    </NavLink>
                  </MenuItem>

                  {/* Add Service Link */}
                  <MenuItem className="flex items-center gap-2">
                    <NavLink
                      to="/add-service"
                      className={({ isActive }) =>
                        `w-full ${isActive ? "text-blue-500 font-semibold" : "text-blue-gray"}`
                      }
                    >
                      <Typography variant="small" className="flex items-center gap-1 font-medium">
                        <PencilSquareIcon className='w-5 h-5' />
                        Add Service
                      </Typography>
                    </NavLink>
                  </MenuItem>

                  {/* My Reviews Link */}
                  <MenuItem className="flex items-center gap-2">
                    <NavLink
                      to="/my-reviews"
                      className={({ isActive }) =>
                        `w-full ${isActive ? "text-blue-500 font-semibold" : "text-blue-gray"}`
                      }
                    >
                      <Typography variant="small" className="flex items-center gap-1 font-medium">
                        <MapIcon className='w-5 h-5' />
                        My Reviews
                      </Typography>
                    </NavLink>
                  </MenuItem>

                  {/* My Services Link */}
                  <MenuItem className="flex items-center gap-2">
                    <NavLink
                      to="/my-services"
                      className={({ isActive }) =>
                        `w-full ${isActive ? "text-blue-500 font-semibold" : "text-blue-gray"}`
                      }
                    >
                      <Typography variant="small" className="flex items-center gap-1 font-medium">
                        <IdentificationIcon className='w-5 h-5' />
                        My Services
                      </Typography>
                    </NavLink>
                  </MenuItem>

                  {/* Log Out */}
                  <MenuItem className="flex items-center gap-2 text-red-500">
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
                <Button variant="text" size="sm" color="blue">
                  LogIn
                </Button>
              </Link>
              <Link to={'/register'}>
                <Button variant="gradient" size="sm">
                  Register
                </Button>
              </Link>
            </div>)
          }
        </div>

        {/* Mobile Menu Button */}
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      {/* Mobile Navigation Links */}
      <Collapse className='lg:hidden' open={open}
      >
        <List className="my-4 p-0 lg:my-0 lg:p-1">
          {
            user && <div>
              <div className="flex items-center gap-4">
                <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                <div>
                  <Typography variant="h6">Tania Andrew</Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    Web Developer
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
            <Button className='flex items-center gap-2' variant="text" size="md" color="red">
              <PowerIcon className='w-4 h-4' />
              Log Out
            </Button>
          </div>)
          : (<div className="flex w-full flex-nowrap items-center gap-2 lg:hidden pb-4">
            <Link className='w-1/2' to={'/login'}>
              <Button variant="outlined" size="sm" color="blue" fullWidth>
                LogIn
              </Button>
            </Link>
            <Link className='w-1/2' to={'/register'}>
              <Button variant="gradient" size="sm" fullWidth>
                Register
              </Button>
            </Link>
          </div>)}
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
