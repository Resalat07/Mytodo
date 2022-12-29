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
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const SignUp = () => {


    const [error , setError] =useState('');
    const { createUser ,updateUserProfile ,providerLogin } = useContext(AuthContext);


    const handleUpdateUserPro = (name )=>{
        const profile = {
            displayName: name,
            
        }
        updateUserProfile(profile)
        .then(()=>{})
        .catch(error=>console.log(error))
    }





    const googleLogin = () => {
        providerLogin(new GoogleAuthProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(err => console.log(err))
    }


    



    const handleSignUp = (e) => {


        
    
        


        e.preventDefault();
        const form = e.target;


        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        console.log(email, password, name);

        createUser(email ,password)
        .then(result =>{
            const user =result.user;
            console.log(user)
            setError('')
            form.reset()
            handleUpdateUserPro(name )
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
                    color="green"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign Up
                    </Typography>
                </CardHeader>
                <form onSubmit={handleSignUp} >
                    <CardBody className="flex flex-col gap-4">



                        <Input label="Name" name="name" type="text" size="lg" />
                        <Input label="Email" name="email" type="email" size="lg" />

                        <Input label="Password" name="password" type="password" size="lg" />

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" type="submit" fullWidth>
                            Sign Up
                        </Button>
                        <Button variant="gradient" onClick={googleLogin} fullWidth>
                            Google Login
                        </Button>

                        <p className=' text-red-600 m-2'>{error}</p>

                        
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default SignUp;