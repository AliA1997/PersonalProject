require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');
const bodyParser = require('body-parser');
const Auth0Lock = require('auth0-lock');

const app = express();

app.use(bodyParser.json())

// app.use(express.static(`${__dirname}/../../public`))

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}))

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
}).catch(err => {
    console.log('DB error', err)
})

const PORT = 3700;

app.listen(PORT, () => console.log(`We be jamming to the tunes of ${PORT}`));