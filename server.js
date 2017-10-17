const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express(); 

hbs.registerPartials(__dirname + '/views/partials');
app.set('express_viewer', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var timestamp = new Date().toString();
    var log = `${timestamp}: ${req.method} ${req.originalUrl}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Not able to log events');
        }
    });
    next();
});

app.use((req, res) => {
    res.render(__dirname + "/views/maintenance.hbs")
});

app.get('/',(req, res) => {
    res.render(__dirname + "/views/home.hbs", {
        pageTitle: "Welcome Page",
        welcomeMessage: "yo", 
        year: new Date().getFullYear()
    });
});

app.get('/about',(req, res) => {
    res.render(__dirname + "/views/about.hbs", {
        pageTitle: "About Page",
        year: new Date().getFullYear()
    });
});

app.get('/bad',(req, res) => {
    res.send({
        "errorId": 1,
        "errorMessage": 'Request cannot be executed'
    });
});

app.listen(3000, () => {
    console.log('server is up')
});