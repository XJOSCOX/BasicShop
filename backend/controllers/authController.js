const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER CONTROLLER
exports.register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            address,
            city,
            state,
            country,
            postalCode,
        } = req.body;

        // Check if email is already in use
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            city,
            state,
            country,
            postalCode,
            role: 'user', // force default role
        });

        res.status(201).json({ message: 'User account created successfully' });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error while registering' });
    }
};

// LOGIN CONTROLLER
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        // Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                city: user.city,
                state: user.state,
                country: user.country,
                postalCode: user.postalCode,
            },
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error while logging in' });
    }
};
