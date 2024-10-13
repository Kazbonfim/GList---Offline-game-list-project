async function autoCompleteGame() {
    
    // Seletores DOM
    const input = document.getElementById('gameName').value;
    const suggestionBox = document.getElementById('suggestions');

    // Verifica se o campo contém menos de 02 letras
    if (input.lenght < 2) {
        suggestionBox.innerHTML = '';
        return
    }

    // Captura os dados em JSON
    const response = await fetch(``);
    const suggestions = await response.json();

    suggestionBox.innerHTML = '';
    suggestions.forEach(game => {
        const li = document.createElement('li');
        li.textContent = game.name;
        suggestionBox.appendChild(li);
    });

}