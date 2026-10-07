const express = require('express');
const usersRoutes = require('./routes/users.routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/api/users', usersRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;