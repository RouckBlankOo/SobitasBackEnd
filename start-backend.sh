#!/bin/bash

# Backend startup script for Sobitas
echo "🚀 Starting Sobitas Backend..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   - On Windows: net start MongoDB"
    echo "   - On macOS: brew services start mongodb-community"
    echo "   - On Linux: sudo systemctl start mongod"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Copy environment file if it doesn't exist
if [ ! -f ".env" ]; then
    if [ -f "env.template" ]; then
        echo "📋 Creating .env file from template..."
        cp env.template .env
        echo "⚠️  Please update .env file with your configuration!"
    fi
fi

# Start the development server
echo "🎯 Starting NestJS development server on port 3001..."
npm run start:dev