# 🚀 Quick Start Guide - SOBITAS Backend

## Prerequisites

- Node.js 20+ installed
- MongoDB (either local or Docker)
- Redis (optional, for caching)

## Option 1: Quick Start with Docker (Recommended)

### 1. Install Docker Desktop
Download from: https://www.docker.com/products/docker-desktop/

### 2. Start Everything with One Command
```bash
cd SobitasBackEnd
docker-compose -f docker-compose.dev.yml up -d
```

This starts:
- ✅ MongoDB on port 27017
- ✅ Redis on port 6379
- ✅ NestJS API on port 3001 (with hot reload)

### 3. View Logs
```bash
docker-compose -f docker-compose.dev.yml logs -f
```

### 4. Stop Everything
```bash
docker-compose -f docker-compose.dev.yml down
```

## Option 2: Manual Setup (Without Docker)

### 1. Install MongoDB

**Windows:**
1. Download from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

**Mac (with Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### 2. Configure Environment
```bash
# Copy template
cp env.template .env

# Edit .env and set:
MONGODB_URI=mongodb://localhost:27017/sobitas-db
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Server
```bash
# Development with hot reload
npm run start:dev

# Or production mode
npm run build
npm start
```

## Testing the Server

### 1. Health Check
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-10-10T...",
  "service": "Sobitas Backend API",
  "version": "1.0.0",
  "uptime": 123.45,
  "memory": {...}
}
```

### 2. Test API Endpoints
```bash
# Get products
curl http://localhost:3001/api/products

# Get featured products
curl http://localhost:3001/api/products/featured
```

### 3. Test Authentication
```bash
# Note: You'll need to create a user first via MongoDB
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'
```

## Creating a Test User

### Option 1: Using MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Create database: `sobitas-db`
4. Create collection: `users`
5. Insert document:
```json
{
  "email": "admin@sobitas.tn",
  "password": "$2a$10$rKXYC3QMn0yVOL5xGqBmFe7eI4OX5IjLnLjOZxQ7xyPHXv8P6LX2S",
  "firstName": "Admin",
  "lastName": "User",
  "role": "admin",
  "isActive": true,
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```
Password for the above hash is: `admin123`

### Option 2: Using MongoDB Shell
```bash
# Connect to MongoDB
mongosh

# Switch to database
use sobitas-db

# Create admin user (password: admin123)
db.users.insertOne({
  email: "admin@sobitas.tn",
  password: "$2a$10$rKXYC3QMn0yVOL5xGqBmFe7eI4OX5IjLnLjOZxQ7xyPHXv8P6LX2S",
  firstName: "Admin",
  lastName: "User",
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Troubleshooting

### MongoDB Connection Error
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED ::1:27017`

**Solution:**
1. Check MongoDB is running:
   ```bash
   # Windows
   Get-Service MongoDB
   
   # Mac/Linux
   brew services list  # Mac
   sudo systemctl status mongod  # Linux
   ```

2. If using Docker:
   ```bash
   docker ps | grep mongo
   ```

3. Update `.env` with correct MongoDB URI

### Port Already in Use
**Error:** `Error: listen EADDRINUSE: address already in use :::3001`

**Solution:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### Module Not Found
**Error:** `Cannot find module 'cookie-parser'`

**Solution:**
```bash
# Delete and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables

Create a `.env` file with these variables:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/sobitas-db

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Frontend URLs (for CORS)
ADMIN_FRONTEND_URL=http://localhost:3000
ECOMMERCE_FRONTEND_URL=http://localhost:8080

# Redis (optional)
REDIS_URL=redis://localhost:6379

# ISR Revalidation
REVALIDATE_SECRET=your-revalidate-secret-here
```

## Available Scripts

```bash
# Development
npm run start:dev      # Start with hot reload
npm run start:debug    # Start with debugger

# Production
npm run build          # Build the application
npm start              # Start production server

# Testing
npm test               # Run unit tests
npm run test:e2e       # Run end-to-end tests
npm run test:cov       # Generate coverage report

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## Next Steps

1. ✅ Start the backend server
2. ✅ Create a test user
3. ✅ Test authentication
4. ✅ Start the Admin Dashboard (`cd AdminSobitasPro && npm run dev`)
5. ✅ Login to admin dashboard at `http://localhost:3000/login`

## Useful Links

- **API Documentation:** http://localhost:3001/api/docs (if Swagger is enabled)
- **Health Check:** http://localhost:3001/health
- **MongoDB Compass:** https://www.mongodb.com/products/compass
- **Main Documentation:** See `../INTEGRATION_SUMMARY.md`

## Docker Commands Cheat Sheet

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f api

# Stop services
docker-compose -f docker-compose.dev.yml down

# Restart API only
docker-compose -f docker-compose.dev.yml restart api

# View running containers
docker ps

# Execute commands in container
docker exec -it sobitas-api-dev sh
docker exec -it sobitas-mongo-dev mongosh

# Clean up everything (WARNING: deletes data)
docker-compose -f docker-compose.dev.yml down -v
```

## Support

If you encounter issues:
1. Check logs: `docker-compose -f docker-compose.dev.yml logs -f`
2. Verify MongoDB is running: `docker ps`
3. Check `.env` configuration
4. Review `../DEPLOYMENT_GUIDE.md` for more help

---

**Happy Coding! 🚀**

