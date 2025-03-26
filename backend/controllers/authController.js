const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Set default role as "user" if not provided
        const userRole = role || 'user';

        // Create user
        const user = await User.create({ name, email, password: hashedPassword, role: userRole });

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully', 
            user: { id: user._id, name: user.name, email: user.email, role: user.role } 
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Generate token with role
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            success: true, 
            message: 'Login successful', 
            token, 
            user: { id: user._id, name: user.name, email: user.email, role: user.role } 
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
