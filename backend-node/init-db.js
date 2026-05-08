const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDatabase() {
  let connection;

  try {
    // Connect without database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    // Read and execute the SQL file
    const sqlFile = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    // Split by semicolon and execute each statement
    const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
        console.log('Executed:', statement.trim().substring(0, 50) + '...');
      }
    }

    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initDatabase();
