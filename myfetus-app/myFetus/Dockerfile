FROM node:20-alpine
WORKDIR /app
COPY package.json ./ 
# FORCED_REBUILD_V3
RUN yarn install --frozen-lockfile --network-timeout 100000
COPY . .
EXPOSE 19000 19001 19002
CMD ["yarn", "start", "-c"]
