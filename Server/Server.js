require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');
const bodyParser = require('body-parser');
// const Auth0Lock = require('auth0-lock');

const app = express();

app.use(bodyParser.json())

// app.use(express.static(`${__dirname}/../../public`))

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
}).catch(err => {
    console.log('DB error', err)
    console.log(process.env.SESSION_SECRET)
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));


app.post('/', (req, res) => {
    const { userId } = req.body;
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`;
    axios.get(auth0Url, {
        headers: {
            Authorization: 'Bearer ' + process.env.AUTH0_MANAGEMENT_ACCESS_TOKEN
        }
    }).then(response => {
        //Set User Data Object
        const userData = response.data;
        req.session.user = {
            name: userData.name,
            auth0_id: userData.user_id,
            email: userData.email,
            social: userData.picture
        }
        res.status(200).json({ user: req.session.user });
        app.get('db').find_user(userData.user_id).then(users => {
            if(user.length){
                req.session.user = userForDatabase;
                res.json({ user: req.session.user })
            } else {
                app.get('db').create_user([userData.user_id, userData.name, userData.email, userData.picture]).then(() => {
                    req.session.user = userForDatabase;
                    res.json({ user: req.session.user });
                })
            }
        })
    }).catch(err => {
        console.log('USER', error);
        res.status(500).json({message: 'Server 500'});
    })
})

app.get('')

const PORT = 3035;

app.listen(PORT, () => console.log(`We be jamming to the tunes of ${PORT}`));