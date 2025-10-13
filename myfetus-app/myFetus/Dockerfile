# Imagem base leve e atual
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Dependências necessárias para compilar pacotes nativos
RUN apk add --no-cache python3 make g++ bash git

# Copiar arquivos de dependências primeiro (para aproveitar cache)
COPY package.json yarn.lock ./

# Instalar dependências com cache limpo
RUN yarn cache clean && yarn install --frozen-lockfile --network-timeout 100000

# Copiar o restante do código
COPY . .

# Corrigir permissões (alguns erros do Expo no Alpine vêm disso)
RUN chmod -R 777 /app

# Executar o script de correção do arquivo bugado do expo-router
RUN if [ -f node_modules/@expo/cli/static/template/+native-intent.ts ]; then \
      mv node_modules/@expo/cli/static/template/+native-intent.ts node_modules/@expo/cli/static/template/native-intent.ts; \
    fi

# Expor as portas do Expo
EXPOSE 19000 19001 19002 8081

# Iniciar o Expo com limpeza de cache
CMD ["yarn", "start", "-c"]
