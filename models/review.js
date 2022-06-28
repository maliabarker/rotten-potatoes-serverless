// models/review.js

const mongoose = require('mongoose');

const Review = mongoose.model('Review', new mongoose.Schema({
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    movieTitle: String,
    movieRating: { type: Number, required: true }
}, {
    timestamps: true
}));

// const Review = mongoose.model('Review', reviewScheme);

module.exports = Review;