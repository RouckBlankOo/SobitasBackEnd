# Script to seed the Sobitas database

$API_URL = "http://localhost:3003/api"

Write-Host "Starting database seeding..." -ForegroundColor Cyan
Write-Host ""

# Check if backend is running
try {
    $statusResponse = Invoke-WebRequest -Uri "$API_URL/seed/status" -Method GET -UseBasicParsing -ErrorAction Stop
    Write-Host "Backend is running" -ForegroundColor Green
}
catch {
    Write-Host "Backend is not running. Please start it with 'npm start' first" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Seeding database with sample data..." -ForegroundColor Yellow
Write-Host "   This will:"
Write-Host "   - Clear existing data"
Write-Host "   - Add brands"
Write-Host "   - Add categories and subcategories"
Write-Host "   - Add products"
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "$API_URL/seed" -Method POST -ContentType "application/json" -ErrorAction Stop
    
    Write-Host "Database seeded successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Database Status:" -ForegroundColor Cyan
    Write-Host "   Brands: $($response.counts.brands)" -ForegroundColor White
    Write-Host "   Categories: $($response.counts.categories)" -ForegroundColor White
    Write-Host "   Subcategories: $($response.counts.subcategories)" -ForegroundColor White
    Write-Host "   Products: $($response.counts.products)" -ForegroundColor White
    Write-Host ""
    Write-Host "Your database is now populated with sample data!" -ForegroundColor Green
}
catch {
    Write-Host "Seeding failed:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   1. Make sure the backend is running (npm start in SobitasBackEnd folder)"
    Write-Host "   2. Check MongoDB is running and accessible"
    Write-Host "   3. Verify your .env file has correct MONGODB_URI"
    exit 1
}
