const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://acgeoffrey:<0W8gai71iumiU187>@habittracker.quyhfyz.mongodb.net/'
);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function () {
  console.log('Connected to database :: MongoDB');
});

module.exports = db;
