import React, { useEffect, useState } from 'react';

import MovieList from '../components/MovieList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ChangePage from '../components/ChangePage';
import { useHttpClient } from '../../shared/hooks/http-hook';

const TopRatedMovies = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedMovies, setLoadedMovies] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseData = await sendRequest(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
        );

        setLoadedMovies(responseData.results);
        console.log(responseData);
      } catch (err) {}
    };
    fetchMovies();
  }, [sendRequest,page]);

  const prevPageHandler = ()=>{
    if (page!==1) {
      setPage(page-1)
    }else{
      alert('Already on the First Page.');
    }
  }

  const nextPageHandler = ()=>{
    if (loadedMovies.length!==0) {
      setPage(page+1)
    }else{
      alert('This is the Last Page.');
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedMovies && <React.Fragment>
        <MovieList items={loadedMovies} />
        <ChangePage prev={prevPageHandler} next={nextPageHandler}/>
        </React.Fragment>}
    </React.Fragment>
  );
};

export default TopRatedMovies;