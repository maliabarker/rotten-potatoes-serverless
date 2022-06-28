//reviews.js

const Review = require('../models/review');
const Comment = require('../models/comment')
// Got to import the libary
const moment = require('moment');

module.exports = function(app) {
    const { MovieDb } = require('moviedb-promise')
    const moviedb = new MovieDb('cb218379ccca6b7a4bb34b7761507fd3')

    // NEW REVIEW
    app.get('/movies/:movieId/reviews/new', (req, res) => {
        moviedb.movieInfo({ id: req.params.movieId })
        .then((movie) => {
            console.log(movie.id)
            console.log(movie.title)
            res.render('reviews-new', {title: "New Review", movieId: req.params.movieId, movie});
        }).catch(console.error)
    })

    // CREATE
    app.post('/movies/:movieId/reviews', (req, res) => {
        console.log(req.body)
        Review.create(req.body).then((review) => {
            console.log(review);
            res.redirect(`/movies/${review.movieId}`); // Redirect to movies/:id
        }).catch((err) => {
            console.log(err.message);
        })
    })

    // SHOW
    app.get('/movies/:movieId/reviews/:id', (req, res) => {
        // find review
        Review.findById(req.params.id).lean().then(review => {
            let createdAt = review.createdAt;
            createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm a');
            review.createdAtFormatted = createdAt;
            // console.log(createdAt)
        // fetch its comments
        Comment.find({ reviewId: req.params.id }).lean().then(comments => {
            comments.reverse();
            // respond with the template with both values
            res.render('reviews-show', { review: review, comments: comments })
        })
        }).catch((err) => {
        // catch errors
        console.log(err.message)
        });
    });

    // EDIT
    app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review, title: "Edit Review"});
        }).lean();
    });

    // UPDATE
    app.put('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body).lean()
        .then(review => {
            console.log(review)
            res.redirect(`/movies/${review.movieId}/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        });
    });

    // DELETE
    app.delete('/movies/:movieId/reviews/:id', function (req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect(`/movies/${review.movieId}`);
        }).catch((err) => {
        console.log(err.message);
        });
    });
  
  }

