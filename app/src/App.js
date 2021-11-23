import react from "react";
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Calendar from "./components/pages/Calendar";
import { Route, Routes, } from 'react-router-dom'
import Planner from './components/pages/Planner'

class App extends react.Component {

    constructor(props) {
        super(props);
        this.state = {
            'userAuthorized': false,
            'currentUser': null
        }
        this.authorizeUser = this.authorizeUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    authorizeUser(authorize, user) {
        this.setState({ userAuthorized: authorize });
        this.setState({ currentUser: user });
    }

    logoutUser() {
        this.setState({ userAuthorized: false });
    }



    render() {
        return (
            <Routes>
                <Route path='/' element={<Login handleLogin={this.authorizeUser} />} />
                <Route path='/dashboard' element={<Dashboard authorized={this.state.userAuthorized} handleLogout={this.logoutUser} currentUser={this.state.currentUser} />}>
                    <Route path='planner' element={<Planner currentUser={this.state.currentUser} />} />
                    <Route path='calendar' element={<Calendar currentUser={this.state.currentUser} />} />
                </Route>
            </Routes>

        );
    }
}

export default App;