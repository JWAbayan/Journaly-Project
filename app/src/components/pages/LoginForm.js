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

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePassChange = (event) => {
        setPassword(event.target.value);
    }

    const validateUser = (user) => {
        console.log(user[0]);
        //Authorize user when there is a fetched data
        if (user.length > 0) {
            //Extracts the user from the array 
            setFetchedUser(user[0]);
            handleLogin(true, user[0]);

        } else {
            alert('This account is not yet registered. Please check :)')
        }
    }

    const handleSubmit = (event) => {
        axios.get(`http://localhost:8000/api/users?email=${email}&password=${password}`)
            .then((result) => { validateUser(result.data) })

        event.preventDefault();
    }

    //If the user is authorized, redirect to dashboard
    if (hasFetchedUser) {
        return <Navigate to='dashboard' />
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
                <button type="button" className="btn" type="submit">Login</button>
            </div>
        </form >
    );
}



export default LoginForm;