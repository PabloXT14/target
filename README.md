<h1 align="center">
  <img
    src=".github/target-logo.png"
    title="target"
    alt="target"
    width="100px"
  />

  Target
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/pabloxt14/target">

  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/pabloxt14/target" />

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/pabloxt14/target">
  
  <a href="https://github.com/pabloxt14/target/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/pabloxt14/target">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">

   <a href="https://github.com/pabloxt14/target/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/pabloxt14/target?style=social">
  </a>
</p>

<p>
  <img src=".github/cover.png" alt="Capa do projeto" />
</p>

<!-- <h4 align="center"> 
	🚀 Aplicação finalizada 🚀
</h4> -->

<p align="center">
 <a href="#-about">About</a> | 
 <a href="#-layout">Layout</a> | 
 <a href="#-setup">Setup</a> | 
 <a href="#-technologies">Technologies</a> | 
 <a href="#-license">License</a>
</p>


## 💻 About

Esta aplicação de nome **target** consiste basicamente em um aplicativo mobile para controle de metas financeiras, onde o usuário pode criar, editar e excluir metas, além de poder criar e editar transações de cada meta respectivamente.

Os principais conhecimentos aplicados nesta aplicação foram:
- Utilização do `expo-router` como estratégia de roteamento;
- Utilização do `expo-sqlite` para salvar os dados no banco de dados local;

<!-- ## 🔗 Deploy

O deploy da aplicação pode ser acessada através da seguinte URL base: https://pabloxt14-nlw-expert-notes.vercel.app/ -->


## 🎨 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/community/file/1519783658558360825/target). É necessário ter conta no [Figma](https://www.figma.com/) para acessá-lo.

A seguir, veja uma demonstração das principais telas da aplicação:

### Home

<p align="center">
  <img
    src=".github/screens/home.png"
    alt="Home Screen"
    title="Home Screen"
  />
</p>

### New Target

<p align="center">
  <img
    src=".github/screens/new-target.png"
    alt="New Target Screen"
    title="New Target Screen"
  />
</p>

### Edit Target

<p align="center">
  <img
    src=".github/screens/edit-target.png"
    alt="Edit Target Screen"
    title="Edit Target Screen"
  />
</p>

### In Progress

<p align="center">
  <img
    src=".github/screens/in-progress.png"
    alt="In Progress Screen"
    title="In Progress Screen"
  />
</p>

### New Transaction

<p align="center">
  <img
    src=".github/screens/new-transaction.png"
    alt="New Transaction Screen"
    title="New Transaction Screen"
  />
</p>

### Edit Transaction

<p align="center">
  <img
    src=".github/screens/edit-transaction.png"
    alt="Edit Transaction Screen"
    title="Edit Transaction Screen"
  />
</p>


## ⚙ Setup

### 📝 Requisites

Antes de baixar o projeto você vai precisar ter instalado na sua máquina as seguintes ferramentas:

* [Git](https://git-scm.com)
* [NodeJS](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Cloning and Running

Passo a passo para clonar e executar a aplicação na sua máquina:

```bash
# Clone este repositório
$ git clone git@github.com:pabloxt14/target.git

# Acesse a pasta do projeto no terminal
$ cd target

# Instale as dependências
$ npm install

# Gerar o build
$ npx expo prebuild

# Execute a aplicação em modo de desenvolvimento (Expo Go)
$ npm run start

# Execute a aplicação em modo de desenvolvimento (Android)
$ npx expo run:android

# Execute a aplicação em modo de desenvolvimento (iOS)
$ npx expo run:ios
```


## 🛠 Technologies

As seguintes principais ferramentas foram usadas na construção do projeto:

- **[React Native](https://reactnative.dev/)**
- **[Expo](https://expo.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Expo Router](https://docs.expo.dev/router/introduction/)**
- **[Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)**
- **[Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)**
- **[Expo Font](https://docs.expo.dev/versions/latest/sdk/font/)**
- **[react-native-currency-input](https://www.npmjs.com/package/react-native-currency-input)**
- **[Dayjs](https://day.js.org/)**

> Para mais detalhes das dependências gerais da aplicação veja o arquivo [package.json](./package.json)


## 📝 License

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais informações

<p align="center">
  Feito com 💜 por Pablo Alan 👋🏽 <a href="https://www.linkedin.com/in/pabloalan/" target="_blank">Entre em contato!</a>  
</p>