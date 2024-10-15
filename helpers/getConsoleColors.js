function getConsoleColors(consoleInput) {
  // Mapeamento de consoles e suas cores RGB com opacidade 0.6 para todos
  const consoleColors = {
    'nintendo switch': { red: 255, green: 0, blue: 0, opacity: 0.6 },
    'ps4': { red: 0, green: 0, blue: 255, opacity: 0.6 },
    'xbox one': { red: 0, green: 255, blue: 0, opacity: 0.6 },
    'pc': { red: 128, green: 128, blue: 128, opacity: 0.6 },
    'xbox series x': { red: 255, green: 223, blue: 0, opacity: 0.6 },
    'ps5': { red: 0, green: 70, blue: 255, opacity: 0.6 },
    // Adicione mais consoles e suas cores aqui...
  };

  // Converte o consoleInput para minúsculas e busca no objeto
  const normalizedConsole = consoleInput.toLowerCase();

  // Se o console for encontrado, retorna a cor com opacidade 0.6
  const color = consoleColors[normalizedConsole];

  if (color) {
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.opacity})`;
  } else {
    return 'rgba(255, 255, 255, 0.6)'; // Cor padrão (branco translúcido) para consoles desconhecidos
  }
}

module.exports = { getConsoleColors };
