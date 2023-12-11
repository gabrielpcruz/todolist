FROM php:8.2-fpm
RUN pecl install xdebug redis
RUN docker-php-ext-enable xdebug
RUN docker-php-ext-enable opcache
RUN docker-php-ext-enable redis
RUN apt update && apt install -y zip vim
RUN docker-php-ext-install bcmath sockets mysqli pdo pdo_mysql
