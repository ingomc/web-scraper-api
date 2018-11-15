
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var scraperSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    url: String,
    date: String
});

// Return model
module.exports = restful.model("Scrapers", scraperSchema);
