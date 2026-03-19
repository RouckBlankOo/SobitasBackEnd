/**
 * Backend API Tests for Invoices Module
 * Tests all CRUD operations for Factures and Tickets
 * Run with: node test-invoices-api.js
 */

const BASE_URL = 'http://localhost:3003/api';

// Test user credentials (you may need to adjust these)
const TEST_CREDENTIALS = {
  email: 'admin@sobitas.com',
  password: 'admin123',
};

let authToken = null;

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Helper function to make HTTP requests
async function makeRequest(endpoint, method = 'GET', body = null, useAuth = true) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (useAuth && authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Test 1: Authentication
async function testAuthentication() {
  log('\n📝 Test 1: Authentication', 'blue');

  const result = await makeRequest('/auth/login', 'POST', TEST_CREDENTIALS, false);

  if (result.success && result.data.accessToken) {
    authToken = result.data.accessToken;
    log('✅ Authentication successful', 'green');
    log(`   Token: ${authToken.substring(0, 20)}...`, 'yellow');
    return true;
  } else {
    log('❌ Authentication failed', 'red');
    log(`   Error: ${JSON.stringify(result.data)}`, 'red');
    return false;
  }
}

// Test 2: Create Facture
async function testCreateFacture() {
  log('\n📝 Test 2: Create Facture (Invoice)', 'blue');

  const factureData = {
    clientId: '507f1f77bcf86cd799439011', // Mock client ID
    clientNom: 'Client Test',
    clientAdresse: '123 Rue Test',
    clientTelephone: '+212600000000',
    items: [
      {
        productId: '507f1f77bcf86cd799439012',
        designation: 'Product Test 1',
        quantite: 2,
        prixUnitaire: 100,
      },
      {
        productId: '507f1f77bcf86cd799439013',
        designation: 'Product Test 2',
        quantite: 1,
        prixUnitaire: 150,
      },
    ],
    remise: 10,
    tva: 20,
    notes: 'Facture de test',
  };

  const result = await makeRequest('/factures', 'POST', factureData);

  if (result.success) {
    log('✅ Facture created successfully', 'green');
    log(`   ID: ${result.data._id}`, 'yellow');
    log(`   Numero: ${result.data.numero}`, 'yellow');
    log(`   Total HT: ${result.data.totalHT} MAD`, 'yellow');
    log(`   Total TTC: ${result.data.totalTTC} MAD`, 'yellow');
    return result.data._id;
  } else {
    log('❌ Failed to create facture', 'red');
    log(`   Error: ${JSON.stringify(result.data)}`, 'red');
    return null;
  }
}

// Test 3: Get All Factures
async function testGetAllFactures() {
  log('\n📝 Test 3: Get All Factures (with pagination)', 'blue');

  const result = await makeRequest('/factures?page=1&limit=10');

  if (result.success) {
    log('✅ Factures retrieved successfully', 'green');
    log(`   Total: ${result.data.total}`, 'yellow');
    log(`   Page: ${result.data.page}/${result.data.pages}`, 'yellow');
    log(`   Count: ${result.data.factures.length} factures`, 'yellow');
    return true;
  } else {
    log('❌ Failed to get factures', 'red');
    log(`   Error: ${JSON.stringify(result.data)}`, 'red');
    return false;
  }
}

// Test 4: Get Single Facture
async function testGetSingleFacture(factureId) {
  log('\n📝 Test 4: Get Single Facture (with details)', 'blue');

  if (!factureId) {
    log('⚠️  Skipped: No facture ID available', 'yellow');
    return false;
  }

  const result = await makeRequest(`/factures/${factureId}`);

  if (result.success) {
    log('✅ Facture retrieved successfully', 'green');
    log(`   Numero: ${result.data.numero}`, 'yellow');
    log(`   Client: ${result.data.clientNom}`, 'yellow');
    log(`   Items: ${result.data.items?.length || 0}`, 'yellow');
    log(`   Total TTC: ${result.data.totalTTC} MAD`, 'yellow');
    return true;
  } else {
    log('❌ Failed to get facture', 'red');
    log(`   Error: ${JSON.stringify(result.data)}`, 'red');
    return false;
  }
}

// Test 5: Update Facture
async function testUpdateFacture(factureId) {
  log('\n📝 Test 5: Update Facture', 'blue');

  if (!factureId) {
    log('⚠️  Skipped: No facture ID available', 'yellow');
    return false;
  }

  const updateData = {
    remise: 15,
    notes: 'Facture de test - MODIFIÉE',
    statut: 'payee',
  };

  const result = await makeRequest(`/factures/${factureId}`, 'PUT', updateData);

  if (result.success) {
    log('✅ Facture updated successfully', 'green');
    log(`   New remise: ${result.data.remise}%`, 'yellow');
    log(`   New statut: ${result.data.statut}`, 'yellow');
    return true;
  } else {
    log('❌ Failed to update facture', 'red');
    log(`   Error: ${JSON.stringify(result.data)}`, 'red');
    return false;
  }
}

// Test 6: Generate Numero
async function testGenerateNumero() {
  log('\n📝 Test 6: Generate Facture Numero', 'blue');

  const result = await makeRequest('/factures/generate-numero');

  if (result.success) {
    log('✅ Numero generated successfully', 'green');
    log(`   Next numero: ${result.data.numero}`, 'yellow');
    return true;
  } else {
    log('❌ Failed to generate numero', 'red');
    log(`   Error: ${JSON.stringify(result.data)}`, 'red');
    return false;
  }
}

// Test 7: Create Ticket
async function testCreateTicket() {
  log('\n📝 Test 7: Create Ticket (Receipt)', 'blue');

  const ticketData = {
    items: [
      {
        productId: '507f1f77bcf86cd799439014',
        designation: 'Product A',
        quantite: 3,
        prixUnitaire: 50,
      },
    ],
    montantPaye: 150,
    montantRendu: 0,
    modePaiement: 'especes',
  };

  const result = await makeRequest('/tickets', 'POST', ticketData);

  if (result.success) {
    log('✅ Ticket created successfully', 'green');
    log(`   ID: ${result.data._id}`, 'yellow');
    log(`   Numero: ${result.data.numero}`, 'yellow');
    log(`   Total: ${result.data.total} MAD`, 'yellow');
    return result.data._id;
  } else {
    log('❌ Failed to create ticket', 'red');
    log(`   Error: ${JSON.stringify(result.data)}`, 'red');
    return null;
  }
}

// Test 8: Get All Tickets
async function testGetAllTickets() {
  log('\n📝 Test 8: Get All Tickets', 'blue');

  const result = await makeRequest('/tickets?page=1&limit=10');

  if (result.success) {
    log('✅ Tickets retrieved successfully', 'green');
    log(`   Total: ${result.data.total}`, 'yellow');
    log(`   Count: ${result.data.tickets.length} tickets`, 'yellow');
    return true;
  } else {
    log('❌ Failed to get tickets', 'red');
    log(`   Error: ${JSON.stringify(result.data)}`, 'red');
    return false;
  }
}

// Test 9: Delete Facture
async function testDeleteFacture(factureId) {
  log('\n📝 Test 9: Delete Facture', 'blue');

  if (!factureId) {
    log('⚠️  Skipped: No facture ID available', 'yellow');
    return false;
  }

  const result = await makeRequest(`/factures/${factureId}`, 'DELETE');

  if (result.success) {
    log('✅ Facture deleted successfully', 'green');
    return true;
  } else {
    log('❌ Failed to delete facture', 'red');
    log(`   Error: ${JSON.stringify(result.data)}`, 'red');
    return false;
  }
}

// Test 10: Delete Ticket
async function testDeleteTicket(ticketId) {
  log('\n📝 Test 10: Delete Ticket', 'blue');

  if (!ticketId) {
    log('⚠️  Skipped: No ticket ID available', 'yellow');
    return false;
  }

  const result = await makeRequest(`/tickets/${ticketId}`, 'DELETE');

  if (result.success) {
    log('✅ Ticket deleted successfully', 'green');
    return true;
  } else {
    log('❌ Failed to delete ticket', 'red');
    log(`   Error: ${JSON.stringify(result.data)}`, 'red');
    return false;
  }
}

// Main test runner
async function runTests() {
  log('\n========================================', 'blue');
  log('🚀 BACKEND API TESTS - INVOICES MODULE', 'blue');
  log('========================================\n', 'blue');

  const results = {
    passed: 0,
    failed: 0,
    skipped: 0,
  };

  // Test authentication first
  const authSuccess = await testAuthentication();
  if (authSuccess) {
    results.passed++;
  } else {
    results.failed++;
    log('\n⛔ Authentication failed. Cannot proceed with other tests.', 'red');
    printResults(results);
    return;
  }

  // Test Factures
  let factureId = await testCreateFacture();
  factureId ? results.passed++ : results.failed++;

  (await testGetAllFactures()) ? results.passed++ : results.failed++;
  (await testGetSingleFacture(factureId)) ? results.passed++ : results.failed++;
  (await testUpdateFacture(factureId)) ? results.passed++ : results.failed++;
  (await testGenerateNumero()) ? results.passed++ : results.failed++;

  // Test Tickets
  let ticketId = await testCreateTicket();
  ticketId ? results.passed++ : results.failed++;

  (await testGetAllTickets()) ? results.passed++ : results.failed++;

  // Cleanup - Delete test data
  (await testDeleteFacture(factureId)) ? results.passed++ : results.failed++;
  (await testDeleteTicket(ticketId)) ? results.passed++ : results.failed++;

  // Print final results
  printResults(results);
}

function printResults(results) {
  log('\n========================================', 'blue');
  log('📊 TEST RESULTS SUMMARY', 'blue');
  log('========================================\n', 'blue');

  log(`✅ Passed: ${results.passed}`, 'green');
  log(`❌ Failed: ${results.failed}`, 'red');
  log(`⚠️  Skipped: ${results.skipped}`, 'yellow');

  const total = results.passed + results.failed + results.skipped;
  const percentage = total > 0 ? Math.round((results.passed / total) * 100) : 0;

  log(`\n📈 Success Rate: ${percentage}%`, percentage === 100 ? 'green' : 'yellow');
  log('\n========================================\n', 'blue');
}

// Run the tests
runTests().catch((error) => {
  log(`\n💥 Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
