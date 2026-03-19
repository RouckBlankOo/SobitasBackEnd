# ========================================
# COMPREHENSIVE API AUDIT SCRIPT
# Tests all backend endpoints and verifies frontend-backend connectivity
# ========================================

param(
    [string]$BackendUrl = "http://localhost:3003",
    [string]$AdminDashboardUrl = "http://localhost:3001",
    [string]$EcommerceUrl = "http://localhost:3002"
)

# Color output functions
function Write-Success { param($msg) Write-Host "✓ $msg" -ForegroundColor Green }
function Write-Error-Msg { param($msg) Write-Host "✗ $msg" -ForegroundColor Red }
function Write-Warning-Msg { param($msg) Write-Host "⚠ $msg" -ForegroundColor Yellow }
function Write-Info { param($msg) Write-Host "ℹ $msg" -ForegroundColor Cyan }
function Write-Section { param($msg) Write-Host "`n========== $msg ==========" -ForegroundColor Magenta }

# Test results collection
$global:TestResults = @{
    Total = 0
    Passed = 0
    Failed = 0
    Warnings = 0
    Details = @()
}

# Function to test an endpoint
function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Endpoint,
        [string]$Description,
        [object]$Body = $null,
        [hashtable]$Headers = @{},
        [bool]$RequiresAuth = $false,
        [string]$AuthToken = $null,
        [int]$ExpectedStatus = 200
    )
    
    $global:TestResults.Total++
    $fullUrl = "$BackendUrl/api$Endpoint"
    
    try {
        Write-Info "Testing: $Method $Endpoint - $Description"
        
        # Prepare headers
        $requestHeaders = @{
            "Content-Type" = "application/json"
        }
        
        foreach ($key in $Headers.Keys) {
            $requestHeaders[$key] = $Headers[$key]
        }
        
        if ($RequiresAuth -and $AuthToken) {
            $requestHeaders["Authorization"] = "Bearer $AuthToken"
        }
        
        # Make request
        $params = @{
            Uri = $fullUrl
            Method = $Method
            Headers = $requestHeaders
            TimeoutSec = 30
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-WebRequest @params -ErrorAction Stop
        
        if ($response.StatusCode -eq $ExpectedStatus) {
            Write-Success "PASS: $Description (Status: $($response.StatusCode))"
            $global:TestResults.Passed++
            $global:TestResults.Details += @{
                Status = "PASS"
                Endpoint = $Endpoint
                Method = $Method
                Description = $Description
                StatusCode = $response.StatusCode
                Response = $response.Content.Substring(0, [Math]::Min(200, $response.Content.Length))
            }
        } else {
            Write-Warning-Msg "PARTIAL: $Description (Expected: $ExpectedStatus, Got: $($response.StatusCode))"
            $global:TestResults.Warnings++
            $global:TestResults.Details += @{
                Status = "WARNING"
                Endpoint = $Endpoint
                Method = $Method
                Description = $Description
                StatusCode = $response.StatusCode
                Message = "Status code mismatch"
            }
        }
        
    } catch {
        Write-Error-Msg "FAIL: $Description"
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        $global:TestResults.Failed++
        $global:TestResults.Details += @{
            Status = "FAIL"
            Endpoint = $Endpoint
            Method = $Method
            Description = $Description
            Error = $_.Exception.Message
        }
    }
}

# ========================================
# MAIN AUDIT EXECUTION
# ========================================

Write-Host "`n╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     COMPREHENSIVE E-COMMERCE API AUDIT                ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Info "Backend URL: $BackendUrl"
Write-Info "Admin Dashboard URL: $AdminDashboardUrl"
Write-Info "E-commerce URL: $EcommerceUrl"
Write-Info "Start Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# ========================================
# 1. HEALTH CHECK
# ========================================
Write-Section "1. HEALTH & SYSTEM CHECKS"

Test-Endpoint -Method "GET" -Endpoint "/health" -Description "Health check endpoint" -ExpectedStatus 404
# Note: Health endpoint is excluded from /api prefix

# ========================================
# 2. AUTHENTICATION TESTS
# ========================================
Write-Section "2. AUTHENTICATION TESTS"

# Test Login (we'll use this token for subsequent tests)
$global:AdminToken = $null

try {
    $loginBody = @{
        email = "admin@sobitas.com"
        password = "Admin@123"
    }
    
    $loginResponse = Invoke-RestMethod -Uri "$BackendUrl/api/auth/login" -Method POST -Body ($loginBody | ConvertTo-Json) -ContentType "application/json"
    
    if ($loginResponse.access_token) {
        $global:AdminToken = $loginResponse.access_token
        Write-Success "Login successful - Token obtained"
        $global:TestResults.Passed++
        $global:TestResults.Total++
    } else {
        Write-Error-Msg "Login failed - No token received"
        $global:TestResults.Failed++
        $global:TestResults.Total++
    }
} catch {
    Write-Error-Msg "Login endpoint failed: $($_.Exception.Message)"
    $global:TestResults.Failed++
    $global:TestResults.Total++
}

# Test Registration (with unique email)
$timestamp = [DateTimeOffset]::Now.ToUnixTimeSeconds()
Test-Endpoint -Method "POST" -Endpoint "/auth/register" -Description "User registration" `
    -Body @{
        email = "testuser_$timestamp@test.com"
        password = "Test@123"
        firstName = "Test"
        lastName = "User"
    } -ExpectedStatus 201

# Test Token Validation
if ($global:AdminToken) {
    Test-Endpoint -Method "POST" -Endpoint "/auth/validate" -Description "Token validation" `
        -RequiresAuth $true -AuthToken $global:AdminToken
}

# Test Logout
Test-Endpoint -Method "POST" -Endpoint "/auth/logout" -Description "User logout"

# ========================================
# 3. PRODUCTS ENDPOINTS
# ========================================
Write-Section "3. PRODUCTS ENDPOINTS"

# Public endpoints
Test-Endpoint -Method "GET" -Endpoint "/products" -Description "Get all products"
Test-Endpoint -Method "GET" -Endpoint "/products/featured" -Description "Get featured products"
Test-Endpoint -Method "GET" -Endpoint "/products/flash-sale" -Description "Get flash sale products"
Test-Endpoint -Method "GET" -Endpoint "/products/search/protein" -Description "Search products"

# Admin endpoints
if ($global:AdminToken) {
    Test-Endpoint -Method "GET" -Endpoint "/products/admin/all" -Description "Get all products for admin" `
        -RequiresAuth $true -AuthToken $global:AdminToken
    
    # Test Create Product
    Test-Endpoint -Method "POST" -Endpoint "/products" -Description "Create new product (Admin)" `
        -Body @{
            designation = "Test Product"
            designation_fr = "Produit Test"
            slug = "test-product-$(Get-Random)"
            price = 99.99
            inStock = $true
            category = "supplements"
        } -RequiresAuth $true -AuthToken $global:AdminToken -ExpectedStatus 201
}

# ========================================
# 4. CATEGORIES ENDPOINTS
# ========================================
Write-Section "4. CATEGORIES ENDPOINTS"

Test-Endpoint -Method "GET" -Endpoint "/categories" -Description "Get all categories"

if ($global:AdminToken) {
    Test-Endpoint -Method "POST" -Endpoint "/categories" -Description "Create category (Admin)" `
        -Body @{
            name = "Test Category"
            name_fr = "Catégorie Test"
            slug = "test-category-$(Get-Random)"
            description = "Test description"
        } -RequiresAuth $true -AuthToken $global:AdminToken -ExpectedStatus 201
}

# ========================================
# 5. SUBCATEGORIES ENDPOINTS
# ========================================
Write-Section "5. SUBCATEGORIES ENDPOINTS"

Test-Endpoint -Method "GET" -Endpoint "/subcategories" -Description "Get all subcategories"

if ($global:AdminToken) {
    Test-Endpoint -Method "POST" -Endpoint "/subcategories" -Description "Create subcategory (Admin)" `
        -Body @{
            name = "Test Subcategory"
            name_fr = "Sous-catégorie Test"
            slug = "test-subcat-$(Get-Random)"
        } -RequiresAuth $true -AuthToken $global:AdminToken -ExpectedStatus 201
}

# ========================================
# 6. ORDERS ENDPOINTS
# ========================================
Write-Section "6. ORDERS ENDPOINTS"

# Public: Create order
Test-Endpoint -Method "POST" -Endpoint "/orders" -Description "Create new order" `
    -Body @{
        customerInfo = @{
            firstName = "John"
            lastName = "Doe"
            email = "john@test.com"
            phone = "+21612345678"
            address = "123 Test St"
            city = "Tunis"
            postalCode = "1000"
        }
        items = @(
            @{
                product = "507f1f77bcf86cd799439011"
                quantity = 2
                price = 50.00
            }
        )
        totalAmount = 100.00
        paymentMethod = "cash_on_delivery"
    } -ExpectedStatus 201

# Admin: Get orders
if ($global:AdminToken) {
    Test-Endpoint -Method "GET" -Endpoint "/orders" -Description "Get all orders (Admin)" `
        -RequiresAuth $true -AuthToken $global:AdminToken
    
    Test-Endpoint -Method "GET" -Endpoint "/orders/stats" -Description "Get order statistics (Admin)" `
        -RequiresAuth $true -AuthToken $global:AdminToken
    
    Test-Endpoint -Method "GET" -Endpoint "/orders/recent" -Description "Get recent orders (Admin)" `
        -RequiresAuth $true -AuthToken $global:AdminToken
}

# ========================================
# 7. BRANDS ENDPOINTS
# ========================================
Write-Section "7. BRANDS ENDPOINTS"

Test-Endpoint -Method "GET" -Endpoint "/brands" -Description "Get all brands"

if ($global:AdminToken) {
    Test-Endpoint -Method "POST" -Endpoint "/brands" -Description "Create brand (Admin)" `
        -Body @{
            name = "Test Brand"
            slug = "test-brand-$(Get-Random)"
            description = "Test brand description"
        } -RequiresAuth $true -AuthToken $global:AdminToken -ExpectedStatus 201
}

# ========================================
# 8. AROMAS ENDPOINTS
# ========================================
Write-Section "8. AROMAS ENDPOINTS"

Test-Endpoint -Method "GET" -Endpoint "/aromas" -Description "Get all aromas"

if ($global:AdminToken) {
    Test-Endpoint -Method "POST" -Endpoint "/aromas" -Description "Create aroma (Admin)" `
        -Body @{
            name = "Test Aroma"
            name_fr = "Arôme Test"
            slug = "test-aroma-$(Get-Random)"
        } -RequiresAuth $true -AuthToken $global:AdminToken -ExpectedStatus 201
}

# ========================================
# 9. TAGS ENDPOINTS
# ========================================
Write-Section "9. TAGS ENDPOINTS"

Test-Endpoint -Method "GET" -Endpoint "/tags" -Description "Get all tags"

if ($global:AdminToken) {
    Test-Endpoint -Method "POST" -Endpoint "/tags" -Description "Create tag (Admin)" `
        -Body @{
            name = "Test Tag"
            name_fr = "Tag Test"
            slug = "test-tag-$(Get-Random)"
        } -RequiresAuth $true -AuthToken $global:AdminToken -ExpectedStatus 201
}

# ========================================
# 10. BLOGS ENDPOINTS
# ========================================
Write-Section "10. BLOGS ENDPOINTS"

Test-Endpoint -Method "GET" -Endpoint "/blogs" -Description "Get all blogs"

if ($global:AdminToken) {
    Test-Endpoint -Method "POST" -Endpoint "/blogs" -Description "Create blog post (Admin)" `
        -Body @{
            title = "Test Blog Post"
            title_fr = "Article Test"
            slug = "test-blog-$(Get-Random)"
            content = "Test content"
            content_fr = "Contenu test"
            author = "Test Author"
            published = $true
        } -RequiresAuth $true -AuthToken $global:AdminToken -ExpectedStatus 201
}

# ========================================
# 11. REVIEWS ENDPOINTS
# ========================================
Write-Section "11. REVIEWS ENDPOINTS"

Test-Endpoint -Method "GET" -Endpoint "/reviews" -Description "Get all reviews"
Test-Endpoint -Method "GET" -Endpoint "/reviews/featured" -Description "Get featured reviews"

if ($global:AdminToken) {
    Test-Endpoint -Method "POST" -Endpoint "/reviews" -Description "Create review (Admin)" `
        -Body @{
            customerName = "John Doe"
            rating = 5
            comment = "Great product!"
            productId = "507f1f77bcf86cd799439011"
            featured = $true
        } -RequiresAuth $true -AuthToken $global:AdminToken -ExpectedStatus 201
}

# ========================================
# 12. PAGES ENDPOINTS
# ========================================
Write-Section "12. PAGES ENDPOINTS"

Test-Endpoint -Method "GET" -Endpoint "/pages" -Description "Get all pages"

if ($global:AdminToken) {
    Test-Endpoint -Method "POST" -Endpoint "/pages" -Description "Create page (Admin)" `
        -Body @{
            title = "Test Page"
            title_fr = "Page Test"
            slug = "test-page-$(Get-Random)"
            content = "Test page content"
            content_fr = "Contenu de la page test"
            published = $true
        } -RequiresAuth $true -AuthToken $global:AdminToken -ExpectedStatus 201
}

# ========================================
# 13. CONTACTS ENDPOINTS
# ========================================
Write-Section "13. CONTACTS ENDPOINTS"

Test-Endpoint -Method "POST" -Endpoint "/contacts" -Description "Submit contact form" `
    -Body @{
        name = "John Doe"
        email = "john@test.com"
        subject = "Test inquiry"
        message = "This is a test message"
    } -ExpectedStatus 201

if ($global:AdminToken) {
    Test-Endpoint -Method "GET" -Endpoint "/contacts" -Description "Get all contact submissions (Admin)" `
        -RequiresAuth $true -AuthToken $global:AdminToken
}

# ========================================
# 14. COORDINATES (CONTACT INFO) ENDPOINTS
# ========================================
Write-Section "14. COORDINATES (CONTACT INFO) ENDPOINTS"

Test-Endpoint -Method "GET" -Endpoint "/coordinates" -Description "Get contact information"

if ($global:AdminToken) {
    Test-Endpoint -Method "PUT" -Endpoint "/coordinates" -Description "Update contact information (Admin)" `
        -Body @{
            companyName = "Sobitas Test"
            email = "info@sobitas.com"
            phone = "+21612345678"
            address = "123 Test Street, Tunis"
        } -RequiresAuth $true -AuthToken $global:AdminToken
}

# ========================================
# 15. NEWSLETTER ENDPOINTS
# ========================================
Write-Section "15. NEWSLETTER ENDPOINTS"

Test-Endpoint -Method "POST" -Endpoint "/newsletter/subscribe" -Description "Subscribe to newsletter" `
    -Body @{
        email = "subscriber_$(Get-Random)@test.com"
    } -ExpectedStatus 201

if ($global:AdminToken) {
    Test-Endpoint -Method "GET" -Endpoint "/newsletter" -Description "Get newsletter subscribers (Admin)" `
        -RequiresAuth $true -AuthToken $global:AdminToken
}

# ========================================
# 16. USERS ENDPOINTS  
# ========================================
Write-Section "16. USERS ENDPOINTS"

if ($global:AdminToken) {
    Test-Endpoint -Method "GET" -Endpoint "/users" -Description "Get all users (Admin)" `
        -RequiresAuth $true -AuthToken $global:AdminToken
    
    Test-Endpoint -Method "GET" -Endpoint "/users/stats" -Description "Get user statistics (Admin)" `
        -RequiresAuth $true -AuthToken $global:AdminToken
}

# ========================================
# 17. STATISTICS ENDPOINTS
# ========================================
Write-Section "17. STATISTICS ENDPOINTS"

if ($global:AdminToken) {
    Test-Endpoint -Method "GET" -Endpoint "/statistics/dashboard" -Description "Get dashboard statistics (Admin)" `
        -RequiresAuth $true -AuthToken $global:AdminToken
    
    Test-Endpoint -Method "GET" -Endpoint "/statistics/sales" -Description "Get sales statistics (Admin)" `
        -RequiresAuth $true -AuthToken $global:AdminToken
}

# ========================================
# 18. ADMIN ENDPOINTS
# ========================================
Write-Section "18. ADMIN ENDPOINTS"

if ($global:AdminToken) {
    Test-Endpoint -Method "GET" -Endpoint "/admin/dashboard" -Description "Get admin dashboard data" `
        -RequiresAuth $true -AuthToken $global:AdminToken
}

# ========================================
# 19. COMMUNICATION ENDPOINTS
# ========================================
Write-Section "19. COMMUNICATION ENDPOINTS"

if ($global:AdminToken) {
    Test-Endpoint -Method "GET" -Endpoint "/communication/settings" -Description "Get communication settings (Admin)" `
        -RequiresAuth $true -AuthToken $global:AdminToken
}

# ========================================
# GENERATE REPORT
# ========================================
Write-Section "AUDIT SUMMARY"

$passRate = if ($global:TestResults.Total -gt 0) { 
    [math]::Round(($global:TestResults.Passed / $global:TestResults.Total) * 100, 2) 
} else { 0 }

Write-Host "`nTotal Tests: $($global:TestResults.Total)" -ForegroundColor White
Write-Host "Passed: $($global:TestResults.Passed)" -ForegroundColor Green
Write-Host "Failed: $($global:TestResults.Failed)" -ForegroundColor Red
Write-Host "Warnings: $($global:TestResults.Warnings)" -ForegroundColor Yellow
Write-Host "Pass Rate: $passRate%" -ForegroundColor $(if ($passRate -ge 80) { "Green" } elseif ($passRate -ge 60) { "Yellow" } else { "Red" })

# Generate detailed report
$reportPath = "API_AUDIT_REPORT_$(Get-Date -Format 'yyyyMMdd_HHmmss').md"
$reportContent = @"
# API Audit Report
**Generated:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')

## Summary
- **Total Tests:** $($global:TestResults.Total)
- **Passed:** $($global:TestResults.Passed) ✓
- **Failed:** $($global:TestResults.Failed) ✗
- **Warnings:** $($global:TestResults.Warnings) ⚠
- **Pass Rate:** $passRate%

## Configuration
- Backend URL: $BackendUrl
- Admin Dashboard URL: $AdminDashboardUrl
- E-commerce URL: $EcommerceUrl

## Detailed Results

"@

foreach ($result in $global:TestResults.Details) {
    $statusEmoji = switch ($result.Status) {
        "PASS" { "✓" }
        "FAIL" { "✗" }
        "WARNING" { "⚠" }
    }
    
    $reportContent += @"
### $statusEmoji $($result.Method) $($result.Endpoint)
**Description:** $($result.Description)
**Status:** $($result.Status)

"@
    
    if ($result.StatusCode) {
        $reportContent += "**Status Code:** $($result.StatusCode)`n"
    }
    
    if ($result.Error) {
        $reportContent += "**Error:** $($result.Error)`n"
    }
    
    if ($result.Message) {
        $reportContent += "**Message:** $($result.Message)`n"
    }
    
    $reportContent += "`n---`n`n"
}

$reportContent | Out-File -FilePath $reportPath -Encoding UTF8

Write-Success "Detailed report saved to: $reportPath"

Write-Host "`n╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║            AUDIT COMPLETE                             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
