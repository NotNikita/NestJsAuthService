# NestJsAuthService

Small Nest.js microservice proof of concept to handle Authentification&amp;Authorization via GraphQL interface and PostgreSQL db.

## Prisma setup

- Create migration
  `pnpm prisma generate`
- Run migration
  `pnpm prisma migrate dev --name init`
- Connect to postgresql remote db and create new schema:
  `psql -h your-host -U your-user -d your-database`
  `\dn` to check schemas
  `\dt schema.*` to check tables in schema
