const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const cors = require('cors');
const app = express();
app.use(cors())
app.set('secretKey', process.env.JWT_SECRET_KEY);
app.use(bodyParser.json());
app.use('/api/users', user);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`)
})

app.use(function(req, res, next) {
	let err = new Error('Resource not found');
  err.status = 404;
  next(err);
});

app.use(function errorHandler(err, req, res, next) {
  res.status(err.status || 500).send(err.message || 'internal error');
})

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongodb0.example.com:27017/db';
mongoose.connect(mongoUrl, {useNewUrlParser: true}, err => {
  if(err) console.error(err);
});