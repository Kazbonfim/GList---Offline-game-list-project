// helpers/getRandomColors.js
function getRandomColors(length) {
    // Gera uma cor suave variando os componentes RGB
    const baseColor = Math.floor((length * 120) / 10); // Variação baseada no índice
    const red = (baseColor + 100) % 256; // Mantém a cor vermelha
    const green = (baseColor + 150) % 256; // Mantém a cor verde
    const blue = (baseColor + 200) % 256; // Mantém a cor azul

    return `rgb(${red}, ${green}, ${blue})`; // Retorna a cor em formato RGB
}

module.exports = { getRandomColors };
