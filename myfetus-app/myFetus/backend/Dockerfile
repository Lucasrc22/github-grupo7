FROM node:20-alpine

WORKDIR /app

# Copiar package.json e yarn.lock (se existir)
COPY package.json yarn.lock ./

# Dependências para builds nativos
RUN apk add --no-cache python3 make g++ bash git libc6-compat


# Instalar dependências
RUN yarn install --network-timeout 100000

# Copiar todo o backend
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
