require('dotenv').config();
const { Client } = require('pg');

async function testDatabaseConnection() {
  const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Test query
    const result = await client.query('SELECT * FROM users LIMIT 5;');
    console.log('Query Results:', result.rows);

  } catch (error) {
    console.error('Error connecting or querying the database:', error.message);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
}

testDatabaseConnection();