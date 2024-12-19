const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userController = require('./controllers/UserController');
const bookingController = require('./controllers/BookingController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors());

app.use('/user', userController);
app.use('/booking', bookingController);

app.listen(3003);