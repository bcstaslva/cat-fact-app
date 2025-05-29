# Cat Facts App - v0.2

Bem-vindo ao Cat Facts App! Esta é uma aplicação web simples que busca fatos aleatórios e interessantes sobre gatos e permite ao usuário traduzi-los para Português Brasileiro.

## Visão Geral

A aplicação consiste em uma página HTML que permite ao usuário clicar em um botão para obter um novo fato sobre gatos. O fato é obtido de uma API pública. Um segundo botão permite que o usuário traduza o fato para Português Brasileiro ou reverta para o idioma original (Inglês).

## Funcionalidades (v0.2)

*   Busca um fato aleatório sobre gatos (em Inglês) ao clicar em um botão.
*   Exibe o fato na interface do usuário.
*   **Tradução do fato obtido para Português Brasileiro** ao clicar em um botão dedicado.
*   **Alternância entre o fato original (Inglês) e sua tradução** com o mesmo botão.
*   Interface simples e limpa.
*   Feedback visual durante o carregamento do fato e da tradução.
*   Tratamento básico de erros caso as APIs não respondam ou ocorra um problema na requisição.

## Tecnologias Utilizadas

*   **HTML5:** Estrutura da página.
*   **CSS3:** Estilização básica para uma melhor apresentação.
*   **JavaScript (Vanilla JS):**
    *   Manipulação do DOM (Document Object Model) para interagir com os elementos HTML.
    *   Gerenciamento de eventos (cliques dos botões).
    *   Utilização da `Fetch API` para realizar requisições HTTP assíncronas.
    *   Uso de `async/await` para lidar com Promises de forma mais legível.
    *   Gerenciamento de estado simples para controlar a exibição do fato (original/traduzido).

## APIs Utilizadas

1.  **Cat Fact Ninja:** `https://catfact.ninja/fact`
    *   Esta API fornece fatos aleatórios sobre gatos em formato JSON (geralmente em Inglês). Não requer autenticação para uso básico.
2.  **MyMemory API:** `https://api.mymemory.translated.net/get`
    *   Utilizada para traduzir os fatos de Inglês (EN) para Português Brasileiro (PT-BR). Não requer autenticação para uso básico.

## Como Executar

1.  Clone este repositório (ou baixe os arquivos).
2.  Certifique-se de que os arquivos `index.html`, `style.css`, e `script.js` estejam na mesma pasta.
3.  Abra o arquivo `index.html` em qualquer navegador web moderno (Chrome, Firefox, Edge, Safari, etc.).
4.  Clique no botão "Novo Fato!" para buscar um fato.
5.  Após o fato ser carregado, clique no botão "Traduzir para PT-BR" para ver a tradução. Clique novamente para ver o original.

## Estrutura do Projeto


cat-facts-app/
├── index.html # Estrutura principal da página
├── style.css # Arquivo de estilos visuais
└── script.js # Lógica da aplicação (busca, tradução e exibição)

## Próximos Passos (Ideias para futuras versões)

*   Permitir que o usuário escolha o idioma de destino para a tradução (além de PT-BR).
*   Salvar fatos favoritos localmente (usando LocalStorage).
*   Melhorar a interface do usuário com animações ou um design mais elaborado.
*   Adicionar a opção de compartilhar o fato nas redes sociais.

## Contribuição

Sinta-se à vontade para fazer um fork do projeto, criar branches e enviar Pull Requests com melhorias ou novas funcionalidades!

---

Divirta-se aprendendo sobre gatos, agora em dois idiomas! 😺🇧🇷