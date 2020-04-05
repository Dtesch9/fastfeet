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
  - [Tecnologies](#-tecnologies)
  - [Requirements](#requirements-)
  - [Install](#install-)
  - [Run](#run-)

<!-- ABOUT THE PROJECT -->

## About the Project

O serviço de entregas FastFeet é uma aplicação semelhante aos corrêios. Administrador parte (web) e funcionarios/entregadore parte (mobile) consumindo API própria.

## Backend

A RESTful API using Node.js with Express

## 🚀 Tecnologies

- ⚡ Express — A web framework for Node.js
- 💾 Sequelize — SQL dialect ORM for Node.js
- :computer: Sentry — An open-source platform to monitoring errors in real-time.
- :lock: bcryptjs —  A library to handle password hash
- :honeybee: bee-queue — A job/task queue for Node.js
- :fax: cors — A protocol that enables interaction with resources from a different origin
- :alarm_clock: date-fns — A library to deal with date and time
- :key: jsonwebtoken — An internet standard for creating JSON-based access tokens
- :paperclip: multer — A Node.js middleware for handling multipart/form-data
- :mailbox: nodemailer — A module for Node.js to allow email sending
- :eyeglasses: youch — Pretty error reporting for Node.js that helps erros to be easier to read
- :memo: yup — A JavaScript schema builder for value parsing and validation

## Requirements ✋🏻

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- [Postgresql](https://www.postgresql.org/)
- [Redis](https://redis.io/)

## Install 🔥

1. Clone this repository;
2. Go inside the folder `cd fastfeet`;
3. Run `$ yarn` to install dependencies;
4. Copy the content of `.env.example` inside a a new archive `.env` then insert your credentials;
5. Run `$ yarn sequelize db:create` to create the database;
6. Run `$ yarn sequelize db:migrate` to run all migrations;
7. Run `$ yarn sequelize db:seed:all` to run all seeds;

## Run 🔥 
1. Run `$ yarn queue` to run all background jobs;
2. Run `$ yarn dev` to run the server.

