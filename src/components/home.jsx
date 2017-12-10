import React, { Component } from 'react';
import axios from 'axios';
import PreferenceFlow from './preferenceFlow.jsx';
import Header from './header.jsx';
import MovieList from './movieList.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {
      traits: []
    }

  }

  componentDidMount() {
    axios.get('/reports')
      .then((data)=> {
        let temp = [];
        console.log('getting reports');
        for (let i = 0 ; i <= 4; i++) {
          temp.push(data.data[i]._data.summary);
          temp[i].trait = data.data[i]._data.phenotype.display_name;
        }
        this.setState({
          traits:temp
        })
      }).then(()=>{console.log(this.state.traits)})
  }

  render() {
    return (
      <div>
        <Header />
        <PreferenceFlow />
      </div>
    );
    // return (
    //   <div className="App">
    //     <MovieList />
    //   </div>
    // );
  }
}

export default Home;
