const axios = require("axios");

// Chave Pessoal do RAWG Api
const apikey = "959d88c71a27478a9db3ad289f4ec6c1";

// Vamos armazenar os dados aqui
const gameList = [];

async function fetchGameList() {
    // Um clássico da culinária: pedir os dados á API
    console.log('Buscando a lista de jogos...');
    try {
        // Pedindo...
        const response = await axios.get(`https://api.rawg.io/api/platforms?key=${apikey}`);
        // Recebendo, e armazenando...
        gameList.push(...response.data.results);
        // Debug🛑
        // console.log(gameList);
        console.log('Lista de jogos recebida com sucesso!');
    } catch (error) {
        console.error('Erro ao capturar a lista de jogos:', error.response ? error.response.data : error.message);
    }
}

// Iniciando a função acima, sempre que for importada
fetchGameList();

// Pra evitar sobrecargas no servidor, vamos definir limites de tempo aqui
function getGameList() {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (gameList.length > 0) {
                clearInterval(interval);
                resolve(gameList);
            }
        }, 500); // Intervalo de 500ms para nova verificação

        // Timeout após 5 segundos, e retorno
        setTimeout(() => {
            clearInterval(interval);
            reject(new Error("Tempo limite alcançado, tente recarregar a página..."));
        }, 5000);
    });
}

// Exportando dados
module.exports = { getGameList };
