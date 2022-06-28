// comments.js
const Comment = require('../models/comment');

module.exports = (app) => {

    // // CREATE Comment
    // app.post('/movies/:movieId/reviews/:reviewId/comments', (req, res) => {
    //     Comment.create(req.body).then((comment) => {
    //         console.log(comment)
    //         // console.log(req.body.movieId)
    //         res.redirect(`/movies/${req.body.movieId}/reviews/${comment.reviewId}`);
    //     }).catch((err) => {
    //         console.log(err.message);
    //     });
    // });

    // CREATE Comment
    app.post('/movies/:movieId/reviews/:reviewId/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            console.log(comment)
            res.status(200).send({ comment: comment });
        }).catch((err) => {
            res.status(400).send({ err: err })
        })
    })

    // // DELETE
    // app.delete('/movies/:movieId/reviews/:reviewId/comments/:id', function (req, res) {
    //     console.log("DELETE comment")
    //     Comment.findByIdAndRemove(req.params.id).then((comment) => {
    //         res.redirect(`/movies/${comment.movieId}/reviews/${comment.reviewId}`);
    //     }).catch((err) => {
    //         console.log(err.message);
    //     })
    // })
    // DELETE
    app.delete('/movies/:movieId/reviews/:reviewId/comments/:id', (req, res) => {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id).then(comment => {
            res.status(200).send(comment);
        }).catch((err) => {
            console.log(err.message);
            res.status(400).send(err)
        })
    })
};