async function queryInput() {
    const inputElement = document.getElementById('titulo'); // Seleciona o elemento de input
    const query = inputElement.value; // Obtém o valor do input

    // Verifica se 2 ou mais caracteres foram digitados
    if (query.length > 2) {
        try {
            const response = await fetch(`/api/rawg?search=${query}`); // Faz a requisição para a rota de busca
            if (!response.ok) { // Verifica se a requisição falhou
                console.log(response);
                throw new Error('Erro na requisição: ' + response.status);
            }

            const data = await response.json(); // Converte a resposta para JSON
            const suggestionDiv = document.getElementById('suggestions'); // Seleciona a div de sugestões
            suggestionDiv.innerHTML = data.map(game =>
                `<div class="suggestion-item">${game.name}</div>`).join(''); // Adiciona as sugestões à div

            // Adiciona um evento de clique a cada item de sugestão
            suggestionDiv.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    inputElement.value = item.textContent; // Preenche o input com o nome do jogo
                    suggestionDiv.innerHTML = ''; // Limpa as sugestões
                });
            });

        } catch (error) {
            console.log(error); // Exibe erros no console
        }
    } else {
        document.getElementById('suggestions').innerHTML = ''; // Limpa as sugestões se a query for menor que 3 caracteres
    }
};

// Adiciona o evento de input ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const gameQueryInput = document.getElementById('titulo');
    gameQueryInput?.addEventListener('input', queryInput); // Chama a função de busca quando o usuário digita
});
