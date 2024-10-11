const conn = require("../config/mysql");

function deleteGames(req, res, next) {
    
    console.log(req.body);
    
    const gameId = req.body.gameId; 

    const query = `DELETE FROM meus_jogos WHERE id = ?`;

    conn.query(query, [gameId], (error, results) => {
        if (error) {
            console.log('Erro em processar a deleção, tente novamente mais tarde ', error);
            return res.status(500).send('Erro em processar a deleção, tente novamente mais tarde');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Jogo não encontrado');
        }

        res.redirect('/games/listgames'); // Redireciona pra mesma página
     })

};

module.exports = deleteGames;