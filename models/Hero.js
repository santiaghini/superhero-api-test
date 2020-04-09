var mongoose = require('mongoose');
const { getTimeNowString } = require('./utils');

//Define a schema
var Schema = mongoose.Schema;

var HeroSchema = new Schema({
	name: { type: String, required: true },
	marvelID: { type: Number, required: true },
	last_sync: { type: String, default: getTimeNowString() },
	colorists: [ String ],
	editors: [ String ],
	writers: [ String ],
	characters: [ { character: String, comics: [ String ] } ]
});

//Export function to create "Hero" model class
module.exports = mongoose.model('Hero', HeroSchema);
