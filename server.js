const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();


app.use(express.static('public')); // Assuming your script.js is in a folder named 'public'

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    console.log('API Key:', apiKey); // Debugging check
    console.log('Requested city:', city); // Debugging check

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log('Error: City not found'); // Debugging check
            return res.status(404).json({ error: 'City not found' });
        }
        const data = await response.json();
        console.log('Weather data received:', data); // Debugging check
        res.json(data);
    } catch (error) {
        console.error('Server error:', error); // Debugging check
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
