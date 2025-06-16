const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');

// Load routes
const authRoutes = require('./routes/authRoutes');

// Load models
const User = require('./models/User');
const Product = require('./models/Product'); // ✅ Add Product model here

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);



app.get('/', (req, res) => {
    res.send('BasicShop API is running...');
});

// Connect and sync database
sequelize.authenticate()
    .then(async () => {
        console.log('✅ PostgreSQL connected successfully!');
        await sequelize.sync({ alter: true }); // Creates/updates tables
        app.listen(PORT, () =>
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        );
    })
    .catch((err) => {
        console.error('❌ Unable to connect to PostgreSQL:', err);
    });
