import React from 'react';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import background from './assets/5272.jpg'
import { Grid, Typography, Paper, Container } from '@mui/material';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogginActive: true,
        }
    }

    componentDidMount() {
        //Add .right by default
        this.rightSide.classList.add("right");
    }

    changeState() {
        const { isLogginActive } = this.state;
        if (isLogginActive) {
            this.rightSide.classList.remove("right");
            this.rightSide.classList.add("left");
        } else {
            this.rightSide.classList.remove("left");
            this.rightSide.classList.add("right");
        }

        this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
    }

    render() {
        const { isLogginActive } = this.state;
        const current = isLogginActive ? "Register" : "Login";
        const currentActive = isLogginActive ? "login" : "register";


        return (
            <div className="App" >
                <div><Typography variant='h3'>JOURNALY</Typography></div>
                <div className="login">
                    <div className="container">
                        {isLogginActive && <LoginForm handleLogin={this.props.handleLogin} containerRef={(ref) => this.current = ref} />}
                        {!isLogginActive && <RegisterForm containerRef={(ref) => this.current = ref} />}
                    </div>
                    <RightSide current={current} currentActive={currentActive} containerRef={ref => this.rightSide = ref} onClick={this.changeState.bind(this)} />
                </div>
            </div>
        );
    }
}

const RightSide = props => {
    return (
        <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    );
};

// const Login = ({ props }) => {
//     return (
//         <Container >
//             <Grid container spacing={2}>
//                 <Grid item xs={8}>
//                     <Paper>
//                         8
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={2}>
//                     <Paper>
//                         2
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

export default Login;
