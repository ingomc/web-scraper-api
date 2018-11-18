
// Dependencies
var express = require('express');
var path = require("path");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const request = require("request");
const cheerio = require("cheerio");
const API_URL = "http://localhost:3000/api/scrapes";

const url = "http://www.schnaeppchenfuchs.de";
let searchTerm = false;
let delay = "20";



// MongoDB
mongoose.connect('mongodb://localhost/scraper', function () {
  /* Drop the DB */
  mongoose.connection.db.dropDatabase();
},
{ useNewUrlParser: true });

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(bodyParser.json({ useNewUrlParser: true }));

// Routes
app.use('/api', require('./routes/api'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Start server
app.listen(3000);
console.log('API is running on port 3000');



function scrape() {
  var day = new Date();
  console.log(day.toString("dddd, MMMM ,yyyy") + " >> " + "Start Scraping");
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(body);
      $(".post").each(function (i, element) {
        var $t = $(this);
        var title = $t.find(".post__title a").text();
        var href = $t.find(".post__title a").attr("href");
        var image = $t.find(".post-image img").attr("src");
        var event = new Date();
        var date = event.toISOString();
        href = url + href;

        let metadata = { title: title, url: href, img: image, date: date };
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
          function (error, resp, body) {
            console.log(body);
          }
        );
      });
    }
  });
}




scrape();




// Loading the index file . html displayed to the client
/*
var server = http.createServer(function (req, res) {
  fs.readFile('./public/index.html', 'utf-8', function (error, content) {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end(content);
  });
});
server.listen(3001);
*/