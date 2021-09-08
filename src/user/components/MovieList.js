import React from 'react';

import MovieItem from './MovieItem';
import Card from '../../shared/components/UIElements/Card';
import './MovieList.css';

const MovieList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card className='card-empty' >
          <h2>No Movies found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="movies-list">
      {props.items.map(movie => (
        <MovieItem
          key={movie.id}
          id={movie.id}
          image={movie.poster_path}
          name={movie.title}
          placeCount={movie.vote_average}
          overview ={movie.overview}
          year={movie.release_date}
          adult={movie.adult}
        />
      ))}
    </ul>
  );
};

export default MovieList;
