const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables
const cors = require('cors')
const app = express();

app.use(cors({
  origin: 'http://localhost:4200', // Temporarily allow all origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization','Referer','accept','X-Referer']
}));


const apiKey = process.env.UNKNOWN_KEY; // Ensure this is set

const https = require('https');

app.get('/api/query', (req, res) => {
  const query= req.query.query;
  const category=req.query.category;
  console.log(category);
  const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${query}&category=${category}&language=en`;

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
 
  const locationID= req.query.locationid;
  
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
app.get('/api/queryimage', (req, res) => {
 
  const locationID= req.query.locationid;
  console.log
  const url = `https://api.content.tripadvisor.com/api/v1/location/${locationID}/photos?language=en&key=${apiKey}`;

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
app.get('/api/console',(req,res)=>{
  res.json(apiKey);
})
app.options('*', cors());

module.exports = app;