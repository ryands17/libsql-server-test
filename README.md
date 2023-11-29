# LibSQL Server test

This is an understanding project on how LibSQL server works. You can use this sample to run a full fledged replicated SQLITE on Kubernetes. This example contains a [docker-compose.yml]('./docker-compose.yml') for deploying a main and replica database and uses Drizzle ORM for querying the table. There's a simple `todos` table created to test the functionality out.

Authorisation has also been implemented using JWT signing and that can be found in the [utils](./utils) folder. This make sure that the database is protected.

## Prereequisites

- Node v18 LTS or above
- PNPM
- Docker

## Setup

Create a `keys` directory to store the public key. To create public and private keys, run the following script:

```
node utils/generate-keys.js
```

The keys in the public folder will be shared with the SQLite databases to verify calls. The private key will be used by our script to create the JWT.

Next, create a JWT to be used with Drizzle to talk to the DB:

```
node utils/generate-token.js
```

Rename the `.env.example` file to `.env` and add the token obtained in the output of the above script to the `DB_AUTH_TOKEN` key. This will make sure that Drizzle can connect to the database securely.

## Commands

- dev: Run the test project with Drizzle in watch mode
- db:push - Push changes to the database directly
- build - Build the app for production
- start - Start the built production app
- studio - UI to interact with your database

Things to experiment with:

- [ ] Check out S3 replication
- [ ] Load test with multiple replicas
