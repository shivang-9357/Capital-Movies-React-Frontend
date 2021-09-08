import React, { useEffect, useState, useContext } from 'react';

import MovieList from '../components/MovieList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const FavouriteMovies = () => {
    const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedMovies, setLoadedMovies] = useState([]);
  const [loadedMovieIds, setLoadedMovieIds] = useState();

  useEffect(() => {
    const fetchMovieIds = async () => {
        
      try {
        const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/favourite/${auth.userId}`
        );

        setLoadedMovieIds(responseData.favourites);
        console.log(responseData);
      } catch (err) {}
    };
    fetchMovieIds();
  }, [sendRequest]);

  useEffect(() => {
    const fetchMovies = async () => {
        var movies=[];
      for(var id in loadedMovieIds){
          console.log(id);
        try {
            const movie = await sendRequest(
                `https://api.themoviedb.org/3/movie/${loadedMovieIds[id]}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
            );
            console.log(movie);
            movies.push(movie);
          } catch (err) {
              console.log(err);
          }
        }
      setLoadedMovies(movies);
    };
    fetchMovies();
  }, [sendRequest, loadedMovieIds]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedMovies && <MovieList items={loadedMovies} />}
    </React.Fragment>
  );
};

export default FavouriteMovies;