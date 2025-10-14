# Comprehensive Admin API Endpoint Test

$API_URL = "http://localhost:3001/api"
$results = @()

function Test-Endpoint {
    param([string]$name, [string]$url, [string]$method = "GET")
    try {
        $response = Invoke-RestMethod -Uri $url -Method $method -ErrorAction Stop
        Write-Host "[PASS] $name" -ForegroundColor Green
        $script:results += @{Name=$name; Status="PASS"; URL=$url}
        return $true
    }
    catch {
        $code = $_.Exception.Response.StatusCode.value__
        if ($code -eq 401 -or $code -eq 403) {
            Write-Host "[AUTH] $name" -ForegroundColor Yellow
            $script:results += @{Name=$name; Status="AUTH"; URL=$url}
            return $true
        }
        Write-Host "[FAIL] $name - $code" -ForegroundColor Red
        $script:results += @{Name=$name; Status="FAIL"; URL=$url; Code=$code}
        return $false
    }
}

Write-Host "`n=== Testing All Admin Endpoints ===" -ForegroundColor Cyan
Write-Host "Backend: $API_URL`n" -ForegroundColor Cyan

# Core Resources
Write-Host "--- Core Resources ---" -ForegroundColor Cyan
Test-Endpoint "Products" "$API_URL/products"
Test-Endpoint "Categories" "$API_URL/categories"
Test-Endpoint "Brands" "$API_URL/brands"
Test-Endpoint "Subcategories (Admin)" "$API_URL/admin/subcategories/get/all"
Test-Endpoint "Aromas" "$API_URL/aromas"

# Content Management
Write-Host "`n--- Content Management ---" -ForegroundColor Cyan
Test-Endpoint "Blogs (All)" "$API_URL/blogs/get/all"
Test-Endpoint "Blogs (Public)" "$API_URL/blogs/get-all-landing-page"
Test-Endpoint "Reviews" "$API_URL/reviews"
Test-Endpoint "Pages" "$API_URL/pages"
Test-Endpoint "FAQs" "$API_URL/faqs"
Test-Endpoint "Tags" "$API_URL/tags"

# User & Order Management
Write-Host "`n--- User & Order Management ---" -ForegroundColor Cyan
Test-Endpoint "Users" "$API_URL/users"
Test-Endpoint "Orders" "$API_URL/orders"
Test-Endpoint "Clients" "$API_URL/clients"

# Admin & Analytics
Write-Host "`n--- Admin & Analytics ---" -ForegroundColor Cyan
Test-Endpoint "Admin Stats" "$API_URL/admin/stats"
Test-Endpoint "Statistics Overview" "$API_URL/statistics/overview"
Test-Endpoint "Analytics Recent" "$API_URL/analytics/recent-activity"

# Newsletter & Communication
Write-Host "`n--- Newsletter & Communication ---" -ForegroundColor Cyan
Test-Endpoint "Newsletter (singular)" "$API_URL/newsletter"
Test-Endpoint "Newsletters (plural)" "$API_URL/newsletters"
Test-Endpoint "Contacts" "$API_URL/contacts"

# Services & Media
Write-Host "`n--- Services & Media ---" -ForegroundColor Cyan
Test-Endpoint "Services" "$API_URL/services"
Test-Endpoint "Media" "$API_URL/media"
Test-Endpoint "Slides" "$API_URL/slides"

# Summary
Write-Host "`n=== Summary ===" -ForegroundColor Cyan
$passed = ($results | Where-Object { $_.Status -eq "PASS" -or $_.Status -eq "AUTH" }).Count
$failed = ($results | Where-Object { $_.Status -eq "FAIL" }).Count
$total = $results.Count

Write-Host "Total: $total" -ForegroundColor White
Write-Host "Passed/Auth: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })

if ($failed -gt 0) {
    Write-Host "`n--- Failed Endpoints ---" -ForegroundColor Red
    $results | Where-Object { $_.Status -eq "FAIL" } | ForEach-Object {
        Write-Host "  $($_.Name): $($_.URL) (Code: $($_.Code))" -ForegroundColor Red
    }
}

