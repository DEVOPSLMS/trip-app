const port = 8000;
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables
const cors = require('cors')
const app = express();

app.use(cors({
    origin: '*', // Temporarily allow all origins
    methods: ['GET', 'POST'],
    allowedHeaders:['Content-Type','Authorization']
}));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
const apiKey = process.env.UNKNOWN_KEY; // Ensure this is set
const sampleData = {
    UNKNOWN: apiKey // Using environment variable in sample data
};
app.get('/query', (req, res) => {
    const query = req.query.query;
    const options = { 
        method: 'GET', 
        url:'https://api.content.tripadvisor.com/api/v1/location/search?key='+apiKey+'&searchQuery='+query+'&language=en',
        headers: { accept: 'application/json' },
         };

    axios.request(options).then((response)=>{
        res.json(response.data);
    }).catch((error)=>{
        console.log(error);
    })
});
app.get('/test', (req, res) => {
    // Access the query parameter sent by Angular
    const query = req.query.query;
    
    // Do something with the query (e.g., return results based on the query)
    res.json({ message: `Received query: ${query}` });
    console.log(query);
  });
  app.options('*', cors());

module.exports = app;