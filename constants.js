require('dotenv').config();

exports.apikey = process.env.MARVELAPIKEY;

exports.superheroes = {
	ironman: {
		name: 'Iron Man',
		id: 1009368
	},
	capamerica: {
		name: 'Captain America',
		id: 1009220
	}
};

exports.marvelAPIBaseURL = 'http://gateway.marvel.com/v1/public';
exports.charactersAPIURL = `${marvelAPIBaseURL}/characters`;
