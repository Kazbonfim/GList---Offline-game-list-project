var express = require("express");
var router = express.Router();

const { getGameList } = require("../public/api/GameList");

// Definindo a rota para obter a lista de jogos
router.get("/games/rawg", async function (req, res) {
    try {
        const games = await getGameList(); // Obtendo a lista de jogos
        res.json(games); // Retornando a lista em formato JSON
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retornando erros
    }
});

module.exports = router;
