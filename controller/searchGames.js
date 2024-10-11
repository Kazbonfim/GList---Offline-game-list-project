const conn = require('../config/mysql'); // Importando conexão

function searchGames(req, res) {
    let nomeBuscado = '';

    if (!req.query.busca) {
        return res.render('search', { jogos: [] }); // Renderiza SEM buscar nada; foi infernal ajustar isso, é bom que se lembre como faz, Lucas, sempre dê return antes.
    }

    nomeBuscado = req.query.busca.toLowerCase(); //  Se houverem buscas, renderiza para lowercase antes

    const query = `SELECT title, 
  console FROM meus_jogos 
  WHERE LOWER(title) LIKE ? OR LOWER(console) LIKE ?`;

    const termoBusca = `%${nomeBuscado}%`
    const termoBuscaConsole = `%${nomeBuscado}%`

    conn.query(query, [termoBusca, termoBuscaConsole], (error, results) => {
        if (error) {
            console.log('Houve algum erro em buscar os dados, tente novamente ', error);
            res.status(500).send('Erro no servidor');
        }

        res.render('search', { jogos: results });

    });
}

module.exports = searchGames;