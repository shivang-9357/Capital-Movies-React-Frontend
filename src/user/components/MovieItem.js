import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './MovieItem.css';

const MovieItem = props => {
  return (
    <li className="movie-item">
      
      <Card className="movie-item__content">
      <div className="movie-item__badge" style={ {display:!props.adult&&'none'}} >18+</div>
        <Link to={`/${props.id}/movies`}>
          <div className="movie-item__image">
            <Avatar image={`https://image.tmdb.org/t/p/w1280/${props.image}`} alt={props.name} />
          </div>
          <div className="movie-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.year.slice(0,4) || ''} | Ratings {props.placeCount}⭐
            </h3>
            <h4>{props.overview.slice(0,600)}</h4>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default MovieItem;
