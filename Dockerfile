FROM node:14-alpine as build
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install -g @angular/cli
CMD ng serve --host 0.0.0.0


#RUN npm run build --prod

#FROM php:7.2.11-apache
#COPY --from=build /app/dist/admin-pro /var/www/html
#RUN service apache2 restart
#WORKDIR /var/www/html/
#EXPOSE 80

