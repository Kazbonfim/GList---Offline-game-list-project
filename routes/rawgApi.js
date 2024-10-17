const express = require('express');
const router = express.Router();
require('dotenv').config();
const https = require('https');

const apiKey = process.env.API_KEY;

// Rota para buscar jogos na API RAWG
router.get('/rawg', async (req, res) => {
    const query = req.query.search;

    if (!query) {
        return res.status(400).json({ error: 'A busca é necessária' });
    }

    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${query}`);
        const data = await response.json();

        if (response.ok) {
            return res.json(data.results);
        } else {
            return res.status(response.status).json({ error: data });
        }
    } catch (error) {
        console.error('Erro ao buscar na API RAWG:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
