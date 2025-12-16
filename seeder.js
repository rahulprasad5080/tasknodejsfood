const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Restaurant = require('./src/models/Restaurant');
const Food = require('./src/models/Food');
const User = require('./src/models/User');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await Restaurant.deleteMany();
        await Food.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.create([
            {
                name: 'Admin User',
                email: 'admin@admin.com',
                password: 'password123', // Will be hashed by pre-save
                isAdmin: true,
            },
            {
                name: 'John Doe',
                email: 'user@example.com',
                password: 'password123',
                isAdmin: false,
            }
        ]);

        console.log('Data Destroyed...');

        const restaurants = [
            {
                name: 'Tasty Bites',
                address: '123 Main St, New York, NY',
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
                rating: 4.5,
            },
            {
                name: 'Burger Palace',
                address: '456 Market St, San Francisco, CA',
                image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=1172&q=80',
                rating: 4.2,
            },
            {
                name: 'Pizza Heaven',
                address: '789 Broadway, Chicago, IL',
                image: 'https://images.unsplash.com/photo-1590846406792-0fea229f936c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1035&q=80',
                rating: 4.8,
            },
        ];

        const createdRestaurants = await Restaurant.insertMany(restaurants);
        const restaurant1 = createdRestaurants[0]._id;
        const restaurant2 = createdRestaurants[1]._id;
        const restaurant3 = createdRestaurants[2]._id;

        const foods = [
            // Restaurant 1: Tasty Bites
            {
                name: 'Grilled Salmon',
                description: 'Fresh Atlantic salmon grilled to perfection.',
                price: 25.99,
                image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80',
                restaurant: restaurant1,
                category: 'Seafood',
            },
            {
                name: 'Caesar Salad',
                description: 'Crisp romaine lettuce with parmesan and croutons.',
                price: 12.50,
                image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                restaurant: restaurant1,
                category: 'Salad',
            },
            // Restaurant 2: Burger Palace
            {
                name: 'Classic Cheeseburger',
                description: 'Juicy beef patty with cheddar cheese and fresh veggies.',
                price: 14.99,
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
                restaurant: restaurant2,
                category: 'Burgers',
            },
            {
                name: 'Truffle Fries',
                description: 'Crispy fries tossed with truffle oil and parmesan.',
                price: 8.99,
                image: 'https://images.unsplash.com/photo-1573080496987-8198cb147d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80',
                restaurant: restaurant2,
                category: 'Sides',
            },
            // Restaurant 3: Pizza Heaven
            {
                name: 'Margherita Pizza',
                description: 'Classic tomato, mozzarella, and basil pizza.',
                price: 18.00,
                image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
                restaurant: restaurant3,
                category: 'Pizza',
            },
            {
                name: 'Pepperoni Feast',
                description: 'Loaded with pepperoni and extra cheese.',
                price: 22.00,
                image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1160&q=80',
                restaurant: restaurant3,
                category: 'Pizza',
            },
        ];

        await Food.insertMany(foods);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Restaurant.deleteMany();
        await Food.deleteMany();
        // await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
