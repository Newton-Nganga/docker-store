#!/usr/bin/make

# Include environment variables from .env
include .env

# Colors for terminal output
COLOR_RESET = \033[0m
COLOR_INFO = \033[32m
COLOR_WARN = \033[33m

# Docker Compose Commands
up:
	@echo "$(COLOR_INFO)Starting Docker containers...$(COLOR_RESET)"
	docker-compose up -d

down:
	@echo "$(COLOR_INFO)Stopping Docker containers...$(COLOR_RESET)"
	docker-compose down

build:
	@echo "$(COLOR_INFO)Building Docker containers...$(COLOR_RESET)"
	docker-compose build

restart:
	@echo "$(COLOR_INFO)Restarting Docker containers...$(COLOR_RESET)"
	docker-compose restart

# Shell Access
shell:
	@echo "$(COLOR_INFO)Opening shell as root in app container...$(COLOR_RESET)"
	docker-compose exec -u root php bash

# Logs
logs:
	@echo "$(COLOR_INFO)Showing logs from all containers...$(COLOR_RESET)"
	docker-compose logs -f

php-logs:
	@echo "$(COLOR_INFO)Showing PHP container logs...$(COLOR_RESET)"
	docker-compose logs -f php

caddy-logs:
	@echo "$(COLOR_INFO)Showing Caddy server logs...$(COLOR_RESET)"
	docker-compose logs -f caddy

mysql-logs:
	@echo "$(COLOR_INFO)Showing MySQL logs...$(COLOR_RESET)"
	docker-compose logs -f mysql

redis-logs:
	@echo "$(COLOR_INFO)Showing Redis logs...$(COLOR_RESET)"
	docker-compose logs -f redis

# Laravel Commands
composer-install:
	@echo "$(COLOR_INFO)Installing Composer dependencies...$(COLOR_RESET)"
	docker-compose exec php composer install

npm-install:
	@echo "$(COLOR_INFO)Installing NPM dependencies...$(COLOR_RESET)"
	docker-compose exec php npm install

migrate:
	@echo "$(COLOR_INFO)Running database migrations...$(COLOR_RESET)"
	docker-compose exec php php artisan migrate

fresh:
	@echo "$(COLOR_INFO)Refreshing database with fresh migrations...$(COLOR_RESET)"
	docker-compose exec php php artisan migrate:fresh

seed:
	@echo "$(COLOR_INFO)Seeding database...$(COLOR_RESET)"
	docker-compose exec php php artisan db:seed

cache:
	@echo "$(COLOR_INFO)Clearing Laravel cache...$(COLOR_RESET)"
	docker-compose exec php php artisan cache:clear
	docker-compose exec php php artisan config:clear
	docker-compose exec php php artisan route:clear
	docker-compose exec php php artisan view:clear

# PHP Extension Management
php-ext-install:
	@echo "$(COLOR_INFO)Installing PHP extension: $(ext)$(COLOR_RESET)"
	docker-compose exec -u root php docker-php-ext-install $(ext)

php-ext-enable:
	@echo "$(COLOR_INFO)Enabling PHP extension: $(ext)$(COLOR_RESET)"
	docker-compose exec -u root php docker-php-ext-enable $(ext)

# Help
help:
	@echo "Available commands:"
	@echo "  make up              - Start Docker containers"
	@echo "  make down            - Stop Docker containers"
	@echo "  make build           - Build Docker containers"
	@echo "  make restart         - Restart Docker containers"
	@echo "  make shell           - Open shell as root in app container"
	@echo "  make logs            - Show logs from all containers"
	@echo "  make php-logs        - Show PHP container logs"
	@echo "  make caddy-logs      - Show Caddy server logs"
	@echo "  make mysql-logs      - Show MySQL logs"
	@echo "  make redis-logs      - Show Redis logs"
	@echo "  make composer-install - Install Composer dependencies"
	@echo "  make npm-install     - Install NPM dependencies"
	@echo "  make migrate         - Run database migrations"
	@echo "  make fresh           - Refresh database with fresh migrations"
	@echo "  make seed            - Seed database"
	@echo "  make cache           - Clear Laravel cache"
	@echo "  make php-ext-install ext=<extension> - Install PHP extension"
	@echo "  make php-ext-enable ext=<extension>  - Enable PHP extension"