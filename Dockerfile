FROM node:buster
WORKDIR /app
COPY package.json package-lock.json ./
#RUN apt-get install libcurl4

RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start"]