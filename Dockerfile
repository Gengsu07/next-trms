FROM node:21 AS builder

# RUN apt update && apt-get install -y curl sudo
# RUN curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
#     sudo apt-get install -y nodejs
    
WORKDIR /app
COPY package*.json ./
RUN npm install


# FROM node:21 AS runner
# WORKDIR /app
# COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

RUN npm config set ignore-scripts false

ENV NODE_ENV production
COPY docker-bootstrap-app.sh .
RUN chmod +x docker-bootstrap-app.sh

# FROM node:21 as deploy
# WORKDIR /app

# COPY --from=runner /app/public ./public
# COPY --from=runner /app/package.json ./package.json
# COPY --from=runner /app/.next/standalone ./
# COPY --from=runner /app/.next/static ./.next/static
# COPY --from=runner /app/node_modules ./node_modules
# COPY --from=runner /app/prisma ./prisma
# COPY --from=runner /app/docker-bootstrap-app.sh .

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["./docker-bootstrap-app.sh"]
