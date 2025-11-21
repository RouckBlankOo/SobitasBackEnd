# Script to create an admin user for the Sobitas dashboard

$API_URL = "http://localhost:3003/api"

Write-Host "Creating admin user for Sobitas Dashboard..." -ForegroundColor Cyan
Write-Host ""

# Admin user details
$adminData = @{
    firstName = "Admin"
    lastName = "User"
    email = "admin@sobitas.com"
    password = "Admin@123"
    userType = "admin"
} | ConvertTo-Json

Write-Host "Creating admin user with email: admin@sobitas.com" -ForegroundColor Yellow
Write-Host ""

try {
    # Check if backend is running
    try {
        $healthCheck = Invoke-WebRequest -Uri "http://localhost:3003/health" -Method GET -UseBasicParsing -ErrorAction Stop
        Write-Host "Backend is running" -ForegroundColor Green
    }
    catch {
        Write-Host "Backend is not running. Please start it first with:" -ForegroundColor Red
        Write-Host "  cd SobitasBackEnd" -ForegroundColor Yellow
        Write-Host "  npm start" -ForegroundColor Yellow
        exit 1
    }

    # Register admin user
    $response = Invoke-RestMethod -Uri "$API_URL/auth/register" -Method POST -Body $adminData -ContentType "application/json" -ErrorAction Stop
    
    Write-Host "Admin user created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Login Credentials:" -ForegroundColor Cyan
    Write-Host "  Email:    admin@sobitas.com" -ForegroundColor White
    Write-Host "  Password: Admin@123" -ForegroundColor White
    Write-Host ""
    Write-Host "You can now login to the dashboard at http://localhost:3001" -ForegroundColor Green
}
catch {
    $errorMessage = $_.Exception.Message
    
    if ($errorMessage -like "*already exists*" -or $errorMessage -like "*duplicate*") {
        Write-Host "Admin user already exists" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Login Credentials:" -ForegroundColor Cyan
        Write-Host "  Email:    admin@sobitas.com" -ForegroundColor White
        Write-Host "  Password: Admin@123" -ForegroundColor White
        Write-Host ""
        Write-Host "You can login to the dashboard at http://localhost:3001" -ForegroundColor Green
    }
    else {
        Write-Host "Failed to create admin user:" -ForegroundColor Red
        Write-Host "  $errorMessage" -ForegroundColor Red
        Write-Host ""
        Write-Host "Troubleshooting:" -ForegroundColor Yellow
        Write-Host "  1. Make sure MongoDB is running" -ForegroundColor White
        Write-Host "  2. Check backend logs for errors" -ForegroundColor White
        Write-Host "  3. Verify .env configuration" -ForegroundColor White
        exit 1
    }
}
