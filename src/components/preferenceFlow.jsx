import React from 'react';
import Columns from "react-columns";
import { Button, Icon } from 'semantic-ui-react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import MovieList from './movieList.jsx';

const genres = [
  'Action', 
  'Animation', 
  'Comedy', 
  'Documentary', 
  'Drama', 
  'Family', 
  'Horror', 
  'Music', 
  'Romance', 
  'Science Fiction', 
  'Thriller', 
  'War', 
  'Western'];
  
const queries = [
  {
    columns: 2,
    query: "min-width: 440px",
    key: 2
  },
  {
    columns: 3,
    query: "min-width: 680px",
    key: 3
  },
  {
    columns: 4,
    query: "min-width: 920px",
    key: 4
  },
  {
    columns: 5,
    query: "min-width: 1160px",
    key: 5
  }
];

class PreferenceFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedGenres: {},
      mode: 'favorite'
    }
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleDislikeClick = this.handleDislikeClick.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
  }

  handleFavoriteClick(genre, e) {
    let genres = this.state.clickedGenres;
    if (genres[genre] && genres[genre] === 'favorite') {
      delete genres[genre];
    } else if (!genres[genre]) {
      genres[genre] = 'favorite';
    }
    this.setState({
      clickedGenres: genres
    });
  }

  handleDislikeClick(genre, e) {
    let genres = this.state.clickedGenres;
    if (genres[genre] && genres[genre] === 'dislike') {
      delete genres[genre];
    } else if (!genres[genre]) {
      genres[genre] = 'dislike';
    }
    this.setState({
      clickedGenres: genres
    });
  }

  handleContinueClick(e) {
    this.setState({
      mode: 'dislike'
    });
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  render() {
    return (
      <div style={{textAlign: 'center', paddingBottom: '20px'}}>
        {
          this.state.mode === 'favorite' ?
          <h1>Click your favorite genres</h1> :
          <div>
            <h1>Do you dislike any genres?</h1>
            <h3>These genres will be excluded from your recommendations</h3>
          </div>
        }
        <div className='genres' style={{paddingBottom: '15px'}}>
          <Columns queries={queries}>
            {genres.map(genre => (
              <div
                className='genre-box'
                value={genre}
                onClick={this.state.mode === 'favorite' ? (e)=>this.handleFavoriteClick(genre, e) : (e)=>this.handleDislikeClick(genre, e)}
              >
                <h3>{genre}</h3>
                {this.state.clickedGenres[genre] ?
                  (this.state.clickedGenres[genre] === 'favorite' ?
                    <Icon name='checkmark' size='big' color='green' style={{position: 'absolute', paddingTop: '10rem', paddingLeft: '9.5rem'}}/>
                    : <Icon name='ban' size='big' color='red' style={{position: 'absolute', paddingTop: '10rem', paddingLeft: '9.5rem'}}/>) : null
                }
              </div>
            ))}
          </Columns>
        </div>
        {
          this.state.mode === 'favorite' ? 
          <Button
            size='massive'
            color='google plus'
            onClick={this.handleContinueClick}
          > Continue </Button> :        
          <Button as={Link} to={'/recommendations'}
            size='massive'
            color='google plus'
          > Finish </Button>
        }     
      </div>
    )
  }
};

export default PreferenceFlow;
