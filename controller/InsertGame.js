const conn = require('../config/mysql');

const insertGame = `INSERT INTO meus_jogos (title, console, genre) VALUES ('${title}', '${console}', '${genre}');`;