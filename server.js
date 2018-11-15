
// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const request = require("request");
const cheerio = require("cheerio");
const API_URL = "http://localhost:3000/api/scrapes";

const url = "http://www.schnaeppchenfuchs.de";
let searchTerm = false;
let delay = "20";


function scrape() {
  var day = new Date();
  console.log(day.toString("dddd, MMMM ,yyyy") + " >> " + "Start Scraping");
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(body);
      $(".post__title a").each(function(i, element) {
        var $t = $(this);
        var title = $t.text();
        var href = $t.attr("href");
        var event = new Date();
        var date = event.toISOString();
        href = url + href;
        
        let metadata = { title: title, url: href, date: date };
        //   console.log(metadata);
          request(
            {
                  url: API_URL,
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              json: metadata
              //  body: JSON.stringify(requestData)
            },
            function(error, resp, body) {
              console.log(body);
            }
          );
      });
    }
  });
}


// MongoDB
mongoose.connect('mongodb://localhost/scraper', { useNewUrlParser: true });

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(bodyParser.json({ useNewUrlParser: true }));

// Routes
app.use('/api', require('./routes/api'));

// Start server
app.listen(3000);
console.log('API is running on port 3000');

scrape();