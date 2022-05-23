import React from "react";
import "../styles/style.scss";
import { Link } from 'react-router-dom'
import { useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import { Typography } from "@mui/material";

const LoginForm = ({ handleLogin, containerRef }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fetchedUser, setFetchedUser] = React.useState(null);
    const hasFetchedUser = Boolean(fetchedUser);

    //If the user is authorized, redirect to dashboard
    if (hasFetchedUser) {
        console.log("Has fetched user!")
        return <Navigate to='dashboard' />
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePassChange = (event) => {
        setPassword(event.target.value);
    }

    const validateUser = (user) => {
        //Authorize user when there is a fetched data
        if (user.length > 0) {
            //Extracts the user from the array 
            setFetchedUser(user[0]);
            handleLogin(true, user[0]);

        } else {
            alert('Given Journaly account does not exist. Try again or register a new one')
        }
    }

    //Handles login submit and validate the user
    const handleSubmit = (event) => {

        axios.get(`http://localhost:8000/api/users?email=${email}&password=${password}`)
            .then((result) => { validateUser(result.data) })

        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="base-container" ref={containerRef}>
            <div className="header"><Typography variant='h5'>LOGIN</Typography></div>
            <div className="content">
                <div className="image">

                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input type="email" name="Email Address" placeholder="Enter your email"
                            onChange={handleEmailChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"
                            placeholder="Enter your password" onChange={handlePassChange} required />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button className="btn" type="submit">Login</button>
            </div>
        </form >
    );
}



export default LoginForm;