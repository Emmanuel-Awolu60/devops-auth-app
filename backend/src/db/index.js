const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const initDB = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(100)        NOT NULL,
        email       VARCHAR(150) UNIQUE NOT NULL,
        password    TEXT                NOT NULL,
        created_at  TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ Database ready — users table exists");
  } catch (err) {
    console.error("❌ DB init error:", err.message);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { pool, initDB };
