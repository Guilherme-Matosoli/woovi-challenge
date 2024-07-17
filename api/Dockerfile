FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

EXPOSE 3000

# Define the command to run the application
CMD ["node", "index.js"]
