/**
 * Comprehensive API Audit Script
 * Tests all backend endpoints and generates detailed report
 */

const https = require('https');
const http = require('http');

// Configuration
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3003';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sobitas.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';

// Test results
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  details: []
};

// Color codes for console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

let adminToken = null;

// Helper functions
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.cyan);
}

function logSection(message) {
  log(`\n========== ${message} ==========`, colors.magenta);
}

// HTTP Request helper
function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BACKEND_URL);
    const isHttps = url.protocol === 'https:';
    const lib = isHttps ? https : http;

    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      const data = JSON.stringify(body);
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = lib.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : null;
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: parsed
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.setTimeout(30000);
    req.end();
  });
}

// Test endpoint function
async function testEndpoint(method, endpoint, description, options = {}) {
  results.total++;
  const {
    body = null,
    headers = {},
    requiresAuth = false,
    expectedStatus = 200
  } = options;

  try {
    logInfo(`Testing: ${method} ${endpoint} - ${description}`);

    const requestHeaders = { ...headers };

    if (requiresAuth && adminToken) {
      requestHeaders['Authorization'] = `Bearer ${adminToken}`;
    }

    const response = await makeRequest(method, endpoint, body, requestHeaders);

    if (response.statusCode === expectedStatus) {
      logSuccess(`PASS: ${description} (Status: ${response.statusCode})`);
      results.passed++;
      results.details.push({
        status: 'PASS',
        endpoint,
        method,
        description,
        statusCode: response.statusCode,
        response: typeof response.body === 'object' ? JSON.stringify(response.body).substring(0, 200) : String(response.body).substring(0, 200)
      });
    } else {
      logWarning(`PARTIAL: ${description} (Expected: ${expectedStatus}, Got: ${response.statusCode})`);
      results.warnings++;
      results.details.push({
        status: 'WARNING',
        endpoint,
        method,
        description,
        statusCode: response.statusCode,
        message: 'Status code mismatch'
      });
    }

    return response;

  } catch (error) {
    logError(`FAIL: ${description}`);
    console.log(`  Error: ${error.message}`);
    results.failed++;
    results.details.push({
      status: 'FAIL',
      endpoint,
      method,
      description,
      error: error.message
    });
    return null;
  }
}

// Main audit function
async function runAudit() {
  log('\n╔════════════════════════════════════════════════════════╗', colors.cyan);
  log('║     COMPREHENSIVE E-COMMERCE API AUDIT                 ║', colors.cyan);
  log('╚════════════════════════════════════════════════════════╝', colors.cyan);

  logInfo(`Backend URL: ${BACKEND_URL}`);
  logInfo(`Start Time: ${new Date().toISOString()}\n`);

  // ===========================================
  // 1. HEALTH CHECK
  // ===========================================
  logSection('1. HEALTH & SYSTEM CHECKS');

  await testEndpoint('GET', '/health', 'Health check endpoint', { expectedStatus: 200 });

  // ===========================================
  // 2. AUTHENTICATION
  // ===========================================
  logSection('2. AUTHENTICATION TESTS');

  // Login to get admin token
  try {
    const loginResponse = await makeRequest('POST', '/api/auth/login', {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });

    if (loginResponse.body && loginResponse.body.access_token) {
      adminToken = loginResponse.body.access_token;
      logSuccess('Login successful - Token obtained');
      results.passed++;
      results.total++;
    } else {
      logError('Login failed - No token received');
      results.failed++;
      results.total++;
    }
  } catch (error) {
    logError(`Login endpoint failed: ${error.message}`);
    results.failed++;
    results.total++;
  }

  // Test other auth endpoints
  const timestamp = Date.now();
  await testEndpoint('POST', '/api/auth/register', 'User registration', {
    body: {
      email: `testuser_${timestamp}@test.com`,
      password: 'Test@123',
      firstName: 'Test',
      lastName: 'User'
    },
    expectedStatus: 201
  });

  if (adminToken) {
    await testEndpoint('POST', '/api/auth/validate', 'Token validation', {
      requiresAuth: true
    });
  }

  await testEndpoint('POST', '/api/auth/logout', 'User logout');

  // ===========================================
  // 3. PRODUCTS
  // ===========================================
  logSection('3. PRODUCTS ENDPOINTS');

  await testEndpoint('GET', '/api/products', 'Get all products');
  await testEndpoint('GET', '/api/products/featured', 'Get featured products');
  await testEndpoint('GET', '/api/products/flash-sale', 'Get flash sale products');
  await testEndpoint('GET', '/api/products/search/protein', 'Search products');

  if (adminToken) {
    await testEndpoint('GET', '/api/products/admin/all', 'Get all products for admin', {
      requiresAuth: true
    });

    await testEndpoint('POST', '/api/products', 'Create new product (Admin)', {
      requiresAuth: true,
      body: {
        designation: 'Test Product',
        designation_fr: 'Produit Test',
        slug: `test-product-${Date.now()}`,
        price: 99.99,
        inStock: true,
        category: 'supplements'
      },
      expectedStatus: 201
    });
  }

  // ===========================================
  // 4. CATEGORIES
  // ===========================================
  logSection('4. CATEGORIES ENDPOINTS');

  await testEndpoint('GET', '/api/categories', 'Get all categories');

  if (adminToken) {
    await testEndpoint('POST', '/api/categories', 'Create category (Admin)', {
      requiresAuth: true,
      body: {
        name: 'Test Category',
        name_fr: 'Catégorie Test',
        slug: `test-category-${Date.now()}`,
        description: 'Test description'
      },
      expectedStatus: 201
    });
  }

  // ===========================================
  // 5. SUBCATEGORIES
  // ===========================================
  logSection('5. SUBCATEGORIES ENDPOINTS');

  await testEndpoint('GET', '/api/subcategories', 'Get all subcategories');

  if (adminToken) {
    await testEndpoint('POST', '/api/subcategories', 'Create subcategory (Admin)', {
      requiresAuth: true,
      body: {
        name: 'Test Subcategory',
        name_fr: 'Sous-catégorie Test',
        slug: `test-subcat-${Date.now()}`
      },
      expectedStatus: 201
    });
  }

  // ===========================================
  // 6. ORDERS
  // ===========================================
  logSection('6. ORDERS ENDPOINTS');

  await testEndpoint('POST', '/api/orders', 'Create new order', {
    body: {
      customerInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        phone: '+21612345678',
        address: '123 Test St',
        city: 'Tunis',
        postalCode: '1000'
      },
      items: [{
        product: '507f1f77bcf86cd799439011',
        quantity: 2,
        price: 50.00
      }],
      totalAmount: 100.00,
      paymentMethod: 'cash_on_delivery'
    },
    expectedStatus: 201
  });

  if (adminToken) {
    await testEndpoint('GET', '/api/orders', 'Get all orders (Admin)', {
      requiresAuth: true
    });

    await testEndpoint('GET', '/api/orders/stats', 'Get order statistics (Admin)', {
      requiresAuth: true
    });

    await testEndpoint('GET', '/api/orders/recent', 'Get recent orders (Admin)', {
      requiresAuth: true
    });
  }

  // ===========================================
  // 7. BRANDS
  // ===========================================
  logSection('7. BRANDS ENDPOINTS');

  await testEndpoint('GET', '/api/brands', 'Get all brands');

  if (adminToken) {
    await testEndpoint('POST', '/api/brands', 'Create brand (Admin)', {
      requiresAuth: true,
      body: {
        name: 'Test Brand',
        slug: `test-brand-${Date.now()}`,
        description: 'Test brand description'
      },
      expectedStatus: 201
    });
  }

  // ===========================================
  // 8. AROMAS
  // ===========================================
  logSection('8. AROMAS ENDPOINTS');

  await testEndpoint('GET', '/api/aromas', 'Get all aromas');

  if (adminToken) {
    await testEndpoint('POST', '/api/aromas', 'Create aroma (Admin)', {
      requiresAuth: true,
      body: {
        name: 'Test Aroma',
        name_fr: 'Arôme Test',
        slug: `test-aroma-${Date.now()}`
      },
      expectedStatus: 201
    });
  }

  // ===========================================
  // 9. TAGS
  // ===========================================
  logSection('9. TAGS ENDPOINTS');

  await testEndpoint('GET', '/api/tags', 'Get all tags');

  if (adminToken) {
    await testEndpoint('POST', '/api/tags', 'Create tag (Admin)', {
      requiresAuth: true,
      body: {
        name: 'Test Tag',
        name_fr: 'Tag Test',
        slug: `test-tag-${Date.now()}`
      },
      expectedStatus: 201
    });
  }

  // ===========================================
  // 10. BLOGS
  // ===========================================
  logSection('10. BLOGS ENDPOINTS');

  await testEndpoint('GET', '/api/blogs', 'Get all blogs');

  if (adminToken) {
    await testEndpoint('POST', '/api/blogs', 'Create blog post (Admin)', {
      requiresAuth: true,
      body: {
        title: 'Test Blog Post',
        title_fr: 'Article Test',
        slug: `test-blog-${Date.now()}`,
        content: 'Test content',
        content_fr: 'Contenu test',
        author: 'Test Author',
        published: true
      },
      expectedStatus: 201
    });
  }

  // ===========================================
  // 11. REVIEWS
  // ===========================================
  logSection('11. REVIEWS ENDPOINTS');

  await testEndpoint('GET', '/api/reviews', 'Get all reviews');
  await testEndpoint('GET', '/api/reviews/featured', 'Get featured reviews');

  if (adminToken) {
    await testEndpoint('POST', '/api/reviews', 'Create review (Admin)', {
      requiresAuth: true,
      body: {
        customerName: 'John Doe',
        rating: 5,
        comment: 'Great product!',
        productId: '507f1f77bcf86cd799439011',
        featured: true
      },
      expectedStatus: 201
    });
  }

  // ===========================================
  // 12. PAGES
  // ===========================================
  logSection('12. PAGES ENDPOINTS');

  await testEndpoint('GET', '/api/pages', 'Get all pages');

  if (adminToken) {
    await testEndpoint('POST', '/api/pages', 'Create page (Admin)', {
      requiresAuth: true,
      body: {
        title: 'Test Page',
        title_fr: 'Page Test',
        slug: `test-page-${Date.now()}`,
        content: 'Test page content',
        content_fr: 'Contenu de la page test',
        published: true
      },
      expectedStatus: 201
    });
  }

  // ===========================================
  // 13. CONTACTS
  // ===========================================
  logSection('13. CONTACTS ENDPOINTS');

  await testEndpoint('POST', '/api/contacts', 'Submit contact form', {
    body: {
      name: 'John Doe',
      email: 'john@test.com',
      subject: 'Test inquiry',
      message: 'This is a test message'
    },
    expectedStatus: 201
  });

  if (adminToken) {
    await testEndpoint('GET', '/api/contacts', 'Get all contact submissions (Admin)', {
      requiresAuth: true
    });
  }

  // ===========================================
  // 14. COORDINATES
  // ===========================================
  logSection('14. COORDINATES (CONTACT INFO) ENDPOINTS');

  await testEndpoint('GET', '/api/coordinates', 'Get contact information');

  if (adminToken) {
    await testEndpoint('PUT', '/api/coordinates', 'Update contact information (Admin)', {
      requiresAuth: true,
      body: {
        companyName: 'Sobitas Test',
        email: 'info@sobitas.com',
        phone: '+21612345678',
        address: '123 Test Street, Tunis'
      }
    });
  }

  // ===========================================
  // 15. NEWSLETTER
  // ===========================================
  logSection('15. NEWSLETTER ENDPOINTS');

  await testEndpoint('POST', '/api/newsletter', 'Subscribe to newsletter', {
    body: {
      email: `subscriber_${Date.now()}@test.com`
    },
    expectedStatus: 201
  });

  if (adminToken) {
    await testEndpoint('GET', '/api/newsletter', 'Get newsletter subscribers (Admin)', {
      requiresAuth: true
    });
  }

  // ===========================================
  // 16. USERS
  // ===========================================
  logSection('16. USERS ENDPOINTS');

  if (adminToken) {
    await testEndpoint('GET', '/api/users', 'Get all users (Admin)', {
      requiresAuth: true
    });

    await testEndpoint('GET', '/api/users/stats', 'Get user statistics (Admin)', {
      requiresAuth: true
    });
  }

  // ===========================================
  // 17. STATISTICS
  // ===========================================
  logSection('17. STATISTICS ENDPOINTS');

  if (adminToken) {
    await testEndpoint('GET', '/api/statistics/dashboard', 'Get dashboard statistics (Admin)', {
      requiresAuth: true
    });

    await testEndpoint('GET', '/api/statistics/sales', 'Get sales statistics (Admin)', {
      requiresAuth: true
    });
  }

  // ===========================================
  // 18. ADMIN
  // ===========================================
  logSection('18. ADMIN ENDPOINTS');

  if (adminToken) {
    await testEndpoint('GET', '/api/admin/dashboard', 'Get admin dashboard data', {
      requiresAuth: true
    });
  }

  // ===========================================
  // 19. COMMUNICATION
  // ===========================================
  logSection('19. COMMUNICATION ENDPOINTS');

  if (adminToken) {
    await testEndpoint('GET', '/api/communication/settings', 'Get communication settings (Admin)', {
      requiresAuth: true
    });
  }

  // ===========================================
  // GENERATE REPORT
  // ===========================================
  logSection('AUDIT SUMMARY');

  const passRate = results.total > 0 ? ((results.passed / results.total) * 100).toFixed(2) : 0;

  console.log(`\nTotal Tests: ${results.total}`);
  logSuccess(`Passed: ${results.passed}`);
  logError(`Failed: ${results.failed}`);
  logWarning(`Warnings: ${results.warnings}`);

  const passRateColor = passRate >= 80 ? colors.green : passRate >= 60 ? colors.yellow : colors.red;
  log(`Pass Rate: ${passRate}%`, passRateColor);

  // Generate detailed report
  const fs = require('fs');
  const reportPath = `API_AUDIT_REPORT_${new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]}_${Date.now()}.md`;

  let reportContent = `# API Audit Report\n**Generated:** ${new Date().toISOString()}\n\n`;
  reportContent += `## Summary\n`;
  reportContent += `- **Total Tests:** ${results.total}\n`;
  reportContent += `- **Passed:** ${results.passed} ✓\n`;
  reportContent += `- **Failed:** ${results.failed} ✗\n`;
  reportContent += `- **Warnings:** ${results.warnings} ⚠\n`;
  reportContent += `- **Pass Rate:** ${passRate}%\n\n`;
  reportContent += `## Configuration\n`;
  reportContent += `- Backend URL: ${BACKEND_URL}\n\n`;
  reportContent += `## Detailed Results\n\n`;

  results.details.forEach(result => {
    const statusEmoji = result.status === 'PASS' ? '✓' : result.status === 'FAIL' ? '✗' : '⚠';
    reportContent += `### ${statusEmoji} ${result.method} ${result.endpoint}\n`;
    reportContent += `**Description:** ${result.description}\n`;
    reportContent += `**Status:** ${result.status}\n`;

    if (result.statusCode) {
      reportContent += `**Status Code:** ${result.statusCode}\n`;
    }

    if (result.error) {
      reportContent += `**Error:** ${result.error}\n`;
    }

    if (result.message) {
      reportContent += `**Message:** ${result.message}\n`;
    }

    reportContent += `\n---\n\n`;
  });

  fs.writeFileSync(reportPath, reportContent);
  logSuccess(`\nDetailed report saved to: ${reportPath}`);

  log('\n╔════════════════════════════════════════════════════════╗', colors.cyan);
  log('║            AUDIT COMPLETE                              ║', colors.cyan);
  log('╚════════════════════════════════════════════════════════╝', colors.cyan);
}

// Run the audit
runAudit().catch(error => {
  logError(`Audit failed: ${error.message}`);
  console.error(error);
  process.exit(1);
});
