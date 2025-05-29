// --- SELEÇÃO DE ELEMENTOS DO DOM ---
// Seleciona o elemento HTML com o ID 'factText' onde o fato do gato será exibido.
const factTextElement = document.getElementById('factText');
// Seleciona o botão HTML com o ID 'factButton' que dispara a busca por um novo fato.
const factButtonElement = document.getElementById('factButton');
// Seleciona o botão HTML com o ID 'translateButton' que dispara a tradução do fato.
const translateButtonElement = document.getElementById('translateButton');

// --- URLs DAS APIs ---
// URL da API para buscar fatos aleatórios sobre gatos.
const apiURL = 'https://catfact.ninja/fact';
// URL base da API MyMemory para tradução de texto.
const translateApiUrl = 'https://api.mymemory.translated.net/get';

// --- VARIÁVEIS DE ESTADO ---
// Armazena o fato original (em inglês) buscado da API.
let originalFact = '';
// Booleano para rastrear se o fato exibido atualmente está traduzido (true) ou não (false).
let isTranslated = false;
// Armazena o fato traduzido para evitar retraduções desnecessárias se o usuário alternar.
let currentTranslatedFact = '';

// --- FUNÇÃO PARA BUSCAR E EXIBIR O FATO DE GATO ---
// Função assíncrona para buscar um novo fato de gato e exibi-lo na página.
async function fetchAndDisplayCatFact() {
    // Atualiza o texto na página para indicar que um fato está sendo buscado.
    factTextElement.textContent = 'Buscando um fato interessante...';
    // Desabilita o botão de "novo fato" para evitar múltiplos cliques durante a requisição.
    factButtonElement.disabled = true;
    // Desabilita o botão de tradução enquanto um novo fato está sendo buscado.
    translateButtonElement.disabled = true;
    // Reseta o texto do botão de tradução para o padrão.
    translateButtonElement.textContent = 'Traduzir para o português';
    // Reseta o estado de tradução, já que um novo fato (não traduzido) será buscado.
    isTranslated = false;
    // Limpa o fato original anterior.
    originalFact = '';
    // Limpa a tradução anterior.
    currentTranslatedFact = '';

    // Bloco try...catch...finally para lidar com a requisição da API e possíveis erros.
    try {
        // Faz uma requisição GET para a API de fatos de gatos e aguarda a resposta.
        const response = await fetch(apiURL);
        // Verifica se a resposta da API foi bem-sucedida (status HTTP 200-299).
        if (!response.ok) {
            // Se a resposta não foi OK, lança um erro com detalhes do status HTTP.
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        // Converte o corpo da resposta (que é JSON) para um objeto JavaScript e aguarda a conversão.
        const data = await response.json();
        // Armazena o fato recebido (que está na propriedade 'fact' do objeto 'data') na variável 'originalFact'.
        originalFact = data.fact;
        // Exibe o fato original no elemento de texto da página.
        factTextElement.textContent = data.fact;
        // Habilita o botão de tradução, pois agora há um fato para traduzir.
        translateButtonElement.disabled = false;
    } catch (error) {
        // Se ocorrer um erro durante o 'try' (requisição ou processamento):
        // Registra o erro no console do navegador para depuração.
        console.error(`Erro ao buscar o fato: ${error}`);
        // Exibe uma mensagem de erro amigável para o usuário na página.
        factTextElement.textContent = 'Oops! Não consegui buscar um fato agora. Tente novamente mais tarde.'
    } finally {
        // Este bloco é executado sempre, independentemente de sucesso ou falha no 'try'.
        // Reabilita o botão de "novo fato".
        factButtonElement.disabled = false;
    };
}

// --- FUNÇÃO PARA LIDAR COM O CLIQUE NO BOTÃO DE TRADUÇÃO ---
// Função assíncrona para traduzir o fato para português ou mostrar o original em inglês.
async function handleTranslateClick() {
    // Se não houver um fato original carregado, a função não faz nada e retorna.
    if (!originalFact) return;

    // Desabilita o botão de tradução durante o processamento para evitar múltiplos cliques.
    translateButtonElement.disabled = true;

    // Verifica se o fato já está traduzido.
    if (isTranslated) {
        // Se já está traduzido, reverte para o fato original (em inglês).
        factTextElement.textContent = originalFact;
        // Atualiza o texto do botão para indicar que a próxima ação será traduzir.
        translateButtonElement.textContent = 'Traduzir para o português';
        // Define o estado como "não traduzido".
        isTranslated = false;
        // Reabilita o botão de tradução.
        translateButtonElement.disabled = false;
    } else {
        // Se não está traduzido, então traduz para o português.
        // Exibe uma mensagem de carregamento para a tradução.
        factTextElement.textContent = 'Traduzindo...';
        // Bloco try...catch...finally para lidar com a requisição da API de tradução.
        try {
            // Verifica se a tradução já foi feita e armazenada anteriormente.
            if (currentTranslatedFact) {
                // Se a tradução já existe, apenas a exibe.
                factTextElement.textContent = currentTranslatedFact;
            } else {
                // Se não há tradução armazenada, busca na API.
                // Prepara os parâmetros da URL para a API de tradução:
                // 'q' é o texto a ser traduzido (o fato original, codificado para URL).
                // 'langpair' define o par de idiomas: 'en' (inglês) para 'pt-BR' (português brasileiro).
                const queryParams = `?q=${encodeURIComponent(originalFact)}&langpair=en|pt-BR`;
                // Faz a requisição GET para a API de tradução, concatenando a URL base com os parâmetros, e aguarda a resposta.
                const response = await fetch(translateApiUrl + queryParams);

                // Verifica se a resposta da API de tradução foi bem-sucedida.
                if (!response.ok) {
                    // Se não foi OK, lança um erro com detalhes do status HTTP da API de tradução.
                    throw new Error(`Erro HTTP Translate API: ${response.status} - ${response.statusText}`);
                }

                // Converte a resposta JSON da API de tradução para um objeto JavaScript.
                const translationData = await response.json();

                // Verifica se a API retornou os dados esperados e o texto traduzido.
                if (translationData.responseData && translationData.responseData.translatedText) {
                    // Armazena o texto traduzido na variável 'currentTranslatedFact'.
                    currentTranslatedFact = translationData.responseData.translatedText;
                    // Exibe o texto traduzido na página.
                    factTextElement.textContent = currentTranslatedFact;
                } else if (translationData.responseStatus && translationData.responseStatus !== 200) {
                    // A API MyMemory pode retornar status 200 mas com um erro interno (indicado por responseStatus).
                    throw new Error(`Erro da API de Tradução: ${translationData.responseDetails || 'Detalhes não fornecidos'}`);
                } else {
                    // Se a resposta não tiver o formato esperado ou a tradução falhar por outro motivo.
                    throw new Error('Resposta da API de tradução em formato inesperado ou tradução falhou');
                }
            }
            // Após traduzir (ou usar a tradução armazenada):
            // Atualiza o texto do botão para indicar que a próxima ação será mostrar o original.
            translateButtonElement.textContent = 'Mostrar original (inglês)';
            // Define o estado como "traduzido".
            isTranslated = true;
        } catch (error) {
            // Se ocorrer um erro durante a tentativa de tradução:
            // Registra o erro de tradução no console.
            console.error(`Erro ao traduzir: ${error}`);
            // Em caso de erro na tradução, exibe o fato original como fallback.
            factTextElement.textContent = originalFact;
            // Reseta o texto do botão de tradução para o estado inicial.
            translateButtonElement.textContent = 'Traduzir para o português';
            // Garante que o estado de tradução seja 'false' após um erro.
            isTranslated = false;
        } finally {
            // Este bloco é executado sempre, após o 'try' ou 'catch' da tradução.
            // Reabilita o botão de tradução.
            translateButtonElement.disabled = false;
        };
    }
}

// --- OUVINTES DE EVENTO (EVENT LISTENERS) ---
// Adiciona um ouvinte de evento ao botão 'factButtonElement'.
// Quando o botão for clicado, a função 'fetchAndDisplayCatFact' será executada.
factButtonElement.addEventListener(('click'), fetchAndDisplayCatFact);
// Adiciona um ouvinte de evento ao botão 'translateButtonElement'.
// Quando o botão for clicado, a função 'handleTranslateClick' será executada.
translateButtonElement.addEventListener('click', handleTranslateClick);