// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Mock database
let notes = [];

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.post('/notes', (req, res) => {
    const note = req.body;
    notes.push(note);
    res.status(201).json(note);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
