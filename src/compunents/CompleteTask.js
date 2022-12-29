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
const CompleteTask = () => {


    const {user}  = useContext(AuthContext)
    



    const url = `http://localhost:5000/addedTask?email=${user?.email}`;
    const { data: addTasks = [], refetch } = useQuery({
        queryKey: ['addedTask'],
        queryFn: async () => {

            const res = await fetch(url);

            const data = await res.json();
            return data;


        }
    })



    const handleDelete = (id) => {
        fetch(`http://localhost:5000/addTask/${id}`, {
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

        fetch(`http://localhost:5000/addTask/uncomplete/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                   
                }
            })


    }








    



    const handleTask = (e) => {
        e.preventDefault();
        const form = e.target;


       
        const comment = form.comment.value;
        const taskId = form.id.value;


        const updateTask = {
           
            comment
            

        }

        console.log(updateTask);



        fetch(`http://localhost:5000/addTask/comment/${taskId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.matchedCount > 0) {
                    refetch()
                    form.reset()

                    
                }

            })


        

    }






    return (
        <div className=' mt-11'>

<h2 className=' text-orange-600 text-center text-4xl font-semibold m-5'>Complete Tasks </h2>


            <div className=' grid grid-col-3 sm:grid-cols-1 justify-center'>
            {
                addTasks.map(tasks => tasks.status !== "Not Complete" && <div   key={tasks._id}>

                    <Card className="w-96">
                        <CardHeader floated={false} className="h-80 mb-6">
                            <img src={tasks.picture} className=' w-full h-full' alt="" />
                            {/* <img   alt="profile-picture" /> */}
                        </CardHeader>
                        <CardBody className="text-center">
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                {tasks.name}
                            </Typography>

                            <form onSubmit={handleTask} >
                        {/* <input type="text" name='picture' placeholder='Enter The Photo Url' className="input w-full border p-3 rounded-lg mb-3" /> */}
                        <input type="text" name='comment' placeholder='Enter The Comment' className="input w-full border p-3 rounded-lg mb-3" />




                        <input name="id" type="hidden" defaultValue={tasks._id} disabled placeholder="Product Id" className="input w-full input-bordered text-white" />

                        <input className='p-2 text-white rounded-lg bg-orange-600 w-full' type="submit" value="Submit" />






                    </form>

                        </CardBody>
                        <CardFooter className="flex justify-center gap-7 pt-2">
                            <Tooltip content="Delete">
                                <Button className=' bg-orange-700' onClick={() => handleDelete(tasks._id)}>Delete</Button>
                            </Tooltip>
                            <Tooltip content="Complete">
                                <Button className=' bg-orange-700' onClick={() => handleComplete(tasks._id)}>Not Complete</Button>

                            </Tooltip>

                        </CardFooter>
                    </Card>
                    
                </div>)
            }
            </div>



        </div>
    );
};

export default CompleteTask;