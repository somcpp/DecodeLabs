const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weatherController');

// Route to get weather data for a specific city
router.get('/', getWeather);

module.exports = router;
