### Prisma Setup Using existing database that generated before

    npm install prisma --save-dev

    npx prisma init

# introspection

    npx prisma db pull

# Baseline your database

    mkdir -p prisma/migrations/0_init

Next, generate the migration file with prisma migrate diff. Use the following arguments:

--from-empty: assumes the data model you're migrating from is empty
--to-schema-datamodel: the current database state using the URL in the datasource block
--script: output a SQL script

    npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql

    npm install @prisma/client
