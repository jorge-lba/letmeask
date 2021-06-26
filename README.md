# Let Me Ask

![Home Let me ask](https://github.com/jorge-lba/letmeask/blob/main/readmeFiles/Pgina_inicial.png?raw=true)

Interaja com o seu público através do **LetMeAsk**, uma plataforma de gerenciamento de peguntas.

Com o **LetMeAsk**  você pode criar uma sala para receber perguntas do seu público e gerenciá-las através de um painel **administrador** podendo dar prioridade, finalizar e excluir perguntas.

Inicie agora essa nova experiencia acessando a nossa plataforma → **[LetMeAsk](https://dev-letmeask.herokuapp.com/)**

**obs.:** Este projeto foi desenvolvido durante a **<nlw/> together** organizada pela **[rocketseat](https://rocketseat.com.br/)**.

## 🧪 Tecnologias

Esse projeto foi desenvolvido utilizando as seguintes tecnologias:

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 🚀 Iniciando o projeto

Clone o projeto e acesse a pasta letmeask:

```
$ git clone <https://github.com/guilhermecapitao/letmeask.git>
$ cd letmeask
```

Siga os passos abaixo:

```
# Install the dependencies
$ yarn

# Start the project
$ yarn start
```

O aplicativo estará disponível para acesso em seu navegador em [http://localhost:3000](http://localhost:3000/)

## 🔖 Layout

Você pode ver o layout do projeto através do link abaixo:

- [Layout Web](https://www.figma.com/file/u0BQK8rCf2KgzcukdRRCWh/Letmeask/duplicate)

Lembrando que você precisa ter uma conta no [Figma](http://figma.com/) para acessar.

## 👨‍💻 Milha Extra

Aqui você vai ver algumas funcionalidades que desenvolvi para incrementar um pouco esse projeto.

- [x]  [Regras](https://gist.github.com/jorge-lba/86c1b697b0ebf3d9dbbd821d2faa1d71) mais restritas para o Firebase Realtime Database.
- [x]  Retorno visual ao copiar o código da sala:

    ![Efeito no botão copiar código da sala](https://github.com/jorge-lba/letmeask/blob/main/readmeFiles/clipboard-effect.gif?raw=true)

- [x]  Redirecionamento para a pagina de admin quando o usuário cria uma sala.
- [x]  Permitir que apenas o criador da sala acesse o painel admin.
- [x]  Redirecionar usuário que acesse painel admin de uma sala que não foi criada por eles.
- [x]  Permitir que o usuário que enviou a pergunta apague a mesma.
    - [x]  Não pode ser possível apagar perguntas destacadas.
    - [x]  Não pode ser possível apagar perguntas respondidas.
- [x]  Organizar order de prioridade com base na quantidade de likes.
- [x]  Colocar no topo as perguntas destacadas.
- [x]  Colocar no fim da lista as perguntas já respondidas.
- [x]  Remover perguntas respondidas da sala ( essa perguntas permanecem visíveis para o admim )
- [x]  Mostrar quantidade de likes para o admin.
- [ ]  Temas Light / Dark
    - [x]  Contexto
    - [ ]  Botão
    - [ ]  CSS