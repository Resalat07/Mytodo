import AddTask from "../compunents/AddTask";
import CompleteTask from "../compunents/CompleteTask";
import Home from "../compunents/Home";
import Login from "../compunents/Login";
import MyTask from "../compunents/MyTask";
import SignUp from "../compunents/SignUp";
import PrivateRoute from './PrivateRoute/PrivateRoute'
import Main from "../compunents/layout/Main"

const { createBrowserRouter } = require("react-router-dom");


export const route = createBrowserRouter(
    [
        {
            path:'/',
            element:<Main></Main>,
            children:[
                {
                    path:'/',
                    element:<Home></Home>
                },
                {
                    path:'/addTask',
                    element:<PrivateRoute><AddTask></AddTask></PrivateRoute>
                },
                {
                    path:'/completeTask',
                    element:<PrivateRoute><CompleteTask></CompleteTask></PrivateRoute>
                },
                {
                    path:'/myTask',
                    element:<PrivateRoute><MyTask></MyTask></PrivateRoute>
                },
                {
                    path:'/login',
                    element:<Login></Login>
                },
                {
                    path:'/signUp',
                    element:<SignUp></SignUp>
                }
            ]
        }
    ]
)