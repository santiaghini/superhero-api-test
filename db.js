const { MongoClient } = require('mongodb');
const { Hero } = require('./models/Hero');

const connectionUrl = process.env.DATABASEURL;

exports.init = () => {
	return mongoose.connect(connectionUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
};

exports.updateHero = (heroObj) => {
	Hero.find({ marvelID: heroObj.marvelID }, 'name', function(err, heroes) {
		if (err) return handleError(err);
		if (heroes.length !== 0) {
			// edit existing entry
			let heroInstance = heroes[0];

			heroInstance.last_sync = heroObj.last_sync;
			heroInstance.characters = heroObj.characters;
			heroInstance.editors = heroObj.editors;
			heroInstance.writers = heroObj.writers;
			heroInstance.colorists = heroObj.colorists;

			heroInstance.save(function(err) {
				if (err) return handleError(err); // saved!
			});
		} else {
			// create new entry
			Hero.create(heroObj, function(err, hero) {
				if (err) return handleError(err);
				// saved!
			});
		}
	});
};

exports.getHerosCreators = (hero) => {
	let creators = {};
	Hero.findOne({ marvelID: hero.id }, 'last_sync editors writers colorists', function(err, hero) {
		if (err) return handleError(err);
		creators = hero;
	});
	return creators;
};

exports.getHerosCharacters = (hero) => {
	let characters = {};
	Hero.findOne({ marvelID: hero.id }, 'last_sync characters', function(err, hero) {
		if (err) return handleError(err);
		creators = hero;
	});
	return characters;
};

const handleError = (err) => {
	return {
		status: 'error',
		message: 'Error with Mongo DB',
		error: err
	};
};
