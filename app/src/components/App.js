import './styles/App.css';
import react from 'react';
import * as Icons from 'react-bootstrap-icons'
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Calendar from './Calendar';

class App extends react.Component {

  constructor(props) {
    super(props)
    this.iconSize = 32;
  }

  render() {
    return (
      <div className="container-fluid app">
        <div className="row app-row">
          <Router>
            <div className="col-1 menu-container">
              <div className="app-name">
                <h1>Journaly</h1>
              </div>
              <div className="menu">
                <Menu />

              </div>
            </div>
            <div className="col-11 journal-container">
              <header className="date">
                <Date />
              </header>
              <main className="main-content" >
                {/* Dito lalagay yung mga page, wag mo muna pansinin yung routes */}
                <Routes>
                  <Route path='/calendar' component={Calendar} />
                </Routes>
              </main>
            </div>
          </Router>
        </div>
      </div >
    );
  }
}


class List extends react.Component {
  // constructor(props) {
  //   this.state = {

  //   }
  // }
  render() {
    return (
      <div className="list">
        <p>List 1</p>
      </div>
    );
  }
}

class Menu extends react.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="icon-container">
          <Link to="#"><Icons.HouseFill size={this.iconSize} /></Link>
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

class Item extends react.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="item">

      </div>
    );
  }

}





export default App;
