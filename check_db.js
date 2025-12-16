const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Restaurant = require('./src/models/Restaurant');
const Food = require('./src/models/Food');

dotenv.config();

connectDB();

const checkData = async () => {
    try {
        const rCount = await Restaurant.countDocuments();
        const fCount = await Food.countDocuments();
        console.log(`Restaurants found: ${rCount}`);
        console.log(`Foods found: ${fCount}`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
