const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "https://foodreactjs.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/restaurants', require('./src/routes/restaurantRoutes'));
app.use('/api/foods', require('./src/routes/foodRoutes'));
app.use('/api/cart', require('./src/routes/cartRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
