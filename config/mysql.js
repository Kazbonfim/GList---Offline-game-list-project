const mysql = require("mysql2"); // Iniciando conexão com Mysql
const dotenv = require("dotenv"); // Validando dados de entrada a partir de um arquivo .env

dotenv.config(); // Carregando variáveis de ambiente

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

conn.connect((error) => {
  if (error) {
    console.error("Erro ao conectar ao banco de dados: ", error); // Verificando erros
    return;
  }
  console.log("Banco de dados conectado", conn.host); // Conectando em caso de sucesso
});

module.exports = conn; // Exportando a conexão
