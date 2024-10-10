  var express = require('express');
  var router = express.Router();
  const conn = require('../config/mysql'); // Importando conexão
  const hbs = require('handlebars');


  /* GET home page. */
  router.get('/', function (req, res) {
    res.render('index');
  });

  router.get('/games/listall', function (req, res) {

    const listAll = `SELECT * FROM meus_jogos`

    conn.query(listAll, function (error, data) {
      if (error) {
        console.log('Houve algum erro ao recuperar seus dados ', error);
        return res.status(500).redirect('/');
      }

      const games = data;

      res.render('games', { games });
    });

  })

  router.post('/games/insertgame', function (req, res) {

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

  })

  module.exports = router;
