document.querySelectorAll('.remove-game-form').forEach(form => {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Previne o recarregamento da página

        if (!confirm("Tem certeza que deseja remover este jogo?")) {
            return; // Cancela a remoção se o usuário não confirmar
        }

        const gameId = this.querySelector('input[name="gameId"]').value; // Obtém o ID do jogo
        const card = this.closest('.col-md-3'); // Obtém o card correspondente

        card.classList.add('fade-out'); // Adiciona a animação

        setTimeout(() => {
            // Envia o POST em caso de confirmação
            fetch('/games/deletegames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `gameId=${gameId}` // Envia o ID do jogo no corpo da requisição
            });

            card.remove(); // Remove o card da lista
        }, 1000); // Tempo para a animação ser feita
    });
});
