// movies.js

const Review = require('../models/review');

module.exports = function(app) {
    // const MovieDB = require('moviedb-promise')

    const { MovieDb } = require('moviedb-promise')
    const moviedb = new MovieDb('cb218379ccca6b7a4bb34b7761507fd3')

    app.get('/', (req, res) => {
        moviedb.movieNowPlaying().then(movies => {
            // res.render('movies-index', { movies: response.results });
            moviedb.genreMovieList().then(genres => {
                // console.log(genres.genres)
                // console.log(movies)
                // MAPPING GENRES TO MOVIES
                movies.results.forEach(function (movie) {
                    // console.log(movie.genre_ids);
                    movie_genres = []
                    movie.genre_ids.forEach(function (movie_genre) {
                        genres.genres.forEach(function (genre) {
                            // console.log(genre)
                            if (movie_genre == genre.id){
                                // console.log(movie_genre)
                                movie_genres.push(genre.name);
                            };
                        });
                    });
                    movie['genres_str'] = movie_genres;
                    // console.log(movie)
                });
                res.render('movies-index', { movies: movies.results, genres: genres.genres });
            });
        }).catch(console.error);
    });  
    
    // SHOW

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
          moviedb.movieVideos({ id: req.params.id }).then(videos => {
            // console.log(videos.results[0])
            movie.trailer_youtube_id = videos.results[0].key
            // console.log('VIDEOS.TRAILER_YOUTUBE_ID', movie.trailer_youtube_id);
            moviedb.movieSimilar({ id: req.params.id }).then(similar_vids => {
                // console.log(similar_vids.results.slice(0, 3))
                movie.similar_vids = similar_vids.results.slice(0, 3)
                // console.log(movie.similar_vids)
                // FIND THIS MOVIE'S REVIEWS
                Review.find({ movieId: req.params.id }).lean().then(reviews => {
                    // THEN RENDER THE MOVIES-SHOW TEMPLATE
                    // console.log(reviews)
                    res.render('movies-show', { movie: movie, reviews: reviews });
                }).catch(console.error);
                // res.render('movies-show', { movie: movie});
            }).catch(console.error);
          }).catch(console.error);
        }).catch(console.error);
    });
  }