// router.get('/games/search/:id', function (req, res) {

//     const id = req.params.id;

//     const query = `SELECT * FROM meus_jogos WHERE ${id}`;

//     conn.query(query, function (error, data) {
//         if (error) {
//             return res.status(500).send('Erro em buscar dados, tente novamente');
//         }
//         const searchGame = data[0];

//         res.render('search', { searchGame });
//     })

// })
