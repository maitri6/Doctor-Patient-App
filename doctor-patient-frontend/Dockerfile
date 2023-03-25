#FROM node:6.11.1 as build-step

FROM node:14.20-alpine as build-step

WORKDIR /app



COPY  ./ /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)


# Install any needed packages


# Bundle app source
#RUN npm i -g node@6.11.1 && npm i -g npm@3.10.9
#RUN npm install -g npm@3.10.9

RUN npm i

RUN npm run build



FROM nginx:1.21.1-alpine

WORKDIR /usr/share/nginx/html

#COPY --from=build-step /app/dist/doctor-patient-frontend .

COPY --from=build-step . .

COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
