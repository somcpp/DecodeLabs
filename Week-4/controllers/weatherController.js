const axios = require('axios');

exports.getWeather = async (req, res) => {
    try {
        const city = req.query.city;
        
        if (!city) {
            return res.status(400).json({ error: 'Please provide a city in the query parameters (e.g., ?city=London)' });
        }

        const apiKey = process.env.WEATHER_API_KEY;
        
        if (!apiKey || apiKey === 'your_openweathermap_api_key_here') {
            return res.status(500).json({ error: 'API key is missing or invalid. Please configure WEATHER_API_KEY in the .env file.' });
        }

        // Fetch data from external API asynchronously
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        const response = await axios.get(url);
        
        // Extract data
        const weatherData = response.data;

        // Reformat and serve the data
        const reformattedData = {
            city: weatherData.name,
            country: weatherData.sys.country,
            temperature: `${weatherData.main.temp} °C`,
            feels_like: `${weatherData.main.feels_like} °C`,
            description: weatherData.weather[0].description,
            humidity: `${weatherData.main.humidity}%`,
            wind_speed: `${weatherData.wind.speed} m/s`
        };

        res.status(200).json({
            success: true,
            data: reformattedData
        });

    } catch (error) {
        // Handle errors gracefully
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return res.status(error.response.status).json({
                success: false,
                error: error.response.data.message || 'Error fetching data from the external API'
            });
        } else if (error.request) {
            // The request was made but no response was received
            return res.status(503).json({
                success: false,
                error: 'External API service is currently unavailable. Please try again later.'
            });
        } else {
            // Something happened in setting up the request that triggered an Error
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};
