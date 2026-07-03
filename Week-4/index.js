require('dotenv').config();
const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Week 4 External API Fetcher is running...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
