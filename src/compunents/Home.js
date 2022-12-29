import React from 'react';
import Lottie from "lottie-react";
import todo from '../resou/todo.json'
import '../styles/_main.scss'

const Home = () => {
    return (
        <div>

            <div className=' grid grid-cols-2 '>
                <div className=' text-center text-orange-600 text-6xl font-bold mt-20 p-6 '> Make Your Own <br /> ToDo List</div>
                <div><Lottie animationData={todo} loop={true} /></div>
                
            </div>

        </div>
    );
};

export default Home;