const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const { engine } = require("express-handlebars");
const gameList = require("./routes/rawgApi");

// Helpers
const { getConsoleColors } = require("./helpers/getConsoleColors.js");

const indexRouter = require("./routes/index");

const app = express();

// Configura o diretório de views
app.set("views", path.join(__dirname, "views"));
app.use("/helpers", express.static(path.join(__dirname, "helpers")));

// Configura o motor de visualização handlebars
app.engine('hbs', engine({
    extname: '.hbs', // Use a extensão .hbs
    helpers: {
        json: (context) => JSON.stringify(context),
        getConsoleColors // Adicionando seu helper aqui
    },
    layoutsDir: path.join(__dirname, "views/layouts"), // Ajuste para o diretório de layouts
    partialsDir: path.join(__dirname, "views/partials"), // Configura o diretório de partials
}));

app.set("view engine", "hbs"); // Mudança de 'handlebars' para 'hbs'

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet()); // Para proteção contra ataques

// Configuração de segurança de conteúdo
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://code.jquery.com https://cdn.jsdelivr.net https://stackpath.bootstrapcdn.com");
    next();
});

// Rotas
app.use("/", indexRouter);
app.use("/api", gameList);

module.exports = app;
