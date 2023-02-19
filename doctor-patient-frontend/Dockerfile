FROM node:14-alpine as build-step

WORKDIR /app



COPY  ./ /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)


# Install any needed packages


# Bundle app source


RUN npm i

RUN npm run build


FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=build-step /app/dist/doctor-patient-frontend /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
