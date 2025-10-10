#!/bin/bash

# SOBITAS Backend Setup Script
# This script helps you set up the backend quickly

set -e

echo "🚀 SOBITAS Backend Setup"
echo "======================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file already exists${NC}"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keeping existing .env file"
    else
        rm .env
    fi
fi

# Copy template if .env doesn't exist
if [ ! -f .env ]; then
    if [ -f env.template ]; then
        cp env.template .env
        echo -e "${GREEN}✅ Created .env from template${NC}"
    else
        echo -e "${RED}❌ env.template not found!${NC}"
        exit 1
    fi
fi

# Function to generate random secret
generate_secret() {
    openssl rand -base64 32
}

echo ""
echo "🔐 Generating secure secrets..."

# Generate secrets
JWT_SECRET=$(generate_secret)
JWT_REFRESH_SECRET=$(generate_secret)
REVALIDATE_SECRET=$(generate_secret)

# Update .env file
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env
    sed -i '' "s/JWT_REFRESH_SECRET=.*/JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET/" .env
    sed -i '' "s/REVALIDATE_SECRET=.*/REVALIDATE_SECRET=$REVALIDATE_SECRET/" .env
else
    # Linux
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env
    sed -i "s/JWT_REFRESH_SECRET=.*/JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET/" .env
    sed -i "s/REVALIDATE_SECRET=.*/REVALIDATE_SECRET=$REVALIDATE_SECRET/" .env
fi

echo -e "${GREEN}✅ Secrets generated and saved to .env${NC}"

echo ""
echo "📝 Please configure the following in .env:"
echo "   - ADMIN_FRONTEND_URL"
echo "   - ECOMMERCE_FRONTEND_URL"
echo "   - MONGODB_URI (if not using Docker)"
echo ""

# Check for Docker
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✅ Docker found${NC}"
    
    echo ""
    read -p "Do you want to start with Docker Compose? (Y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
        echo ""
        echo "🐳 Starting Docker Compose..."
        
        # Check if development or production
        read -p "Environment (1=Development, 2=Production): " -n 1 -r
        echo
        
        if [[ $REPLY == "1" ]]; then
            docker-compose -f docker-compose.dev.yml up -d
            echo ""
            echo -e "${GREEN}✅ Development environment started${NC}"
            echo "   API: http://localhost:3001"
            echo "   MongoDB: localhost:27017"
            echo "   Redis: localhost:6379"
        else
            docker-compose up -d
            echo ""
            echo -e "${GREEN}✅ Production environment started${NC}"
            echo "   API: http://localhost:3001"
        fi
        
        echo ""
        echo "📊 View logs: docker-compose logs -f"
        echo "🛑 Stop: docker-compose down"
    fi
else
    echo -e "${YELLOW}⚠️  Docker not found - you'll need to install dependencies manually${NC}"
    echo ""
    read -p "Install npm dependencies? (Y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
        npm install
        echo -e "${GREEN}✅ Dependencies installed${NC}"
    fi
fi

echo ""
echo "════════════════════════════════════"
echo -e "${GREEN}✨ Setup Complete!${NC}"
echo "════════════════════════════════════"
echo ""
echo "📋 Next steps:"
echo "   1. Edit .env with your configuration"
echo "   2. Verify MongoDB and Redis are running"
echo "   3. Test: curl http://localhost:3001/health"
echo ""
echo "📚 Documentation:"
echo "   - INTEGRATION_SUMMARY.md"
echo "   - DEPLOYMENT_GUIDE.md"
echo ""
echo "🔐 Your secrets (save these securely):"
echo "   REVALIDATE_SECRET=$REVALIDATE_SECRET"
echo ""
echo -e "${YELLOW}⚠️  Remember to update Admin dashboard with REVALIDATE_SECRET${NC}"
echo ""

