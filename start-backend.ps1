# PowerShell script to start Sobitas Backend
Write-Host "🚀 Starting Sobitas Backend..." -ForegroundColor Green

# Check if MongoDB is running
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if (-not $mongoProcess) {
    Write-Host "⚠️  MongoDB is not running. Please start MongoDB first." -ForegroundColor Yellow
    Write-Host "   To start MongoDB: net start MongoDB" -ForegroundColor Cyan
    Write-Host "   Or start it from MongoDB Compass" -ForegroundColor Cyan
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
    npm install
}

# Copy environment file if it doesn't exist
if (-not (Test-Path ".env")) {
    if (Test-Path "env.template") {
        Write-Host "📋 Creating .env file from template..." -ForegroundColor Blue
        Copy-Item "env.template" ".env"
        Write-Host "⚠️  Please update .env file with your configuration!" -ForegroundColor Yellow
    }
}

# Start the development server
Write-Host "🎯 Starting NestJS development server on port 3001..." -ForegroundColor Green
npm run start:dev