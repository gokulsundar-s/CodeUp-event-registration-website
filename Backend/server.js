const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/HTML files/index.html'));
});

app.get('/code_confetti.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/HTML files/code_confetti.html'));
});

app.get('/code_craft.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/HTML files/code_craft.html'));
});

app.get('/developnet.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/HTML files/developnet.html'));
});

app.post('/codeconfetti', (req, res) => {
    const formData = req.body;
    console.log('Form Data:', formData);

    res.send('<h1>Form data received</h1><p>Thank you for your submission.</p>');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
