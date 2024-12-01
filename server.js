const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(express.json());


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});


(async () => {
  const client = await pool.connect();
  try {
   
    await client.query(`
      CREATE TABLE IF NOT EXISTS Greetings (
        id SERIAL PRIMARY KEY,
        timeOfDay TEXT NOT NULL,
        language TEXT NOT NULL,
        greetingMessage TEXT NOT NULL,
        tone TEXT NOT NULL
      )
    `);

    
    const result = await client.query('SELECT COUNT(*) AS count FROM Greetings');
    if (parseInt(result.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO Greetings (timeOfDay, language, greetingMessage, tone)
        VALUES
          ('Morning', 'English', 'Good Morning!', 'Formal'),
          ('Afternoon', 'English', 'Good Afternoon!', 'Casual'),
          ('Evening', 'English', 'Good Evening!', 'Formal'),
          ('Morning', 'French', 'Bonjour!', 'Casual'),
          ('Afternoon', 'Spanish', '¡Buenas Tardes!', 'Formal'),
          ('Evening', 'French', 'Bonsoir!', 'Formal')
      `);
      console.log('Database seeded with initial data.');
    }
  } catch (error) {
    console.error('Error setting up the database:', error.message);
  } finally {
    client.release();
  }
})();


app.post('/api/greet', async (req, res) => {
  const { timeOfDay, language, tone } = req.body;

  try {
    const result = await pool.query(
      'SELECT greetingMessage FROM Greetings WHERE timeOfDay = $1 AND language = $2 AND tone = $3',
      [timeOfDay, language, tone]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Greeting not found for the given parameters' });
    }

    res.json({ greetingMessage: result.rows[0].greetingmessage });
  } catch (error) {
    console.error('Error in /api/greet:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/times-of-day', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT timeOfDay FROM Greetings');
    res.json({ timesOfDay: result.rows.map(row => row.timeofday) });
  } catch (error) {
    console.error('Error in /api/times-of-day:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/languages', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT language FROM Greetings');
    res.json({ languages: result.rows.map(row => row.language) });
  } catch (error) {
    console.error('Error in /api/languages:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.get('/', (req, res) => {
  res.send('Welcome to the Greetings API!');
});


if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;



