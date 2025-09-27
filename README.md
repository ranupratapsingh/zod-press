# Introduction

This project is a boilerplate for backend microservice providing REST APIs using express. This will use zod as validations and drizzle as ORM. TypeScript and will use [bun.sh][1] as runtime.

This will have following features

- Validates Auth Token using ORY hydra as Oauth2.0 Provider Server
- REST level 2 API serializations
- Payload Validations using Zod

## installing dependencies

- Install bun/nodejs and make sure it is in path

## run the project

Make sure to create a .env file taking inspiration from .env.sample in the project root and run

    bun install
    bun index.ts

## Using Drizzle as ORM

We are using [Drizzle][2] as ORM with MySSQL DB.
Follow this official [drizzle documentation][3] for drizzle usage.

# Observability

For observability it can use any opentelemetry compliant backend like elastic-apm or jeager.
We'll have to make some changes in `config/initializers/otel_sdk.js` so that you use OTLP exporter
instead of console exporter and make use of following env variables.

- OTEL_EXPORTER_OTLP_ENDPOINT
- NODE_ENV

## folder structure

This follows MVC structure. There are top 4 folders.

- app - for code
- config - for config
- lib - for additional code
- log - for logs

[1]: bun.com
[2]: https://orm.drizzle.team/
[3]: https://orm.drizzle.team/docs/get-started/mysql-new
