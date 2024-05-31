const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(process.env.mongodb_url);

const codeconfetti = mongoose.model('codeconfetti', {
    name: String,
    roll: String,
    year: String,
    section: String,
    email: String,
    phone: String,
  });

  const codecraft = mongoose.model('codecraft', {
    name: String,
    roll: String,
    year: String,
    section: String,
    email: String,
    phone: String,
  });

  const developnet = mongoose.model('developnet', {
    teamname: String,
    leadname: String,
    leadroll: String,
    leadyear: String,
    leadsection: String,
    leademail: String,
    leadphone: String,
    membername: String,
    memberroll: String,
    memberyear: String,
    membersection: String,
    memberemail: String,
    memberphone: String,
  });
  
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

app.post('/code_confetti', (req, res) => {
    const formdata = req.body;
    const data = new codeconfetti(formdata);
    data.save();
});

app.post('/code_craft', (req, res) => {
    const formdata = req.body;
    const data = new codecraft(formdata);
    data.save();
});

app.post('/developnet', (req, res) => {
    const formdata = req.body;
    const data = new developnet(formdata);
    data.save();
});

app.listen(process.env.port, () => {
    console.log(`Server is running on http://localhost:${process.env.port}`);
});
