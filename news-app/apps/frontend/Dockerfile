FROM node:lts-buster as builder

WORKDIR /app/frontend/src 

RUN npm i -g npm@latest

COPY package*.json ./ 
RUN npm install  
COPY . .

RUN npx --yes nx build frontend 

FROM node:lts-alpine as runner

WORKDIR /app/frontend/src 

COPY --from=builder /app/frontend/src/node_modules ./node_modules
COPY --from=builder /app/frontend/src/dist/apps/frontend .

ENV NODE_ENV=production

EXPOSE 3000 

CMD ["./node_modules/.bin/next", "start"] 

