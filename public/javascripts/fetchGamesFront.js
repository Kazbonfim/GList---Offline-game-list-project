console.log('Funcionando!');

// Função para transformar o título em slug (formato para a API)
const generateSlug = (title) => {
    return title
        .toLowerCase()               // Converter para minúsculas
        .trim()                      // Remover espaços extras
        .replace(/[^\w\s]/g, '')     // Remover caracteres especiais
        .replace(/\s+/g, '-');       // Substituir espaços por hífens
};

// Função para buscar a imagem via API usando o slug do título
async function fetchImage(slug) {
    try {
        // Usar o slug para a query da API
        const response = await fetch(`/api/rawg/img?img=${encodeURIComponent(slug)}`);

        // Verifica se a resposta é válida e retorna JSON
        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType.includes("application/json")) {
            console.error(`Erro ao buscar a imagem: ${response.status} - ${response.statusText}`);
            return;
        }

        const data = await response.json();
        console.log('Resposta da API:', data);

        if (data?.imageUrl) {
            return data.imageUrl; // Retorna a URL da imagem
        } else {
            console.error('Imagem não encontrada para:', slug);
            return null; // Retorna null se não encontrar imagem
        }
    } catch (error) {
        console.error('Erro ao buscar a imagem:', error);
    }
}

// Função principal que busca as imagens para todos os títulos
async function buscarImagens() {
    // Pegar todos os elementos com a classe 'game-title'
    const titleElements = document.querySelectorAll('.game-title');

    // Iterar sobre cada título e buscar a imagem correspondente
    for (const titleElement of titleElements) {
        const title = titleElement.textContent; // Captura o título
        const slug = generateSlug(title); // Gera o slug a partir do título
        console.log(`Título convertido em slug: ${slug}`);

        const imageUrl = await fetchImage(slug); // Busca a imagem

        // Se uma URL de imagem foi retornada, atualiza o elemento <img>
        if (imageUrl) {
            const imgElement = titleElement.closest('.card').querySelector('img');
            if (imgElement) {
                imgElement.src = imageUrl;
                imgElement.style.display = 'block';
                console.log('Imagem atualizada:', imgElement.src);
            } else {
                console.error('Elemento <img> não encontrado no card');
            }
        }
    }
}

// Executar a função buscarImagens quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    buscarImagens(); // Chama a função principal que busca as imagens
});
