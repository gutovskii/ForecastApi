## Description

Nest forecast application using PostgreSQL and Docker via openweathermap.org API

## Installation

```bash
$ npm install
```

## Running the app with Docker Compose

```bash
$ docker compose up
```

You can open PgAdmin4 panel on localhost:5050

## Running the app without Docker Compose

Change env variable POSTGRES_HOST to 'localhost'

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
