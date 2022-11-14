FROM nginx:latest
RUN apt -y update
COPY . /var/www/html/
EXPOSE 8080
