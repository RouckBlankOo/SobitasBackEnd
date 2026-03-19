const mongoose = require('mongoose');

// Use same URI as backend
const uri = 'mongodb://localhost:27017/sobitas-db';

async function checkOrders() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        // Try to find orders in the 'orders' collection
        const orders = await mongoose.connection.db.collection('orders').find({}).toArray();
        console.log(`Found ${orders.length} orders`);
        if (orders.length > 0) {
            console.log('First order status:', orders[0].status);
            console.log('First order customer:', orders[0].customerEmail);
        }

        const users = await mongoose.connection.db.collection('users').find({ role: 'user' }).toArray();
        console.log(`Found ${users.length} users with role 'user'`);

        await mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err);
    }
}

checkOrders();
