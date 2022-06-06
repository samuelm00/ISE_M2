FROM node:lts-buster as builder

WORKDIR /app/server/src 

RUN npm i -g npm@latest

COPY package*.json ./ 
RUN npm install  
COPY . .

RUN npx --yes nx build server 

FROM node:lts-alpine as runner

WORKDIR /app/frontend/src 

COPY --from=builder /app/server/src/node_modules ./node_modules
COPY --from=builder /app/server/src/dist/apps/server .

# Used to wait unitl the DB's are ready
ENV NODE_ENV=production
ENV WAIT_VERSION 2.9.0
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

EXPOSE 3000 

CMD /wait && node main.js 