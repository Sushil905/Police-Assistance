const express = require('express');
const pool = require('../db');
const { authenticate, authorize } = require('../middleware');
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  const { role, id } = req.user;
  try {
    let query = `SELECT c.*, u.name AS reporter FROM complaints c JOIN users u ON c.user_id = u.id`;
    const params = [];

    if (role === 'Public User') {
      query += ' WHERE c.user_id = ?';
      params.push(id);
    }

    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to load complaints' });
  }
});

router.post('/', authenticate, authorize('Public User'), async (req, res) => {
  const { title, description, category, location } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO complaints (user_id, title, description, category, location) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, title, description, category, location]
    );
    res.status(201).json({ id: result.insertId, title, status: 'Pending' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Complaint submission failed' });
  }
});

router.put('/:id/status', authenticate, authorize('Police Officer', 'Admin'), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['Pending', 'Investigating', 'Solved', 'Closed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    await pool.execute('UPDATE complaints SET status = ? WHERE id = ?', [status, id]);
    res.json({ id, status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to update status' });
  }
});

module.exports = router;
