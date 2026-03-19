/**
 * Migration Script for Document Types
 * This script migrates existing factures with generic 'facture' type to proper specific types
 * based on their numero prefix pattern
 */

const { MongoClient } = require('mongodb');

// Configuration
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = 'sobitas'; // Update this to match your database name

// Migration rules based on numero prefix
const MIGRATION_RULES = [
    { pattern: /^BC-/i, newType: 'bon_commande', description: 'Bon de Commande' },
    { pattern: /^BL-/i, newType: 'bon_livraison', description: 'Bon de Livraison' },
    { pattern: /^DEV-/i, newType: 'devis', description: 'Devis' },
    { pattern: /^FAC-.*CLIENT/i, newType: 'facture_client', description: 'Facture Client' },
    { pattern: /^FAC-.*BOUTIQUE/i, newType: 'facture_boutique', description: 'Facture  Boutique' },
    { pattern: /^FAC-.*TVA/i, newType: 'facture_tva', description: 'Facture TVA' },
];

async function migrateDocumentTypes() {
    console.log('🔄 Starting Document Type Migration...\n');
    console.log('='.repeat(60));

    let client;

    try {
        // Connect to MongoDB
        console.log(`\n📡 Connecting to MongoDB at ${MONGO_URI}...`);
        client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log('✅ Connected successfully\n');

        const db = client.db(DATABASE_NAME);
        const collection = db.collection('factures');

        // Get count of factures with generic 'facture' type
        const genericCount = await collection.countDocuments({ type: 'facture' });
        console.log(`📊 Found ${genericCount} documents with generic 'facture' type\n`);

        if (genericCount === 0) {
            console.log('✨ No migration needed! All documents already have specific types.');
            return;
        }

        // Fetch all generic factures
        const genericFactures = await collection.find({ type: 'facture' }).toArray();

        let migratedCount = 0;
        let skippedCount = 0;
        const migrationResults = [];

        // Process each facture
        for (const facture of genericFactures) {
            const numero = facture.numero;
            let migrated = false;

            // Try to match with migration rules
            for (const rule of MIGRATION_RULES) {
                if (rule.pattern.test(numero)) {
                    console.log(`📝 Migrating: ${numero} → ${rule.newType} (${rule.description})`);

                    // Update the document
                    const result = await collection.updateOne(
                        { _id: facture._id },
                        { $set: { type: rule.newType } }
                    );

                    if (result.modifiedCount > 0) {
                        migratedCount++;
                        migrationResults.push({
                            numero,
                            oldType: 'facture',
                            newType: rule.newType,
                            status: 'SUCCESS'
                        });
                        migrated = true;
                    }
                    break;
                }
            }

            if (!migrated) {
                console.log(`⚠️  Skipped: ${numero} (no matching pattern)`);
                skippedCount++;
                migrationResults.push({
                    numero,
                    oldType: 'facture',
                    newType: null,
                    status: 'SKIPPED'
                });
            }
        }

        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('\n📊 MIGRATION SUMMARY');
        console.log('='.repeat(60));
        console.log(`✅ Successfully migrated: ${migratedCount}`);
        console.log(`⚠️  Skipped (no pattern match): ${skippedCount}`);
        console.log(`📈 Total processed: ${genericFactures.length}`);

        // Detailed results
        console.log('\n📋 DETAILED RESULTS:');
        console.log('='.repeat(60));

        const grouped = migrationResults.reduce((acc, result) => {
            const key = result.newType || 'SKIPPED';
            if (!acc[key]) acc[key] = [];
            acc[key].push(result.numero);
            return acc;
        }, {});

        Object.entries(grouped).forEach(([type, numeros]) => {
            const icon = type === 'SKIPPED' ? '⚠️' : '✅';
            console.log(`\n${icon} ${type}: ${numeros.length} documents`);
            if (numeros.length <= 10) {
                numeros.forEach(n => console.log(`   - ${n}`));
            } else {
                numeros.slice(0, 5).forEach(n => console.log(`   - ${n}`));
                console.log(`   ... and ${numeros.length - 5} more`);
            }
        });

        // Final verification
        console.log('\n' + '='.repeat(60));
        console.log('\n🔍 VERIFICATION');
        console.log('='.repeat(60));

        const typeCounts = await collection.aggregate([
            { $group: { _id: '$type', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]).toArray();

        console.log('\nDocument types after migration:');
        typeCounts.forEach(({ _id, count }) => {
            console.log(`  ${_id || 'null'}: ${count}`);
        });

        console.log('\n✅ Migration completed successfully!');
        console.log('='.repeat(60) + '\n');

    } catch (error) {
        console.error('\n❌ Migration failed:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
            console.log('📡 Disconnected from MongoDB\n');
        }
    }
}

// Dry run option
async function dryRun() {
    console.log('🔍 DRY RUN MODE - No changes will be made\n');
    console.log('='.repeat(60));

    let client;

    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();

        const db = client.db(DATABASE_NAME);
        const collection = db.collection('factures');

        const genericFactures = await collection.find({ type: 'facture' }).toArray();

        console.log(`\n📊 Found ${genericFactures.length} documents with generic 'facture' type\n`);

        const preview = {};

        for (const facture of genericFactures) {
            const numero = facture.numero;
            let matched = false;

            for (const rule of MIGRATION_RULES) {
                if (rule.pattern.test(numero)) {
                    if (!preview[rule.newType]) preview[rule.newType] = [];
                    preview[rule.newType].push(numero);
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                if (!preview['SKIPPED']) preview['SKIPPED'] = [];
                preview['SKIPPED'].push(numero);
            }
        }

        console.log('Would migrate:');
        Object.entries(preview).forEach(([type, numeros]) => {
            const icon = type === 'SKIPPED' ? '⚠️' : '✅';
            console.log(`\n${icon} ${type}: ${numeros.length} documents`);
            if (numeros.length <= 10) {
                numeros.forEach(n => console.log(`   - ${n}`));
            } else {
                numeros.slice(0, 5).forEach(n => console.log(`   - ${n}`));
                console.log(`   ... and ${numeros.length - 5} more`);
            }
        });

        console.log('\n💡 Run without --dry-run to execute migration');
        console.log('='.repeat(60) + '\n');

    } catch (error) {
        console.error('\n❌ Dry run failed:', error.message);
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

// Main execution
const isDryRun = process.argv.includes('--dry-run');

if (isDryRun) {
    dryRun().catch(console.error);
} else {
    console.log('\n⚠️  WARNING: This will modify your database!');
    console.log('💡 Run with --dry-run first to preview changes\n');

    migrateDocumentTypes().catch(error => {
        console.error('Migration error:', error);
        process.exit(1);
    });
}
