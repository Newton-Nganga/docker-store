# Microservices Project Documentation

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Services](#services)
- [Security](#security)
- [Development](#development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)

## Overview

This project is a modern microservices-based application built with Node.js, React, and various supporting technologies. It provides a scalable and secure foundation for building web applications with features like authentication, file storage, and real-time updates.

## Architecture

### Core Components
- Frontend: React with Zustand for state management
- Backend: Express.js
- Database: PostgreSQL with Prisma ORM
- Caching: Redis
- File Storage: MinIO
- Real-time: Socket.IO
- Documentation: OpenAPI 3.0

### System Design
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  PostgreSQL │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                    ┌─────┴─────┐
              ┌─────┴─────┐     │
        ┌─────┴─────┐     │     │
        │   Redis   │   MinIO   │
        └───────────┘     │     │
              └─────┬─────┘     │
                    └───────────┘
```

## Technology Stack

### Frontend
- React 18.2
- Zustand (State Management)
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Prisma ORM
- Socket.IO

### Storage
- PostgreSQL (Main Database)
- Redis (Caching & Sessions)
- MinIO (Object Storage)

### Development Tools
- Vite (Build Tool)
- Docker & Docker Compose
- Make (Build Automation)

## Project Structure

```
.
├── server/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── utils/         # Helper functions
├── src/
│   ├── components/    # React components
│   ├── services/     # API clients
│   └── store/        # Zustand stores
├── prisma/
│   └── schema.prisma  # Database schema
└── scripts/          # Utility scripts
```

## Services

### Authentication Service
- JWT-based authentication
- Token refresh mechanism
- Session management
- Rate limiting

### Storage Service
- File upload/download
- Presigned URLs
- Metadata management

### User Service
- User management
- Profile updates
- Password handling

## Security

### Implemented Security Measures
- JWT Authentication
- Session Management
- Rate Limiting
- CORS Protection
- Helmet Security Headers
- Password Hashing (bcrypt)
- HTTP-Only Cookies
- Input Validation

### Best Practices
- Environment Variables
- Secure Password Storage
- Token Refresh Strategy
- Request Rate Limiting
- Validation Middleware

## Development

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Make

### Environment Setup
1. Clone the repository
2. Copy `.env.example` to `.env`
3. Configure environment variables
4. Run `make setup`

### Available Ports
- Frontend/Backend: 3000
- PostgreSQL: 5432
- Redis: 6379
- MinIO: 9000 (API), 9001 (Console)

### Make Commands
```bash
make dev          # Start development server
make install      # Install dependencies
make db-generate  # Generate Prisma client
make db-migrate   # Run database migrations
make db-studio    # Open Prisma Studio
make swagger      # Generate API documentation
make docker-up    # Start Docker containers
make docker-down  # Stop Docker containers
make help         # Show all available commands
```

## Deployment

### Docker Deployment
1. Build images: `make docker-build`
2. Start services: `make docker-up`
3. View logs: `make docker-logs`
4. Stop services: `make docker-down`

### Production Considerations
- Set appropriate environment variables
- Configure proper security measures
- Set up monitoring and logging
- Configure backup strategies
- Set up CI/CD pipelines

## API Documentation

### OpenAPI Specification
- Available at `/api-docs` when server is running
- Generated using Swagger JSDoc
- Updated automatically with `make swagger`

### Authentication Endpoints
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- POST `/api/auth/refresh` - Refresh access token

## Making Changes

### Adding New Features
1. Create feature branch
2. Update necessary components
3. Add tests if applicable
4. Update documentation
5. Submit pull request

### Database Changes
1. Modify `prisma/schema.prisma`
2. Run `make db-generate`
3. Run `make db-migrate`
4. Update affected services

### API Changes
1. Update route handlers
2. Add OpenAPI documentation
3. Run `make swagger`
4. Update frontend services

## Troubleshooting

### Common Issues
1. Database Connection
   - Check PostgreSQL container status
   - Verify database credentials
   - Ensure migrations are up to date

2. File Upload Issues
   - Check MinIO connection
   - Verify bucket permissions
   - Check file size limits

3. Authentication Problems
   - Verify JWT secrets
   - Check token expiration
   - Validate session storage

### Logs
- Application logs: `make docker-logs`
- Database logs: Check PostgreSQL container
- Access logs: Check Nginx/reverse proxy