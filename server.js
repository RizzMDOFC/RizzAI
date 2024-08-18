const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.json());

const databasePath = path.join(__dirname, 'database.json');

// Load the database
const loadDatabase = () => {
    if (fs.existsSync(databasePath)) {
        const data = fs.readFileSync(databasePath);
        return JSON.parse(data);
    } else {
        return [];
    }
};

// Save to the database
const saveToDatabase = (data) => {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 4));
};

// API to handle generation
app.post('/generate', (req, res) => {
    const prompt = req.body.prompt;
    const sanitizedPrompt = prompt.replace(/\s+/g, '-').toLowerCase();
    const generatedURL = `/generated/${sanitizedPrompt}`;

    // Load existing data
    let database = loadDatabase();

    // Add new entry
    database.push({ prompt, url: generatedURL });

    // Save back to database
    saveToDatabase(database);

    res.json({ url: generatedURL });
});

// Handle generated pages (this is a simple example)
app.get('/generated/:id', (req, res) => {
    const id = req.params.id;
    res.send(`<h1>Website untuk "${id.replace(/-/g, ' ')}"</h1><p>Ini adalah halaman yang dihasilkan untuk prompt: "${id.replace(/-/g, ' ')}"</p>`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
      
