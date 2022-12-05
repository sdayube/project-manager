# Project Manager - React

Essa aplicação foi desenvolvida como desafio técnico para a empresa Fontes Promotora, referente à parte do front-end, em paralelo a uma [API desenvolvida em Node.js](https://github.com/sdayube/project-management-api).

Decidi por construir uma SPA com roteamento via React Router uma arquitetura simples baseada em páginas/componentes, buscando ainda ter componentes bem delimitados para facilitar a manutenção.

Utilizei o Vite como bundler/compilador por conta da sua velocidade se comparado ao Webpack, se tratando de uma ferramenta mais ágil e moderna para o desenvolvimento.

A autenticação é salva no localStorage do browser e mantida de forma global por meio de um custom hook que utiliza o ContextAPI para acessar os dados de autenticação sem precisar passá-los para cada componente.

A lógica de requisições foi separada em outro hook, e utiliza o framework Axios para executar as chamadas para o backend.

Como nao foi passado um padrão de design, para facilitar a estilização, utilizei a bilbioteca ChakraUI, que traz um design-system moderno, fluido e responsivo. Também fiz algumas alterações no tema padrão para que a aplicação tenha um fundo escuro.

Para inicializar a aplicação:
- Inicialize o back-end conforme as [instruções]{https://github.com/sdayube/project-management-api}
- Abra o terminal na pasta raiz
- Execute o comando `yarn install` para instalar as dependências do projeto
- Execute o comando `yarn dev` para rodar a aplicação
  - A **aplicação** irá rodar na porta **5173** do localhost por padrao
  - Caso a aplicaçao rode em outra porta, as requisições irao falhar por conta da política de acesso do back-end (CORS)
  

## Telas

### Login

Tela de login

placeholder

&nbsp;<br>

---
### Criação de Usuário

Tela de criação de usuário, implementada como modal

placeholder

&nbsp;<br>

---
### Projetos

Tela de projetos, que exibe os projetos do usuário logado

placeholder

&nbsp;<br>

---
### Detalhes de projeto

Modal de detalhes de um projeto específico

placeholder

&nbsp;<br>

---
### Edição de projeto

Modal de edição de um projeto já existente

placeholder

&nbsp;<br>

---
### Criação de projeto

Modal de criação de um projeto novo

placeholder

&nbsp;<br>

---