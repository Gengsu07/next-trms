FROM node:21-alpine AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./

RUN npm install
# Rebuild bcrypt from source in the builder stage
# RUN npm rebuild bcrypt --build-from-source

# Ensure compatible Node.js version in builder stage (check version during build)
# RUN node -v

COPY . .
RUN npx prisma generate

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app ./
# COPY --from=builder /app/out ./out

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["npm", "start", "--prod"]
