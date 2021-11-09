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
          <Link to="/home"><Icons.HouseFill size={this.iconSize} /></Link>
        </div>
        <div className="icon-container">
          <Link to="/calendar"><Icons.CalendarDateFill size={this.iconSize} /></Link>
        </div>
        <div className="icon-container">
          <Link to="#"> <Icons.ListTask size={this.iconSize} /> </Link>
        </div>
        <div className="icon-container">
          <Link to="#"> <Icons.PersonFill size={this.iconSize} /> </Link>
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
