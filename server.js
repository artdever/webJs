const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/flowers', (req, res) => {
    const { latitude, longitude } = req.body;
    const timestamp = new Date().toISOString();

    const log = `${timestamp} - Lat: ${latitude}, Lon: ${longitude}\n`;

    fs.appendFile('locations.txt', log, (err) => {
        if (err) {
            console.error('Error writing location:', err);
            return res.status(500).send('Error saving location');
        }
        res.send('Location saved');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
