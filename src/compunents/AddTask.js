import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const AddTask = () => {
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





    const handleTask = (e) => {
        e.preventDefault();
        const form = e.target;


        const picture = form.picture.value;
        const comment = form.comment.value;
        const taskId = form.id.value;


        const updateTask = {
            picture,
            comment,
            userUpdate : 'updated'

        }

        console.log(updateTask);



        fetch(`http://localhost:5000/addTask/${taskId}`, {
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

                    // toast.success('Booked Successfully');
                }

            })


        

    }


    const handleBook = event => {

        event.preventDefault();
        const form = event.target;


        const name = form.name.value;


        const bookAdd = {
            name,
            email: user.email


        }
        console.log(bookAdd)



        fetch('http://localhost:5000/addTask', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookAdd)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    form.reset()
                    refetch()
                    // toast.success('Book Added Successfully');

                }
                else {
                    // toast.error(data.message);
                }
            })
    }
    return (
        <div>
            <div>
                <form onSubmit={handleBook} className='grid grid-cols-1 gap-3 mt-10'>
                    <input type="text" name='name' placeholder='Enter The Task' className="input w-full border p-3 rounded-lg" />



                    <input className='p-2 text-white rounded-lg bg-orange-600 w-full' type="submit" value="Submit" />
                </form>
            </div>

            <h2 className=' text-5xl mt-10 text-orange-600 text-center font-semibold'>Added Task</h2>

            <div className=' mt-24'>
                <div className=' grid grid-cols-3 gap-4 items-center '>
                {
                    addTasks.map(addTask => addTask.userUpdate !== 'updated' && <div key={addTask._id} >
                        <Card className=' w-96 mb-10 shadow' >

                            <CardHeader
                                variant="gradient"

                                className="mb-4 grid place-items-center shadow-xl bg-teal-700 text-white"
                            >
                                <Typography variant="h3" >
                                    {addTask.name}
                                </Typography>
                            </CardHeader>
                            <CardBody className="flex flex-col gap-4">

                                <form onSubmit={handleTask} >
                                    <input type="text" name='picture' placeholder='Enter The Photo Url' className="input w-full border p-3 rounded-lg mb-3" />
                                    <input type="text" name='comment' placeholder='Enter The Comment' className="input w-full border p-3 rounded-lg mb-3" />




                                    <input  name="id" type="text" defaultValue={addTask._id} disabled placeholder="Product Id" className="input w-full input-bordered text-white" />



                                    <input className='p-2 text-white rounded-lg bg-orange-600 w-full' type="submit" value="Submit" />

                                </form>


                            </CardBody>

                        </Card>
                    </div>)
                }
                </div>
            </div>

        </div>
    );
};

export default AddTask;