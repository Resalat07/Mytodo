import React, { useContext } from 'react';

import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,

  IconButton,
  Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

export default function NavBar() {

  const { user, logOut } = useContext(AuthContext)

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error))
  }

  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to='/myTask' className="flex items-center">
          My Task
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to='/addTask' className="flex items-center">
          Add Task
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to='/completeTask' className="flex items-center">
          Complete Task
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        {
                                user?.uid ?
                                    <>
                                        <div className=' flex'>
                                        <h5 className='p-2 '>{user?.displayName}</h5>
                                        <Button onClick={handleLogOut} className=' ml-2 bg-orange-700'   >Log Out</Button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <Link className='font-text p-3' to='/login'>Login</Link>
                                        <Link className='font-text p-3' to='/signUp'>Sign Up</Link>
                                    </>
                            }
      </Typography>
      

    </ul>
  );


 



  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <Link to='/' className=' text-xl font-semibold'>My To Do App</Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}

      </MobileNav>
    </Navbar>
  );
}