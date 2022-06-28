const serverless = require("serverless-http");
const express = require("express");
const app = express();

const methodOverride = require('method-override');
var exphbs = require('express-handlebars');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
const movies = require('./controllers/movies')(app);
const admin = require('./controllers/admin')(app);

module.exports = app;

const mongoose = require('mongoose');

const uri = "mongodb+srv://maliabarker:supersecretpassword@cluster0.mnou0t0.mongodb.net/?retryWrites=true&w=majority";
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
}

// // hello world route
// app.get('/', (req, res) => {
//   res.render('home');
// })

// app.get("/", (req, res, next) => {
//   return res.status(200).json({
//     message: "Hello from root!",
//   });
// });

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
