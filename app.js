const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const { rateLimiter } = require('./middlewares/rateLimiter');
const accountRoutes = require('./routes/accountRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const dataHandlerRoutes = require('./routes/dataHandlerRoutes');
const logRoutes = require('./routes/logRoutes');
const memberRoutes = require('./routes/memberRoutes');



const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/server', dataHandlerRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/members', memberRoutes);

module.exports = app;
