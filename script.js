// Seleciona os elementos do DOM
const factTextElement = document.getElementById('factText');
const factButtonElement = document.getElementById('factButton');
const translateButtonElement = document.getElementById('translateButton');

// URL da API
const apiURL = 'https://catfact.ninja/fact';
const translateApiUrl = 'https://api.mymemory.translated.net/get';

// Variáveis de estado
// Para armazenar o fato original em inglês
let originalFact = '';
// Para rastrear se o fato está traduzido
let isTranslated = false;
// Para armazenar o fato traduzido
let currentTranslatedFact = '';

// Função para buscare exibir o fato
async function fetchAndDisplayCatFact() {
    // Mostra uma mensagem de carregamento
    factTextElement.textContent = 'Buscando um fato interessante...';
    // Desativa o botão durante a requisição
    factButtonElement.disabled = true; 
    // Desativa o botão de tradução ao buscar novo fato
    translateButtonElement.disabled = true; 
    // Resetar o texto do botão
    translateButtonElement.textContent = 'Traduzir para o português';
    // Resetar o estado da tradução
    isTranslated = false;
    originalFact = '';
    currentTranslatedFact = '';

    try {
        // Fazer a requisição para a API usando 'fecth'
        // 'await' pausa a execução até a 'Primise' ser resolvida
        const response = await fetch(apiURL);

        // Verificar se a requisição foi bem-sucedida (status 200-299)
        if (!response.ok) {
            // Se não foi 'OK', lançar o erro para ser pego pelo bloco 'catch'
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        // Converte a resposta para 'JSON'
        // 'await' pausa a execução até a 'Promise' ser resolvida
        const data = await response.json();

        // Armazena o fato original
        originalFact = data.fact;

        // Exibe o fato na página
        // A API retorna um objeto com uma propriedade 'fact'
        factTextElement.textContent = data.fact;

        // Reativa o botão de tradução
        translateButtonElement.disabled = false;
    } catch (error) {
        // 'catch' lida com erros (problemas de rede, erro da API, etc.)
        console.error(`Erro ao buscar o fato: ${error}`);
        factTextElement.textContent = 'Oops! Não consegui buscar um fato agora. Tente novamente mais tarde.'
    } finally {
        // Reativa o botão, independentemente de sucesso ou falha
        factButtonElement.disabled = false;
    };
}

// Função para traduzir o fato ou mostrar o original
async function handleTranslateClick() {
    // Não faz nada se não houver fato original
    if (!originalFact) return;

    // Desativa o botão de tradução durante a execução
    translateButtonElement.disabled = true;

    // Verifica se o fato foi traduzido ou não, e executa a lógica
    if (isTranslated) {
        // Se já traduzido, mostrar o original
        factTextElement.textContent = originalFact;
        translateButtonElement.textContent = 'Traduzir para o português';
        isTranslated = false;
        translateButtonElement.disabled = false;
    } else {
        // Se não está traduzido, traduz para o português
        factTextElement.textContent = 'Traduzindo...';
        try {
            // Se já temos a tradução, não precisamos buscar de novo
            if (currentTranslatedFact) {
                factTextElement.textContent = currentTranslatedFact;
            } else {
                // Montar a URL da API de tradução
                // 'encodeURIComponent' é importante para tratar caracteres especiais no texto
                const queryParams = `?q=${encodeURIComponent(originalFact)}&langpair=en|pt-BR`;
                const response = await fetch(translateApiUrl + queryParams);

                if (!response.ok) {
                    throw new Error(`Erro HTTP Translate API: ${response.status} - ${response.statusText}`);
                }

                const translationData = await response.json();

                // Verifica se a tradução foi bem sucedida e se o texto traduzido existe
                if (translationData.responseData && translationData.responseData.translatedText) {
                    currentTranslatedFact = translationData.responseData.translatedText;
                    factTextElement.textContent = currentTranslatedFact;
                } else if (translationData.responseStatus && translationData.responseStatus !== 200) {
                    // A API MyMemory pode retornar um status 200 mas com um erro interno
                    throw new Error(`Erro da API de Tradução: ${translationData.responseDetails || 'Detalhes não fornecidos'}`);
                } else {
                    throw new Error('Resposta da API de tradução em formato inesperado ou tradução falhou');
                }
            }

            translateButtonElement.textContent = 'Mostrar original (inglês)';
            isTranslated = true;
        } catch (error) {
            console.error(`Erro ao traduzir: ${error}`);
            // Mostrar o fato original em caso de erro na tradução
            factTextElement.textContent = originalFact;
            translateButtonElement.textContent = 'Traduzir para o português';
            // Garante que o estado reflita a falha
            isTranslated = false;
        } finally {
            translateButtonElement.disabled = false;
        };
    }
}

// Adiciona um ouvinte de evento no botão
factButtonElement.addEventListener(('click'), fetchAndDisplayCatFact);
translateButtonElement.addEventListener('click', handleTranslateClick);

// Busca um fato assim que a página é carregada (opcional)
// fetchAndDisplayCatFact();