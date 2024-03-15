#docker-bootstrap-app.sh
#!/bin/sh
npx next telemetry disable
# npx prisma migrate dev --name init

echo "WAIT 5 Seconds for DB to available after init"
sleep 5
npx prisma db seed
echo "default user and password created"

npm run build
npm run start
# Run migrations
# DATABASE_URL="postgresql://postgres:postgres@db:5432/testDB" npx prisma migrate deploy
# DATABASE_URL="postgresql://postgres:postgres@db:5432/testDB" RUN npx prisma db seed
# # start app
# DATABASE_URL="postgresql://postgres:postgres@db:5432/testDB" npm run start