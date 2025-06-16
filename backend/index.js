const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db');

// Load models
const User = require('./models/User');
const Product = require('./models/Product');

// Load routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('✅ BasicShop API is running...');
});

// Database connection and sync
sequelize.authenticate()
    .then(async () => {
        console.log('✅ PostgreSQL connected successfully!');
        await sequelize.sync(); // Do NOT use force:true in production
        app.listen(PORT, () =>
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        );
    })
    .catch((err) => {
        console.error('❌ Unable to connect to PostgreSQL:', err);
    });

sequelize.sync({ force: true }).then(() => {
    console.log("Database synced.");
});