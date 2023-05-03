const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and script from the sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: 'habitTracker',
    //TODO: change the secret key before deployment in production mode
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/habit_tracker',
    }),
  })
);

app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running in the port: ${port}`);
});
