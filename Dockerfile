FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD [ "npm", "run", "start:dev" ]