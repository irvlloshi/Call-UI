const express = require('express');
const app = require('express')()
const bodyParser = require('body-parser');
const Vonage = require('@vonage/server-sdk');
const path = require('path');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname + '/')))

const TO_NUMBER = process.env.TO_NUMBER;
const VONAGE_NUMBER = process.env.VONAGE_NUMBER;
const vonage = new Vonage({
    apiKey: 'f8a739cb',
    apiSecret: 'X2U6RApqFlI8pybM',
    applicationId: '1839124b-96bb-4202-a558-13a66db164f4',
    privateKey: './private.key'
    })

app.use(bodyParser.json())

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '/', 'index.html'));
    res.render('index');
});

app.post('/outbound-call', (req, res) => {
    res.send("Call being made to" + req.body.name + "at" + req.body.phoneNumber)
    vonage.calls.create({ 
        to: [{
          type: 'phone',
          number: req.body.phoneNumber
        }],
        from: {
          type: 'phone',
          number: 16032064794
        },
        ncco: [{
          action: "talk",
          text: req.body.message + "from" + req.body.name,
          style: 21,
          premium: true,
        }]
      }, (error, response) => {
        if (error) console.error(error)
        if (response) console.log(response)
      })
})

app.listen(5000, () => {
    console.log('Node server is running...')
});