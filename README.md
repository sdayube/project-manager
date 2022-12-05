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

![image](https://user-images.githubusercontent.com/68237073/205665957-92ecb66a-9fa0-4f1f-aa9b-2a3a38968295.png)

&nbsp;<br>

---
### Criação de Usuário

Tela de criação de usuário, implementada como modal

![image](https://user-images.githubusercontent.com/68237073/205666135-57c346c1-54d0-44c5-87b7-d24b3c6cc6f4.png)

&nbsp;<br>

---
### Projetos

Tela de projetos, que exibe os projetos do usuário logado

![image](https://user-images.githubusercontent.com/68237073/205666358-51e93604-01a5-407c-b41e-f25bdbe7a114.png)

&nbsp;<br>

---
### Detalhes de projeto

Modal de detalhes de um projeto específico

![image](https://user-images.githubusercontent.com/68237073/205666524-b340abfb-839f-4903-bcf6-f5755c51dd69.png)

&nbsp;<br>

---
### Edição de projeto

Modal de edição de um projeto já existente

![image](https://user-images.githubusercontent.com/68237073/205666881-37fcb347-3c9d-4a70-aea4-bdf73228d4c2.png)

&nbsp;<br>

---
### Criação de projeto

Modal de criação de um projeto novo

![image](https://user-images.githubusercontent.com/68237073/205667263-af66191a-58f9-462b-81a6-6f17ce3a45ed.png)

&nbsp;<br>

---
