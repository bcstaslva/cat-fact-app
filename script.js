// Seleciona os elementos do DOM
const factTextElement = document.getElementById('factText');
const factButtonElement = document.getElementById('factButton');

// URL da API
const apiURL = 'https://catfact.ninja/fact';

// Função para buscare exibir o fato
async function fetchAndDisplayCatFact() {
    // Mostra uma mensagem de carregamento
    factTextElement.textContent = 'Buscando um fato interessante...';
    // Desativa o botão durante a requisição
    factButtonElement.disabled = true; 

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

        // Exibe o fato na página
        // A API retorna um objeto com uma propriedade 'fact'
        factTextElement.textContent = data.fact;
    } catch (error) {
        // 'catch' lida com erros (problemas de rede, erro da API, etc.)
        console.error(`Erro ao buscar o fato: ${error}`);
        factTextElement.textContent = 'Oops! Não consegui buscar um fato agora. Tente novamente mais tarde.'
    } finally {
        // Reativa o botão, independentemente de sucesso ou falha
        factButtonElement.disabled = false;
    };
};

// Adiciona um ouvinte de evento no botão
factButtonElement.addEventListener(('click'), fetchAndDisplayCatFact);

// Busca um fato assim que a página é carregada (opcional)
// fetchAndDisplayCatFact();