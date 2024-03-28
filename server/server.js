const express = require('express');
require('dotenv').config();

const apiRouter = require('./routes');

// App setup
const app = express();
const port = process.env.PORT || 8080;

// Every route should start with /api
app.use('/api', apiRouter);

// Error handlers
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Server đang bị lỗi. Vui lòng thử lại sau!');
});

// Listen for requests
app.listen(port, () => {
  console.log(`Server running on ${port}....`);
});