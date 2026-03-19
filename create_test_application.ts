
import mongoose from 'mongoose';

const AthleteApplicationStatus = {
    NONE: 'none',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
};

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    userRole: String,
    athleteApplicationStatus: String,
    bio: String,
    socialLinks: Object,
}, { strict: false });

async function seed() {
    try {
        await mongoose.connect('mongodb://localhost:27017/sobitas-db');
        console.log('Connected to MongoDB');

        const User = mongoose.model('User', userSchema);

        // Check if pending app exists
        const pending = await User.findOne({ athleteApplicationStatus: 'pending' });
        if (pending) {
            console.log('Found existing pending application:', pending.email);
        } else {
            console.log('No pending application found. Creating dummy one...');
            const dummyEmail = 'athlete_candidate@test.com';
            let user = await User.findOne({ email: dummyEmail });

            if (!user) {
                user = await User.create({
                    email: dummyEmail,
                    firstName: 'John',
                    lastName: 'Candidate',
                    userRole: 'client',
                    password: 'hashedpassword', // Dummy
                    athleteApplicationStatus: 'pending',
                    bio: 'I am a fitness enthusiast with 10k followers on Instagram.',
                    socialLinks: { instagram: 'https://instagram.com/johnfit' }
                });
                console.log('Created new user with pending application:', user.email);
            } else {
                user.athleteApplicationStatus = 'pending';
                user.bio = 'Updated bio for testing application.';
                user.socialLinks = { instagram: 'https://instagram.com/johnfit_updated' };
                await user.save();
                console.log('Updated existing user with pending application:', user.email);
            }
        }
        process.exit(0);
    } catch (error) {
        console.error('Error seeding:', error);
        process.exit(1);
    }
}

seed();
