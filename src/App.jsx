import React, { Component } from 'react';
// import logo from './logo.svg';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './components/home.jsx';
import MenuBar from './components/menuBar.jsx';
import './App.css';

class App extends Component {
    constructor(props) {
    super(props);
    this.state= {

    }

  }

  componentDidMount() {
    axios.get('/reports')
      .then((data)=> {
        console.log(data);
      })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <MenuBar url={window.location} />
            <Route exact path='/' component={Home} />
          </div>
        </Router>
      </div>
    );

  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
