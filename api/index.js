const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables
const cors = require('cors')
const app = express();

app.use(cors({
  origin: '*', // Temporarily allow all origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization','Referer','accept']
}));


const apiKey = process.env.UNKNOWN_KEY; // Ensure this is set
const sampleData = {
  UNKNOWN: apiKey // Using environment variable in sample data
};
const https = require('https');

app.get('/api/query', (req, res) => {
  const query= req.query.query;
  const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${query}&language=en`;

  https.get(url, { headers: { accept: 'application/json',Referer:"https://trip-app-ashen-mu.vercel.app/" } }, (apiRes) => {
    let data = '';

    // Collect the data chunks
    apiRes.on('data', chunk => {
      data += chunk;
    });

    // On response end, parse and send the data to the client
    apiRes.on('end', () => {
      try {
        const jsonResponse = JSON.parse(data);
        res.json(jsonResponse);
      } catch (error) {
        console.error('Error parsing API response:', error);
        res.status(500).send('Error parsing API response');
      }
    });
  }).on('error', (err) => {
    console.error('Error with API request:', err);
    res.status(500).send('Error with API request');
  });
});
app.get('/api/querydetails', (req, res) => {
 
  const locationID= req.locationid.locationID;
  const url = `https://api.content.tripadvisor.com/api/v1/location/${locationID}/details?language=en&currency=USD&key=${apiKey}`;

  https.get(url, { headers: { accept: 'application/json',Referer:"https://trip-app-ashen-mu.vercel.app/" } }, (apiRes) => {
    let data = '';

    // Collect the data chunks
    apiRes.on('data', chunk => {
      data += chunk;
    });

    // On response end, parse and send the data to the client
    apiRes.on('end', () => {
      try {
        const jsonResponse = JSON.parse(data);
        res.json(jsonResponse);
      } catch (error) {
        console.error('Error parsing API response:', error);
        res.status(500).send('Error parsing API response');
      }
    });
  }).on('error', (err) => {
    console.error('Error with API request:', err);
    res.status(500).send('Error with API request');
  });
});

app.options('*', cors());

module.exports = app;