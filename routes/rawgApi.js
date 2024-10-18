const express = require('express');
const router = express.Router();
require('dotenv').config();
const https = require('https');

const apiKey = process.env.API_KEY;

// Rota para buscar jogos na API RAWG
// Rota1: busca titulo coreto, com base no nome
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
// Rota2: busca imagens, com base no nome
router.get('/rawg/img', async (req, res) => {
    const query = req.query.img;

    if (!query) {
        return res.status(400).json({ error: 'Query não fornecida.' });
    }

    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${query}`);
        const data = await response.json();

        if (response.ok) {
            // Pegar a URL da imagem do primeiro jogo encontrado
            const imageUrl = data.results[0]?.background_image;

            if (imageUrl) {
                // Retornar a URL da imagem como JSON
                return res.json({ imageUrl });
            } else {
                return res.status(404).json({ error: 'Imagem não encontrada.' });
            }
        } else {
            return res.status(response.status).json({ error: data });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados.' });
    }
});



module.exports = router;
