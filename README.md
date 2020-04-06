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
  - [Some Hot Tecnologies](#-some-hot-tecnologies)
  - [Helpers development tools](#-helpers-development-tools)
  - [F-Install](#f-install-)
  - [F-Run](#f-run-)
  - [First Login](#first-login-heavy_check_mark)

  
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
- [reactotron-react-js](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-js.md)
- [reactotron-redux](https://github.com/infinitered/reactotron/blob/master/docs/plugin-redux.md)
- [reactotron-redux-saga](https://github.com/infinitered/reactotron/blob/master/docs/plugin-redux-saga.md)

## 🚀 Helpers development tools

- [Babel](https://babeljs.io/)
- [babel-eslint](https://github.com/babel/babel-eslint)
- [babel-plugin-root-import](https://github.com/entwicklerstube/babel-plugin-root-import)
- [ESLint](https://eslint.org/)
- [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)
- [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
- [eslint-import-resolver-babel-plugin-root-import](https://github.com/olalonde/eslint-import-resolver-babel-root-import)
- [Prettier](https://prettier.io/)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [EditorConfig](https://editorconfig.org/)
- [customize-cra](https://github.com/arackaf/customize-cra)
- [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks)
- [react-app-rewired](https://github.com/timarney/react-app-rewired)

## F Install 🔥

1. Go to `$ cd fastfeet/frontend`;
2. Run `$ yarn` to install dependencies;


## F Run 🔥 
1. Open another terminal, go to `$ cd fastfeet/backend`
2. Run `$ yarn dev` to start the server [Backend](#backend)
3. Run `$ yarn dev` to start the React APP

## First Login :heavy_check_mark:

**Login:**`admin@fastfeet.com`

**Password:**`123456`

![First Login](https://github.com/Dtesch9/fastfeet/blob/master/images/login.gif)

[Back to top](#references)
