import React from "react";
import LoginForm from "./LoginForm";
import "../styles/style.scss";
import { Navigate } from "react-router";
import axios from "axios";
import { Typography } from "@mui/material";

class Register extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            existing: false,
            email: '',
            username: '',
            password: '',
            rePassword: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsnChange = this.handleUsnChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleRePassChange = this.handleRePassChange.bind(this);
        this.validateUserCredentials = this.validateUserCredentials.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value })
    }

    handleUsnChange(event) {
        this.setState({ username: event.target.value })
    }

    handlePassChange(event) {
        this.setState({ password: event.target.value })
    }

    handleRePassChange(event) {
        this.setState({ rePassword: event.target.value })
    }



    handleSubmit(event) {
        let validated = this.validateUserCredentials()

        if (validated) {
            let newAccount = { username: this.state.username, email: this.state.email, password: this.state.password };

            axios.post('http://localhost:8000/api/users/', newAccount);
        }
        event.preventDefault();
    }

    isExisting() {
        axios.get(`http://localhost:8000/api/validate?email=${this.state.email}`)
            .then((results) => {
                if (results.data.length > 0) {
                    this.setState({ existing: true })
                }
            });
    }

    validateUserCredentials() {
        this.isExisting()
        //Check if both passwords matched

        if (this.state.password != this.state.rePassword) {
            alert('Passwords do not match!');
            return false;
        }

        //Check if account already exist
        else if (this.state.existing) {
            alert('Email is already registered!');
            return false;
        }

        return true;
    }




    render() {
        if (this.validated) {
            return <Navigate to='/' />
        }
        return (
            <form onSubmit={this.handleSubmit} className="base-container" ref={this.props.containerRef}>
                <div className="header"><Typography variant='h5'>REGISTER</Typography></div>
                <div className="content">
                    <div className="image">
                        {/* <img src={loginImg} /> */}
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" onChange={this.handleUsnChange} placeholder="Enter your username" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={this.handleEmailChange} placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={this.handlePassChange} placeholder="Enter your password" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_2">Re-type Password</label>
                            <input type="password" name="password_2" onChange={this.handleRePassChange} placeholder="Confirm your password" required />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="submit" className="btn">Register</button>
                </div>
            </form>
        );
    }
}

export default Register;
