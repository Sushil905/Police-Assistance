const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

const signToken = (user, secret, expiresIn) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role_name }, secret, { expiresIn });

router.post('/register', async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing registration fields' });
  }

  try {
    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const [roleRow] = await pool.execute('SELECT id FROM roles WHERE name = ?', [role]);
    if (!roleRow.length) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const password_hash = await bcrypt.hash(password, 12);
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash, role_id, phone) VALUES (?, ?, ?, ?, ?)',
      [name, email, password_hash, roleRow[0].id, phone]
    );

    return res.status(201).json({ id: result.insertId, name, email, role });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT u.id, u.name, u.email, u.password_hash, r.name AS role_name
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.email = ?`,
      [email]
    );
    if (!rows.length) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = signToken(user, process.env.JWT_SECRET, '15m');
    const refreshToken = signToken(user, process.env.JWT_REFRESH_SECRET, '7d');

    return res.json({ accessToken, refreshToken, user: { id: user.id, name: user.name, email: user.email, role: user.role_name } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed' });
  }
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'Missing refresh token' });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ id: payload.id, email: payload.email, role: payload.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    return res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});

module.exports = router;
