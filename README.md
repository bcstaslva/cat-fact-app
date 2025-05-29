```markdown
# Cat Facts App - v0.1

Bem-vindo ao Cat Facts App! Esta é uma aplicação web simples que busca e exibe fatos aleatórios e interessantes sobre gatos.

## Visão Geral

A aplicação consiste em uma página HTML que permite ao usuário clicar em um botão para obter um novo fato sobre gatos. O fato é obtido de uma API pública e exibido dinamicamente na página.

## Funcionalidades (v0.1)

*   Busca um fato aleatório sobre gatos ao clicar em um botão.
*   Exibe o fato na interface do usuário.
*   Interface simples e limpa.
*   Feedback visual durante o carregamento do fato.
*   Tratamento básico de erros caso a API não responda ou ocorra um problema na requisição.

## Tecnologias Utilizadas

*   **HTML5:** Estrutura da página.
*   **CSS3:** Estilização básica para uma melhor apresentação.
*   **JavaScript (Vanilla JS):**
    *   Manipulação do DOM (Document Object Model) para interagir com os elementos HTML.
    *   Gerenciamento de eventos (clique do botão).
    *   Utilização da `Fetch API` para realizar requisições HTTP assíncronas.
    *   Uso de `async/await` para lidar com Promises de forma mais legível.

## API Utilizada

*   **Cat Fact Ninja:** `https://catfact.ninja/fact`
    *   Esta API fornece fatos aleatórios sobre gatos em formato JSON. Não requer autenticação para uso básico.

## Como Executar

1.  Clone este repositório (ou baixe os arquivos).
2.  Certifique-se de que os arquivos `index.html`, `style.css`, e `script.js` estejam na mesma pasta.
3.  Abra o arquivo `index.html` em qualquer navegador web moderno (Chrome, Firefox, Edge, Safari, etc.).
4.  Clique no botão "Novo Fato!" para ver a mágica acontecer.

## Estrutura do Projeto

```
cat-facts-app/
├── index.html      # Estrutura principal da página
├── style.css       # Arquivo de estilos visuais
└── script.js       # Lógica da aplicação (busca e exibição dos fatos)
```

## Próximos Passos (Ideias para futuras versões)

*   Adicionar funcionalidade de tradução para os fatos.
*   Permitir que o usuário escolha o idioma do fato.
*   Salvar fatos favoritos localmente (usando LocalStorage).
*   Melhorar a interface do usuário.

## Contribuição

Sinta-se à vontade para fazer um fork do projeto, criar branches e enviar Pull Requests com melhorias ou novas funcionalidades!

---

Divirta-se aprendendo sobre gatos! 😺
```