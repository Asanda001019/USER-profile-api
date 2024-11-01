const express = require('express');

const userRoutes =require('./routes/userRoutes');

errorHandller =require('./middleware/errorHandler');

const app = express();

const port = 5050;

app.use(express.json());

app.use('/users',userRoutes);
