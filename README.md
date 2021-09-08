# Capital-Movies-React-Frontend
## Frontend for the movie discovery platform.
#### This is the production build of the App.
After pulling, install the node modules using `npm install`.
In `.env` file enter you TMDB `API KEY`.
Run `npm start` to start the server on port 3000.
Make sure that the [Backend](https://github.com/shivang-9357/Capital-Movies-Node-Backend) server is running on its describrd port.  
Features:  
`/discover` - This is the landing page. It can also be accessed from the `POPULAR` tab. This page showcases the popular movies of current time.  
`/discover/toprated` - This page can be accessed by clicking on the `DISCOVER` tab. This tab showcases the most rated movies of all time.  
`/auth` - Login into your account here. New users can signup here by clicking on the `SWITCH TO SIGNUP` button.  
`FAVOURITES` tab- This tab is visible only when you are signed in. It houses all the movies which are marked `favourite` by you.  
`Mark Favourite` - Click on any movie card while you are signed in. You will see a white ♥ symbol. Click on the heart to make it red and your favourite. For removing from favourites click on the heart again.  
`SIMILAR MOVIES` - When you open any movie, at the bottom of the screen you will see a list of SIMILAR movies to that of the selected.  
`VIDEOS` - Every Movie has a bunch of videos released by their creators. These include Trailers, Teasers, Bloopers, Behind The Seen-BTS, Clips and many more.  
`Change Pages` - For discovering more movies in POPULAR, TOP RATED or in the Search Results, hover to the right end of the screen and click on the green Aura. For going to the previous page, hover to the left end of the screen and click on the Blue Aura.  

