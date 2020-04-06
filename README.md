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
- [Frontend](#frontend)
  - [Some Hot Tecnologies](#Some%20Hot%20Tecnologies-)

  
## About the Project

The delivery service FastFeet is an application similar to the post offices. Manager (web) and employees/delivery man (mobile) consuming it's own API.

## Backend

A RESTful API using Node.js with Express

## 🚀 Tecnologies

- ⚡ Express — A web framework for Node.js
- 💾 Sequelize — SQL dialect ORM for Node.js
- :computer: Sentry — An open-source platform to monitoring errors in real-time.
- :lock: Bcryptjs —  A library to handle password hash
- :honeybee: Bee-queue — A job/task queue for Node.js
- :fax: Cors — A protocol that enables interaction with resources from a different origin
- :alarm_clock: Date-fns — A library to deal with date and time
- :key: Jsonwebtoken — An internet standard for creating JSON-based access tokens
- :paperclip: Multer — A Node.js middleware for handling multipart/form-data
- :mailbox: Nodemailer — A module for Node.js to allow email sending
- :eyeglasses: Youch — Pretty error reporting for Node.js that helps erros to be easier to read
- :memo: Yup — A JavaScript schema builder for value parsing and validation

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
8. Import fastfeet-insomnia.json that is at the root of this repository inside [![Download Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/)


## Run 🔥 
1. Run `$ yarn queue` to run all background jobs;
2. Run `$ yarn dev` to run the server.

## Frontend

A ReactJS project created with `create react-app`

## 🚀 Some Hot Tecnologies 

- [Material UI](https://material-ui.com/)
- [Unform](https://unform.dev/)
- [Axios](https://github.com/axios/axios)
- [Date-fns](https://date-fns.org/)
- [Immer](https://github.com/immerjs/immer)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Prop-Types](https://reactjs.org/docs/typechecking-with-proptypes.html)
- [React Router Dom](https://reacttraining.com/react-router/web/guides/quick-start)
- [Redux](https://redux.js.org/)
- [React Redux](https://redux.js.org/basics/usage-with-react)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [Redux Saga](https://redux-saga.js.org/)
- [Styled Components](https://styled-components.com/)
- [Yup](https://github.com/jquense/yup)
- [React Select](https://react-select.com/home)
- [React Input Mask](https://github.com/sanniassin/react-input-mask)
- [Reactotron](https://github.com/infinitered/reactotron)
