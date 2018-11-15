
// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Scraper = require('../models/scrape');

// Routes
Scraper.methods(['get', 'put', 'post', 'delete']);
Scraper.register(router, '/scrapes');

// Return router
module.exports = router;
