const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', user);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`)
})

mongoose.set('useCreateIndex', true);
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongodb0.example.com:27017/db';
mongoose.connect(mongoUrl, {useNewUrlParser: true}, err => {
  if(err) console.error(err);
});