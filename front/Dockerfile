FROM node:18-alpine

EXPOSE 3131

WORKDIR /

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]