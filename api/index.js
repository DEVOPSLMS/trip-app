const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables
const cors = require('cors')
const app = express();

app.use(cors({
    origin: '*', // Temporarily allow all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


const apiKey = process.env.UNKNOWN_KEY; // Ensure this is set
const sampleData = {
    UNKNOWN: apiKey // Using environment variable in sample data
  };
app.get('/api/query', (req, res) => {
    const query = req.query.query;
    const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${query}&language=en`;

    axios.get(url, { headers: { accept: 'application/json' } })
      .then(response => res.json(response.data))
      .catch(err => {
        console.error(err);
        res.status(500).send('Error fetching data');
      });
});
app.get('/api/data', (req, res) => {
    res.status(200).json(sampleData);
  });
app.options('*', cors());

module.exports = app;