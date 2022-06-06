FROM node:latest
ENV NODE_ENV=production

WORKDIR /app 
COPY ["package.json", "package-lock.json", "./apps/server/project.json", "./"]

RUN npm install --production --silent && mv node_modules ../
COPY . . 

RUN npm install -g nx

RUN nx build server

ENV WAIT_VERSION 2.9.0
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

EXPOSE 3333 
CMD /wait && nx serve server