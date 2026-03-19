const mongoose = require('mongoose');

// Use same URI as backend
const uri = 'mongodb://localhost:27017/sobitas-db';

async function checkDetailedCounts() {
    try {
        await mongoose.connect(uri);
        console.log('--- DB DIAGNOSTIC ---');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections present:', collections.map(c => c.name).join(', '));

        const orderCount = await mongoose.connection.db.collection('orders').countDocuments();
        console.log('TOTAL ORDERS IN DB:', orderCount);

        const userCount = await mongoose.connection.db.collection('users').countDocuments({ role: 'user' });
        console.log('TOTAL CLIENTS (role: user) IN DB:', userCount);

        const allUsers = await mongoose.connection.db.collection('users').find({}).toArray();
        const roles = allUsers.reduce((acc, u) => {
            acc[u.role] = (acc[u.role] || 0) + 1;
            return acc;
        }, {});
        console.log('User roles distribution:', JSON.stringify(roles));

        if (orderCount > 0) {
            const firstOrder = await mongoose.connection.db.collection('orders').findOne({});
            console.log('Sample Order Keys:', Object.keys(firstOrder).join(', '));
        }

        await mongoose.disconnect();
        console.log('--- END DIAGNOSTIC ---');
    } catch (err) {
        console.error('DIAGNOSTIC ERROR:', err);
    }
}

checkDetailedCounts();
