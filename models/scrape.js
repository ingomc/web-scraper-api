
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var scraperSchema = new mongoose.Schema({
    title: String,
    url: String
});

// Return model
module.exports = restful.model("Scrapers", scraperSchema);
