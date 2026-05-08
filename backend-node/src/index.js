const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const uploadRoutes = require('./routes/uploads');
const locationRoutes = require('./routes/locations');
const newsRoutes = require('./routes/news');

dotenv.config();
const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(fileUpload({ createParentPath: true, limits: { fileSize: 20 * 1024 * 1024 } }));
app.use('/uploads', express.static(process.env.UPLOAD_DIR || 'uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api', locationRoutes);
app.use('/api', newsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, host, () => {
  console.log(`Node auth service listening on http://${host}:${port}`);
});
