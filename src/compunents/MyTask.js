import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const MyTask = () => {
    const { user } = useContext(AuthContext)




    const url = `https://task1-alba-server.vercel.app/addedTask?email=${user?.email}`;
    const { data: addTasks = [], refetch } = useQuery({
        queryKey: ['addedTask'],
        queryFn: async () => {

            const res = await fetch(url);

            const data = await res.json();
            return data;


        }
    })



    const handleDelete = (id) => {
        fetch(`https://task1-alba-server.vercel.app/addTask/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()

                }
            })
    }




    const handleComplete = (id) => {

        fetch(`https://task1-alba-server.vercel.app/addTask/complete/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()

                }
            })


    }
    return (
        <div className=' mt-12'>
            <h2 className=' text-orange-600 text-center text-4xl font-semibold m-5'>My Tasks </h2>
            <div className=' grid grid-cols-3 sm:grid-cols-1 gap-4 '>
                {
                    addTasks.map(tasks => tasks.userUpdate === 'updated' && tasks.status !== 'Complete' && <div key={tasks._id}>
                        <Card className="w-96">
                            <CardHeader floated={false} className="h-80 mb-6">
                                <img src={tasks.picture} className=' w-full h-full' alt="" />
                                {/* <img   alt="profile-picture" /> */}
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    {tasks.name}
                                </Typography>
                                <Typography variant="p" color="blue-gray" className="mb-2">
                                    {tasks.comment}
                                </Typography>

                            </CardBody>
                            <CardFooter className="flex justify-center gap-7 pt-2">
                                <Tooltip content="Delete">
                                    <Button className=' bg-orange-600' onClick={() => handleDelete(tasks._id)}>Delete</Button>
                                </Tooltip>
                                <Tooltip content="Complete">
                                    <Button className=' bg-orange-600' onClick={() => handleComplete(tasks._id)}>Complete</Button>

                                </Tooltip>

                            </CardFooter>
                        </Card>
                    </div>)

                }

            </div>
        </div>
    );
};

export default MyTask;