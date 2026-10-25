import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { auth } from '../middleware/auth.js';

const r = Router();

// LOGIN
r.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const u = await User.findOne({ email });

    if (!u || u.passwordHash !== password) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const displayName =
      u.email === 'admin@medops.local'
        ? 'Gandhe Varshitha'
        : u.name;

    const token = jwt.sign(
      {
        id: u._id,
        email: u.email,
        name: displayName,
        role: u.role,
        doctorId: u.doctorId
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        name: displayName,
        email: u.email,
        role: u.role,
        doctorId: u.doctorId
      }
    });

  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      message: 'Login failed. Please try again.'
    });
  }
});


// REGISTER
r.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = 'Doctor'
    } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required.'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists.'
      });
    }

    // Create new user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: password,
      role
    });

    // Create token immediately
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        doctorId: user.doctorId
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(201).json({
      message: 'Account created successfully.',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        doctorId: user.doctorId
      }
    });

  } catch (error) {
    console.error('Registration error:', error);

    res.status(500).json({
      message: 'Registration failed. Please try again.'
    });
  }
});


// CURRENT USER
r.get('/me', auth, (req, res) =>
  res.json({
    user: req.user
  })
);

export default r;