const port = 8000;
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'accept: application/json');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If cookies are needed
    next();
});
app.listen(8000, () => console.log('Server is running on port ${port}'))
const apiKey = process.env.UNKNOWN_KEY; // Ensure this is set
const sampleData = {
    UNKNOWN: apiKey // Using environment variable in sample data
};
app.get('/query', (req, res) => {
    const url = 'https://api.content.tripadvisor.com/api/v1/location/search?key=9B8AF48CA7184FF29D9D418341D223C9&searchQuery=singapore&language=en';
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
});
module.exports = app;