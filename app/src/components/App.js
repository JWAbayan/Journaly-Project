import './styles/App.css';
import react from 'react';
import * as Icons from 'react-bootstrap-icons'
import { Link, Route, Routes } from 'react-router-dom'
import Calendar from './main-pages/Calendar';
import Home from './main-pages/Home'



class App extends react.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container-fluid app">
        <div className="row app-row">
          <div className="col-1 menu-container">
            <div className="app-name">
              <h1>Journaly</h1>
            </div>
            <div className="menu">
              <Menu />
            </div>
          </div>
          <div className="col-11 journal-container">
            <header className="date mt-3">
              <Date />
            </header>
            <main className="main-content" >
              <Routes>
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/home' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
              </Routes>
            </main>
          </div>
        </div>
      </div >
    );
  }
}

class Menu extends react.Component {
  constructor(props) {
    super(props);
    this.iconSize = 26;
  }

  render() {
    return (
      <>
        <div className="icon-container">
          <Link to="/home">
            <Icons.HouseFill className="menu-icon" size={this.iconSize} color="white" name="home" />
          </Link>
          <p className="mx-4 menu-label">Home</p>
        </div>
        <div className="icon-container">
          <Link to="/calendar">
            <Icons.CalendarDateFill className="menu-icon" size={this.iconSize} color="white" name="calendar" />
          </Link>
          <p className="mx-4 menu-label">Calendar</p>
        </div>

        <div className="icon-container">
          <Link to="#">
            <Icons.ListTask className="menu-icon" size={this.iconSize} color="white" />
          </Link>
          <p className="mx-4 menu-label">Lists</p>
        </div>

        <div className="icon-container">
          <Link to="#">
            <Icons.PersonFill className="menu-icon" size={this.iconSize} color="white" />
          </Link>
          <p className="mx-4 menu-label">Profile</p>
        </div>
      </>
    );
  }
}

class Date extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: 'mm/dd/yyyy'
    };
  }

  componentDidMount() {
    // this.setState((currentDate = 'hello'));
  }

  render() {
    return (
      <div className="header-date">
        <p>{this.state.currentDate}</p>
      </div>

    );
  }
}





export default App;
