<!-- LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Dtesch9/fastfeet">
    <img src="https://i.imgur.com/UP8yGBg.png" alt="Logo">
  </a>

  <h3 align="center">By Douglas Tesch</h3>
</p>
<br />

## References

- [References](#references)
- [About the Project](#about-the-project)
- [Backend](#backend)
  - [Tecnologies](#tecnologies)
  - [Requirements](#requirements)
  - [Install](#install)
  - [Run](#run)

<!-- ABOUT THE PROJECT -->

## About the Project

O serviço de entregas FastFeet é uma aplicação semelhante aos corrêios. Administrador parte (web) e funcionarios/entregadore parte (mobile) consumindo API própria.

## Backend

A RESTful API using Node.js with Express

## 🚀 Tecnologies

- ⚡ Express — A web framework for Node.js
- 💾 Sequelize — SQL dialect ORM for Node.js

## ✋🏻 Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)

## 🔥 Install

1. Faça um clone desse repositório;
2. Entre na pasta `cd fastfeet`;
3. Run `$ yarn` to install dependencies;
4. Copy .envexample inside a .env then insert with your informations;
5. Run `$ yarn sequelize db:create` to create the database;
6. Run `$ yarn sequelize db:migrate` to run all migrations;
7. Run `$ yarn sequelize db:seed:all` to run all seeds;

## 🔥 Run
1. Run `$ yarn queue` to run all background jobs;
2. Run `$ yarn dev` to run the server.

