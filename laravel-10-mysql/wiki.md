# Docker Environment Documentation

## Directory Structure

```
.
├── docker/
│   ├── caddy/
│   │   └── Caddyfile          # Caddy server configuration
│   ├── mysql/
│   │   └── my.cnf             # MySQL configuration
│   └── php/
│       ├── Dockerfile         # PHP-FPM Dockerfile
│       └── local.ini          # PHP configuration
├── logs/                      # Log files directory
├── docker-compose.yml         # Docker Compose configuration
├── Makefile                   # Make commands for easy management
└── wiki.md                    # This documentation file
```

## Components

### 1. PHP (8.2-FPM)
- Custom PHP image with essential extensions
- Composer pre-installed
- NodeJS and NPM included
- Optimized for Laravel development

### 2. Caddy Server
- Modern, fast, and secure web server
- Automatic HTTPS
- Configured for PHP-FPM
- Access logs in JSON format

### 3. MySQL (8.0)
- Optimized configuration
- UTF8MB4 character set
- Persistent data storage
- Exposed on port 3306

### 4. Redis
- Alpine-based for minimal footprint
- Persistent data storage
- Used for caching and queues

## Usage

### Basic Commands

1. Start the environment:
```bash
make up
```

2. Access shell as root:
```bash
make shell
```

3. View logs:
```bash
make logs        # All containers
make php-logs    # PHP container only
make caddy-logs  # Caddy server logs
```

### PHP Extension Management

1. Install new extension:
```bash
make php-ext-install ext=<extension_name>
```

2. Enable extension:
```bash
make php-ext-enable ext=<extension_name>
```

### Development Commands

1. Install dependencies:
```bash
make composer-install
make npm-install
```

2. Database operations:
```bash
make migrate  # Run migrations
make fresh    # Fresh migration
make seed     # Seed database
```

3. Cache management:
```bash
make cache  # Clear all Laravel cache
```

## Logging System

- All containers use JSON file logging
- Log rotation enabled (max 200KB per file, 10 files max)
- Logs accessible via make commands
- Caddy access logs stored in `/logs/caddy/`

## Performance Optimizations

1. PHP
- OpCache enabled and configured
- Optimized memory limits
- Configured upload limits

2. MySQL
- Optimized configuration for development
- UTF8MB4 character set for full Unicode support

3. Redis
- Alpine-based for minimal footprint
- Persistent storage configured

## Adding to Existing Project

1. Copy the following files/directories to your project root:
- `docker/` directory
- `docker-compose.yml`
- `Makefile`

2. Configure environment variables in your `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
REDIS_HOST=redis
```
NB : dont use "root" as the database usename

3. Start the environment:
```bash
make up
```

## Connecting to the mysql database in GUI 

```bash
DB_HOST=localhost
DB_PORT=3306 
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```