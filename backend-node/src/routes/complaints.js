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
    const [statusRows] = await pool.execute('SELECT status_id FROM complaint_status WHERE status_name = ?', ['Pending']);
    const [result] = await pool.execute(
      'INSERT INTO complaints (user_id, title, description, category, location, status_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, title, description, category, location, statusRows[0]?.status_id || null, 'Pending']
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
  if (!['Pending', 'Accepted', 'Under Investigation', 'Resolved'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const [statusRows] = await pool.execute('SELECT status_id FROM complaint_status WHERE status_name = ?', [status]);
    await pool.execute('UPDATE complaints SET status = ?, status_id = ? WHERE complaint_id = ?', [status, statusRows[0]?.status_id || null, id]);
    res.json({ id, status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to update status' });
  }
});

module.exports = router;
