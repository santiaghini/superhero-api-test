const axios = require('axios');
const { superheroes, charactersAPIURL, marvelAPIKey } = require('./constants');
const { updateHero, getHerosCreatorsDB, getHerosCharactersDB } = require('./db');
const { getTimeNowString } = require('./utils');

const apikey = marvelAPIKey;

exports.getHerosCreators = async (heroAlias) => {
	let hero = superheroes[heroAlias];
	await synchonizeHero(hero);

	// get from database filtering to only get creators
	let heroObj = getHerosCreatorsDB(hero);

	return heroObj;
};

exports.getHerosCharacters = async (heroAlias) => {
	let hero = superheroes[heroAlias];
	await synchonizeHero(superheroes[heroAlias]);

	// get from database filtering to only get characters
	let heroObj = getHerosCharactersDB(hero);

	return heroObj;
};

const synchonizeHero = async (hero) => {
	let colorists = Set();
	let writers = Set();
	let editors = Set();
	let commonHeroes = Set();

	const heroId = hero.id;
	const heroName = hero.name;

	const limit = 100;
	const count = limit;
	const offset = 0;

	while (count < limit) {
		const comicsRes = await getComics(heroId, offset);
		const data = comicsRes.data;

		// Return in case that the Marvel API returns an erroneous response
		if (data.code !== 200) {
			console.error('Request failed');
			return;
		}

		count = data.count;
		const comics = data.results;

		for (const comic of comics) {
			const comicTitle = comic.title;

			var creators = comic.creators;

			for (const creator of creators.items) {
				switch (creator.role) {
					case 'colorist':
						colorists.add(creator.name);
						break;
					case 'writer':
						writers.add(creator.name);
						break;
					case 'editor':
						editors.add(creator.name);
						break;
				}
			}
			// TODO: implement way to fetch characters in batches in
			// the case that the returned characters is less than the available

			var characters = comic.characters;

			for (const character of characters.items) {
				if (character.name !== heroName) {
					commonHeroes[character.name] = [];
					commonHeroes[character.name].push(comicTitle);
				}
			}
			// TODO: implement way to fetch characters in batches in
			// the case that the returned characters is less than the available
		}

		offset += limit;
	}

	let characters = [];
	for (let [ character, comics ] of Object.entries(commonHeroes)) {
		characters.push({ character, comics });
	}

	// upload to database
	let heroObj = {
		last_sync: getTimeNowString(),
		characters,
		editors: Array.from(editors),
		writers: Array.from(writers),
		colorists: Array.from(colorists),
		marvelID: heroId,
		name: heroName
	};

	updateHero(heroObj);
};

const getComics = async (heroId, offset, limit = 100, orderBy = 'title') => {
	try {
		return await axios.get(`${charactersAPIURL}/${heroId}/comics`, {
			params: {
				apikey,
				orderBy,
				limit,
				offset
			}
		});
	} catch (error) {
		console.error(error);
	}
};

const getCharacter = async (id) => {
	try {
		return axios.get(`${charactersAPIURL}/${id}`, {
			params: {
				apikey
			}
		});
	} catch (error) {
		console.error(error);
	}
};

const getCollection = async (collectionURI) => {
	try {
		return await axios.get(collectionURI, {
			params: {
				apikey
			}
		});
	} catch (error) {
		console.error(error);
	}
};
