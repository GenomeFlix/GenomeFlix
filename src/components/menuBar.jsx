import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link, Route, browserHistory } from 'react-router-dom';
import MovieList from './movieList.jsx';
import axios from 'axios';
// import SearchBar from './searchBar';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state={
      link: ''
    };

  }

  componentDidMount() {
    axios.get('/authorizeUrl')
      .then((data)=> {
        console.log(data);
        this.setState({
          link:data.data.authorizeUrl
        })
      })
  }

  render() {
      return ( <div className='menu-container'>
        <Menu style={{background: '#121212'}}>
          <img src='/icon.png' style={{height: '5em', width: '4em'}}/>
          <p style={{background: 'black'}}>Geneflix</p>

          <Menu.Menu position='right' >
            <button class="ui primary button"> <a href={this.state.link} style={{color: 'white'}}>Connect with genome</a> </button>
          </Menu.Menu>
        </Menu>
        <Route path='/recommendations' component={MovieList} />
      </div>
    );
  }
}
export default MenuBar;
