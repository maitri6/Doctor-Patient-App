
FROM node:14-alpine

#RUN npm install --global nodemon

WORKDIR /app

COPY package.json  ./

RUN npm install
RUN npm install nodemon 

#RUN npm rebuild bcrypt 

COPY . .

EXPOSE 3003


CMD ["node","app.js"]
