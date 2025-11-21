# Quick Connection Test Script for Sobitas Backend & Dashboard

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SOBITAS BACKEND CONNECTION TEST" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$BACKEND_URL = "http://localhost:3003"
$API_URL = "$BACKEND_URL/api"

# Test 1: Backend Health Check
Write-Host "[1/5] Testing Backend Health..." -ForegroundColor Yellow
try {
    $health = Invoke-WebRequest -Uri "$BACKEND_URL/health" -Method GET -UseBasicParsing -ErrorAction Stop
    Write-Host "  ✓ Backend is running on $BACKEND_URL" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Backend is NOT running" -ForegroundColor Red
    Write-Host "    Start it with: cd SobitasBackEnd && npm start" -ForegroundColor Yellow
    exit 1
}

# Test 2: API Endpoints Accessible
Write-Host "[2/5] Testing API Endpoints..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$API_URL/products" -Method GET -UseBasicParsing -ErrorAction Stop
    Write-Host "  ✓ API endpoints accessible at $API_URL" -ForegroundColor Green
} catch {
    Write-Host "  ✗ API endpoints not accessible" -ForegroundColor Red
    Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Test 3: Auth Endpoint
Write-Host "[3/5] Testing Auth Endpoint..." -ForegroundColor Yellow
try {
    # Try to hit login endpoint (should return 400/401, but that's OK - means it's working)
    $authTest = Invoke-WebRequest -Uri "$API_URL/auth/login" -Method POST -ContentType "application/json" -Body '{}' -UseBasicParsing -ErrorAction SilentlyContinue
    Write-Host "  ✓ Auth endpoint responding" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 400 -or $_.Exception.Response.StatusCode -eq 401) {
        Write-Host "  ✓ Auth endpoint responding (validation working)" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Auth endpoint may have issues" -ForegroundColor Yellow
    }
}

# Test 4: Check if admin user exists
Write-Host "[4/5] Testing Admin User..." -ForegroundColor Yellow
$adminData = @{
    email = "admin@sobitas.com"
    password = "Admin@123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$API_URL/auth/login" -Method POST -Body $adminData -ContentType "application/json" -ErrorAction Stop
    Write-Host "  ✓ Admin user exists and can login" -ForegroundColor Green
    Write-Host "    Email: admin@sobitas.com" -ForegroundColor White
    Write-Host "    Role: $($loginResponse.user.role)" -ForegroundColor White
} catch {
    Write-Host "  ⚠ Admin user not found or invalid credentials" -ForegroundColor Yellow
    Write-Host "    Run: .\create-admin.ps1 to create admin user" -ForegroundColor Yellow
}

# Test 5: CORS Configuration
Write-Host "[5/5] Testing CORS Configuration..." -ForegroundColor Yellow
try {
    $headers = @{
        "Origin" = "http://localhost:3001"
    }
    $corsTest = Invoke-WebRequest -Uri "$API_URL/products" -Method GET -Headers $headers -UseBasicParsing -ErrorAction Stop
    
    if ($corsTest.Headers["Access-Control-Allow-Origin"] -or $corsTest.Headers["access-control-allow-origin"]) {
        Write-Host "  ✓ CORS properly configured for dashboard" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ CORS headers not found (may still work)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  ⚠ Could not test CORS" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CONNECTION TEST COMPLETE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Start Dashboard: cd dashboard-app && npm run dev" -ForegroundColor White
Write-Host "  2. Open Browser: http://localhost:3001/login" -ForegroundColor White
Write-Host "  3. Login with: admin@sobitas.com / Admin@123" -ForegroundColor White
Write-Host ""
