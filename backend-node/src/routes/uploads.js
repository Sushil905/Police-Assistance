const express = require('express');
const path = require('path');
const fs = require('fs');
const { authenticate } = require('../middleware');
const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const file = req.files.file;
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    return res.status(400).json({ message: 'Unsupported file type' });
  }

  const uploadDir = process.env.UPLOAD_DIR || 'uploads';
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, filename);
  await file.mv(filePath);

  res.json({ url: `/uploads/${filename}`, name: file.name, type: file.mimetype });
});

module.exports = router;
