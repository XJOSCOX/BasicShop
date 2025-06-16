const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // Move this AFTER express()

dotenv.config();

const app = express(); // 🔴 Make sure this comes before app.use()

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('BasicShop API is running...');
});

// Sync and start server
const User = require('./models/User');

sequelize.authenticate()
    .then(async () => {
        console.log('✅ PostgreSQL connected successfully!');
        await sequelize.sync({ alter: true }); // Sync models
        app.listen(PORT, () =>
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        );
    })
    .catch((err) => {
        console.error('❌ Unable to connect to PostgreSQL:', err);
    });
