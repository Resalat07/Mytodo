import React, { useContext, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
  } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const Login = () => {

    const [error , setError] =useState('');

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const { signIn } = useContext(AuthContext);


    const handleLogIn = (e) => {
        e.preventDefault();
        const form = e.target;
       

        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);


        signIn(email ,password)
        .then(result =>{
            const user =result.user;
            console.log(user)
            form.reset()
            setError('')
            navigate(from, { replace: true })
        })
        .catch(error=>{
            setError(error.message)
            console.log(error)})

       
    }
    return (
        <div className=' flex justify-center items-center mt-20'>

<Card className="w-96">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <form onSubmit={handleLogIn} >
      <CardBody className="flex flex-col gap-4">
         
        <Input label="Email"  name="email" type="email" size="lg" />
        <Input label="Password"  name="password" type="password" size="lg" />

      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" type="submit" fullWidth>
          Sign In
        </Button>
        <p className=' text-red-600 m-2'>{error}</p>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don't have an account?
          <Link to='/signUp'>
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue"
            className="ml-1 font-bold"
          >
            Sign up
          </Typography>
          </Link>
        </Typography>
      </CardFooter>
      </form>
    </Card>
            
        </div>
    );
};

export default Login;