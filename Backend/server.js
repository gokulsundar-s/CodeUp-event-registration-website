const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

app.get('/server_login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/HTML files/server_login.html'));
});

app.get('/server.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/HTML files/server.html'));
});

app.post('/code_confetti', async (req, res) => {
    try {
        const formdata = req.body;
        const check = await codeconfetti.findOne({ email: formdata.email });
        
        if(check){
            res.json({ success: false, message: 'Participant registered already' });
        }

        else{
            if(formdata.roll.length != 8){
                res.json({ success: false, message: 'Invalid roll number' });
            }
            else if(!(formdata.email).includes("@kongu.edu")){
                res.json({ success: false, message: 'Invalid kongu mail ID' });
            }
            else{
                const data = new codeconfetti(formdata);
                await data.save();
                res.json({ success: true, message: 'Registration successful!' }); 
            }
        }
    }
    
    catch (error) {
        res.json({ success: false, message: 'Registration failed. Please try again.' });
    }
});

app.post('/code_craft', async (req, res) => {
    try {
        const formdata = req.body;
        const check = await codecraft.findOne({ email: formdata.email });
        
        if(check){
            res.json({ success: false, message: 'Participant registered already' });
        }

        else{
            if(formdata.roll.length != 8){
                res.json({ success: false, message: 'Invalid roll number' });
            }
            else if(!(formdata.email).includes("@kongu.edu")){
                res.json({ success: false, message: 'Invalid kongu mail ID' });
            }
            else{
                const data = new codecraft(formdata);
                await data.save();
                res.json({ success: true, message: 'Registration successful!' }); 
            }
        }
    }
    
    catch (error) {
        res.json({ success: false, message: 'Registration failed. Please try again.' });
    }
});


app.post('/developnet', async (req, res) => {
    try {
        const formdata = req.body;
        const leadcheck = await developnet.findOne({ leademail: formdata.leademail });
        const membercheck = await developnet.findOne({ memberemail: formdata.memberemail });

        if(leadcheck && membercheck){
            res.json({ success: false, message: 'Both members registered already' });
        }
        
        else if(leadcheck){
            res.json({ success: false, message: 'Team lead registered already' });
        }
        
        else if(membercheck){
            res.json({ success: false, message: 'Team member registered already' });
        }

        else{
            if(formdata.leadroll.length != 8){
                res.json({ success: false, message: 'Invalid lead roll number' });
            }
            else if(formdata.memberroll.length != 8){
                res.json({ success: false, message: 'Invalid member roll number' });
            }
            else if(!(formdata.leademail).includes("@kongu.edu")){
                res.json({ success: false, message: "Invalid lead's kongu mail ID"});
            }
            else if(!(formdata.memberemail).includes("@kongu.edu")){
                res.json({ success: false, message: "Invalid member's kongu mail ID"});
            }
            else if(formdata.memberemail == formdata.memberemail && formdata.memberroll == formdata.leadroll){
                res.json({ success: false, message: "Both member's data are same"});
            }
            else{
                const data = new developnet(formdata);
                await data.save();
                res.json({ success: true, message: 'Registration successful!' }); 
            }
        }
    }
    
    catch (error) {
        res.json({ success: false, message: 'Registration failed. Please try again.' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const formdata = req.body;
        
        if(formdata.mailid == process.env.servermail && formdata.password == process.env.serverpassword){
            res.json({ success: true});
        }
        else{
            res.json({ success: false, message: 'Invalid login credentials' });
        }
    }
    catch (error) {
        res.json({ success: false, message: 'Login failed. Please try again.' });
    }
});

app.listen(process.env.port, () => {
    console.log(`Server is running on Port:${process.env.port}`);
});
