import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import MovieList from '../../user/components/MovieList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './MovieDetails.css'
import Backdrop from '../../shared/components/UIElements/Backdrop';


const MovieDetails = () => {
  const [similarMovies, setSimilarMovies] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
  const [movieCast, setMovieCast] = useState([{name:''}]);
  const [movieVideos, setMovieVideos] = useState([{name:'', type:''}]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isFavourite, setIsFavourite] = useState(false);

  const movieId = useParams().movieId;
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getFavourites = async () => {
      if (auth.isLoggedIn) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/favourite/${auth.userId}`
          );
          const id = responseData.favourites.find(id=> id===movieId);
        if (id) {
          setIsFavourite(true);
        }else{
          setIsFavourite(false);
        }
        } catch (err) {}
      }
      
    };
    getFavourites();
  }, [sendRequest, auth.userId, movieId]);


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const responseData = await sendRequest(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US}`
        );
        setSelectedMovie(responseData);

      } catch (err) {}
    };
    fetchMovie();
  }, [sendRequest, movieId]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const responseDataCast = await sendRequest(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        setMovieCast(responseDataCast.cast);
      } catch (err) {}
    };
    fetchMovie();
  }, [sendRequest, movieId]);


  useEffect(() => {
  const fetchSimilarMovies = async () => {
      try {
        const responseData = await sendRequest(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US}`
        );
        setSimilarMovies(responseData.results);
      } catch (err) {}
    
  };
  fetchSimilarMovies();
}, [sendRequest, movieId]);

useEffect(() => {
  const fetchSimilarMovies = async () => {
      try {
        const responseData = await sendRequest(
          `
          https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        setMovieVideos(responseData.results);
      } catch (err) {}
    
  };
  fetchSimilarMovies();
}, [sendRequest, movieId]);

const favouriteHandler = async()=>{
  if (!isFavourite) {
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users/favourite/${auth.userId}`, 'PATCH', JSON.stringify({
        movieId: movieId
      }), {
        'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        });
        alert('Added to Favourites !');
    } catch (error) {}
  }else{
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users/favourite/${auth.userId}/${movieId}`, 'DELETE');
      alert('Removed from Favourites !');
    } catch (error) {}
  }
  setIsFavourite(!isFavourite);
}


  return (
    <React.Fragment>
      
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <Backdrop />
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && selectedMovie && <div className="movie-poster">
        <div className="movie-poster__image">
          <div className="movie-poster-image-control">
          <img classname="movie-poster__image-img" src={`https://image.tmdb.org/t/p/w1280/${selectedMovie.backdrop_path}`} />
          </div>
          <div className="movie-poster__diffuser"  ></div>
          <div className="movie-poster__diffuser bottom"></div>
          <div className="movie-poster__detail">
            <h1>{selectedMovie.original_title.toUpperCase()}</h1>
            <h3>{selectedMovie.tagline.toUpperCase()}</h3>
            <div className="movie-tags">
              <div className="ratings"><p><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
                style={{width:'25px', position:'relative', top:'5px',marginRight:'10px'}} />{selectedMovie.vote_average}⭐</p>
              </div>
              <div className="length"><p>{selectedMovie.runtime} minutes</p></div>
              <div className="release-date"><p>{selectedMovie.release_date.slice(0,4)}</p></div>
              <div className="release-date"><p>{selectedMovie.status}</p></div>
              {auth.isLoggedIn && <div className="add-favourites" onClick={favouriteHandler}><i class="fas fa-heart" title={isFavourite?'Remove from Favourites':'Add to Favourites'} style={{color:isFavourite&&'red'}}></i></div>}
              <div className="movie-options">

          </div>
            </div>
            <div className="movie-overview"><p>{selectedMovie.overview}</p></div>
            <div className="movie-cast-details">
              
            <table>
              <tr>
                <td>Starring</td>
                <td>{movieCast.slice(0,4).map(cast=> {
                  return <p>{cast.name}</p>;
                })}</td>
              </tr>
              <tr>
                <td>Genres</td>
                <td>{selectedMovie.genres.map(genres=> {
                  return <p>{genres.name}</p>;
                })}</td>
              </tr>
              <tr>
              <td>Languages</td>
              <td>{selectedMovie.spoken_languages.map(lang=> {
                  return <p>{lang.name}</p>;
                })}</td>
              </tr>
            </table>
              
            </div>
            
          </div>
          
        </div>
        <div className="movie-videos">
          <div className="div-heads"><h1 >VIDEOS</h1></div>
          <div className="movie-videos__clips">
            <ol>
            {movieVideos.map(vid=>{
              return <div className="movie-videos__clip">
                <li>
                  <a href={`https://www.youtube.com/watch?v=${vid.key}`} target='_blank'>
                  <h1 style={{fontSize:'1.1rem'}}>{vid.name}</h1>
                  <p>{vid.type.toUpperCase()}</p>
                  </a>
                </li>
              </div>
            })}
            </ol>
          </div>
        </div>
        <div className="movie-production" >
        <div className="div-heads"><h1>PRODUCTIONS</h1></div>
          <div className="movie-production__logos">
          {selectedMovie.production_companies.map(co=>{
            return <div className="movie-production__logo">
              <img src={`https://image.tmdb.org/t/p/w1280/${co.logo_path}`}></img>
              <h1>{co.name}</h1>
              
            </div>
          })}
          </div>
        </div>
        <div className="movies-similar">
        <div className="div-heads"><h1>SIMILAR MOVIES</h1></div>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && similarMovies && <MovieList items={similarMovies} />}
        </div>
      </div>
      }

    </React.Fragment>
  );
};

export default MovieDetails;
