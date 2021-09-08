import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Movies from './user/pages/Movies';
import TopRatedMovies from './user/pages/TopRatedMovies';
import MovieDetails from './places/pages/MovieDetails';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import FavouriteMovies from './user/pages/Favourites';
import SearchResult from './user/pages/SearchResult';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/discover" exact>
          <Movies />
        </Route>
        <Route path="/discover/toprated" exact>
          <TopRatedMovies />
        </Route>
        <Route path="/:movieId/movies" exact>
          <MovieDetails />
        </Route>
        <Route path="/:userId/favourites" exact>
          <FavouriteMovies />
        </Route>
        <Route path="/search/:query">
          <SearchResult />
        </Route>
        <Redirect to="/discover" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/discover" exact>
          <Movies />
        </Route>
        <Route path="/discover/toprated" exact>
          <TopRatedMovies />
        </Route>
        <Route path="/:movieId/movies" exact>
          <MovieDetails />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/search/:query">
          <SearchResult />
        </Route>
        <Redirect to="/discover" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main style={{marginTop:'4rem'}}>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
