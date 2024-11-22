const express = require('express');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());


let db;
(async () => {
  db = await sqlite.open({
    filename: './data/database.db',
    driver: sqlite3.Database
  });


  await db.exec(`
    CREATE TABLE IF NOT EXISTS Greetings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timeOfDay TEXT NOT NULL,
      language TEXT NOT NULL,
      greetingMessage TEXT NOT NULL,
      tone TEXT NOT NULL
    )
  `);


  const initialData = [
    { timeOfDay: 'Morning', language: 'English', greetingMessage: 'Good Morning!', tone: 'Formal' },
    { timeOfDay: 'Afternoon', language: 'English', greetingMessage: 'Good Afternoon!', tone: 'Casual' },
    { timeOfDay: 'Evening', language: 'English', greetingMessage: 'Good Evening!', tone: 'Formal' },
    { timeOfDay: 'Morning', language: 'French', greetingMessage: 'Bonjour!', tone: 'Casual' },
    { timeOfDay: 'Afternoon', language: 'Spanish', greetingMessage: '¡Buenas Tardes!', tone: 'Formal' },
    { timeOfDay: 'Evening', language: 'French', greetingMessage: 'Bonsoir!', tone: 'Formal' }
  ];

  const count = await db.get('SELECT COUNT(*) AS count FROM Greetings');
  if (count.count === 0) {
    for (const greeting of initialData) {
      await db.run(
        `INSERT INTO Greetings (timeOfDay, language, greetingMessage, tone) VALUES (?, ?, ?, ?)`,
        [greeting.timeOfDay, greeting.language, greeting.greetingMessage, greeting.tone]
      );
    }
    console.log('Database seeded with initial data.');
  }
})();


app.post('/api/greet', async (req, res) => {
  const { timeOfDay, language, tone } = req.body;

  try {
    const greeting = await db.get(
      'SELECT greetingMessage FROM Greetings WHERE timeOfDay = ? AND language = ? AND tone = ?',
      [timeOfDay, language, tone]
    );

    if (!greeting) {
      return res.status(404).json({ error: 'Greeting not found for the given parameters' });
    }

    res.json({ greetingMessage: greeting.greetingMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/times-of-day', async (req, res) => {
  try {
    const timesOfDay = await db.all('SELECT DISTINCT timeOfDay FROM Greetings');
    res.json({ timesOfDay: timesOfDay.map(row => row.timeOfDay) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/languages', async (req, res) => {
  try {
    const languages = await db.all('SELECT DISTINCT language FROM Greetings');
    res.json({ languages: languages.map(row => row.language) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
