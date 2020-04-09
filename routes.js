const express = require('express');
const { getHerosCreators, getHerosCharacters } = require('./heroes');

const router = express.Router();

router.get('/marvel/collaborators/:hero', async (req, res) => {
	const { hero } = req.params;
	let heroes = await getHerosCreators(hero);
	return res.json(heroes);
});

router.get('/marvel/characters/:hero', async (req, res) => {
	const { hero } = req.params;
	let heroes = await getHerosCharacters(hero);
	if (err) {
		return res.status(500).end();
	}
	return res.json(heroes);
});
