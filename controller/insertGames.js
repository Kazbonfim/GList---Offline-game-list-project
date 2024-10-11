const conn = require('../config/mysql');

function insertGames(req, res) {
    const title = req.body.titulo;
    const gameConsole = req.body.console;
    const genre = req.body.genero;

    const insertGame = `INSERT INTO meus_jogos (title, console, genre) VALUES (?, ?, ?);`; // Usando placeholders, para evitar SQL Injection

    conn.query(insertGame, [title, gameConsole, genre], (error, results) => {
        if (error) {
            console.log('Houve algum erro em inserir seus dados, tente novamente: ', error);
            return res.status(500).send('Erro ao inserir dados');
        }
        console.log('Dados inseridos com sucesso!', results.affectedRows);
        res.status(201).redirect('/');
    });
}

module.exports = insertGames;
