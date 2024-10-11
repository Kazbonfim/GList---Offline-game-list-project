const conn = require("../config/mysql"); // Importando conexão

function listGames(req, res) {
  const listAll = `SELECT * FROM meus_jogos`;

  conn.query(listAll, function (error, data) {
    if (error) {
      console.log("Houve algum erro ao recuperar seus dados ", error);
      return res.status(500).redirect("/");
    }

    const games = data;

    res.render("games", { games });
  });
}

module.exports = listGames;
