const express = require('express');
const { users } = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/users', users);

app.listen(port, () => {
  console.log(`Server started on port ${port}...`)
})