document.querySelectorAll('.remove-game-form').forEach(form => {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Previne o recarregamento da página

        if (!confirm("Tem certeza que deseja remover este jogo?")) {
            return; // Cancela a remoção se o usuário não confirmar
        }

        // Obtém o gameId da URL da ação
        const gameId = this.action.split('/').pop(); // Pega o último segmento da URL
        const card = this.closest('.col-md-6'); // Obtém o card correspondente

        card.classList.add('fade-out'); // Adiciona a animação

        setTimeout(() => {
            // Envia o POST em caso de confirmação
            fetch(`/games/deletegames`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Use JSON para enviar dados
                },
                body: JSON.stringify({ gameId }) // Envia o ID do jogo no corpo da requisição
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao remover o jogo');
                    }
                    return response.text(); // Pega a resposta em texto
                })
                .then(message => {
                    // Mensagem de sucesso
                    // console.log(message);
                    card.remove(); // Remove o card da lista
                })
                .catch(error => {
                    console.error(error); // Tratamento de erros
                    alert('Erro ao remover o jogo. Tente novamente mais tarde.');
                });
        }, 1000); // Tempo para a animação ser feita
    });
});
