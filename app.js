const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const hbs = require("hbs");
const gameList = require("./routes/gameList");

// Helpers
const { getRandomColors } = require("./helpers/getRandomColors");
hbs.registerPartials(path.join(__dirname, "views/partials"));

const indexRouter = require("./routes/index");

const app = express();

// Configura o diretório de views
app.set("views", path.join(__dirname, "views"));
app.use("/helpers", express.static(path.join(__dirname, "helpers")));
app.set("view engine", "hbs");

// Registrando Helpers
hbs.registerHelper("getRandomColors", getRandomColors);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet()); // Para dar proteção contra ataques


app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://code.jquery.com https://cdn.jsdelivr.net https://stackpath.bootstrapcdn.com");
    next();
});

// Rotas
app.use("/", indexRouter);
app.use("/rawg", gameList);

module.exports = app;
