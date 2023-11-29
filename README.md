# LibSQL Server test

This is an understanding project on how LibSQL server works. You can use this sample to run a full fledged replicated SQLITE on Kubernetes. This example contains a [docker-compose.yml]('./docker-compose.yml') for deploying a main and replica database and uses Drizzle ORM for querying the table. There's a simple `todos` table created to test the functionality out.

Authorisation has also been implemented using JWT signing and that can be found in the [utils](./utils) folder. This make sure that the database is protected.

## Prereequisites

- Node v18 LTS or above
- PNPM
- Docker

Things to experiment with:

- [ ] Check out S3 replication
- [ ] Load test with multiple replicas
