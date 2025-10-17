FROM node:20-alpine
WORKDIR /app
COPY myFetus/package.json myFetus/yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 100000
COPY myFetus/ ./
EXPOSE 19000 19001 19002
CMD ["npx", "expo", "start", "--tunnel"]
