var express = require("express");
var router = express.Router();

// Controllers
const listGames = require("../controller/listGames");
const insertGames = require("../controller/insertGames");
const searchGames = require("../controller/searchGames");
const deleteGames = require("../controller/deleteGames");


// Entrada 1
router.get("/", function (req, res) {
  res.render("index");
});

// Redirecionamento > Entrada 2
router.get("/games", function (req, res) {
  res.render("index");
});

// Operações no site, (endereço/controlador)
router.get("/games/listgames", listGames);

router.post("/games/insertgames", insertGames);

router.get("/games/search", searchGames);

router.post("/games/deletegames", deleteGames);

router.post("/games/deletegames/:id", deleteGames);

module.exports = router;
