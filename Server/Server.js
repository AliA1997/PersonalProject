require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  axios = require("axios"),
  bodyParser = require("body-parser"),
  parser = require("xml2json"),
  multer = require("multer"),
  corsPrefetch = require("cors-prefetch-middleware"),
  imagesUpload = require("images-upload-middleware"),
  actrl = require("./controllers/account_controller"),
  ictrl = require("./controllers/image_controller");

const app = express();

app.use(bodyParser.json());

app.use("/static", express.static(`./server/static`));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  })
);

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => {
    console.log("DB error", err);
  });

// const s3 = new AWS.S3();
// AWS.config.update(
//     {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     });

// app.get('/sign_s3', require('react-s3-upload/S3Sign')({
//     S3_BUCKET: 'seize-the-dream',
//     unique: false
// }));

//PULLING IMAGES FROM API OR S3
app.get("/home", (req, res) => {
  axios
    .get("http://seize-the-dream.s3-accelerate.amazonaws.com")
    .then(response => {
      var json = parser.toJson(response.data);
      var j = JSON.parse(json);
      // console.log(json);
      res.status(200).json(j);
    });
});

//PULL IMAGES FROM PIXABAY API
// app.get('/home', (req, res) => {
//     axios.get('https://pixabay.com/api/?key=7703828-b2519c19690dcf8fd273b3f34&category=nature').then(response => {
//         const j = response.data.hits;
//         const pics = j.map(elem => {
//             return elem.webformatURL
//         })
//         res.status(200).json(pics)
//     })
// })

//PULL QUOTE OF DAY FROM API
app.get("/homes", (req, res) => {
  axios.get("http://quotes.rest/qod.json").then(response => {
    const data = response.data;
    res.json(data);
  });
});

app.get("/myimages/:userid", (req, res) => {
  app
    .get("db")
    .view_image(req.params.userid)
    .then(images => {
      res.send(images);
    });
});


//JOIN statement, needs Update
app.get("/mydreams/:userid", actrl.getAccount);

//Upload Image
app.post("/uploadimage/:userid", ictrl.addImage);

app.get('/getcategory', (req, res) => {
  app.get('db')
  .get_cat()
  .then(categories => {
    res.send(categories);
  })
})


//Delete Image
app.delete("/deletedream/:id/:userid", (req, res) => {
  app
    .get("db")
    .delete_image(req.params.id, req.params.userid)
    .then(images => {
      res.send(images);
    });
});

//Edit Image
app.get(`/alterdream/:id`, (req, res) => {
  app.get('db')
  .get_image([req.params.id])
  .then(image => {
    res.send(image)
  })
})

//Update image in Database
app.patch(`/alterdream/:text/:id`, (req, res) => {
  app.get('db')
  .update_image(req.params.text, req.params.id)
  .then(() => {
    res.send('')
  })
})

//Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.send();
})


//For Development purposes - Erase when using Auth
app.post("/login", (req, res) => {
  const { userId } = req.body;
  const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`;
  axios.get(auth0Url, {
      headers: {
          Authorization: 'Bearer ' + process.env.AUTH0_MANAGEMENT_ACCESS_TOKEN
      }
  }).then(response => {
      //Set User Data Object
      const userData = response.data;
      //Find if user is already in database.
      app.get('db').find_user(userData.user_id).then(users => {
          if(users.length){
              req.session.user = users[0];
              res.json({ user: req.session.user })
          } else {
              //If no user in Database, Create new User.
              app.get('db').create_user([userData.user_id, userData.name, userData.email, userData.picture]).then(user => {
                  req.session.user = user[0];
                  res.json({ user: req.session.user });
              })
          }
      }).catch(err => console.log('sup', err))
  }).catch(err => {
      console.log('USER', err);
      res.status(500).json({message: 'Server 500'});
  })
});

//Attempting to use react-images-uploader
// app.post('/notmultiple', imagesUpload(
//     './server/static/files',
//     'http://localhost:3035/static/files'
// ));

function checkLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
}

app.get("/user-data", checkLoggedIn, (req, res) => {
  if (req.session.user) {
    res.status(200).send(req.session.user);
  } else {
    res.status(403).send('You must login');
  }
});

const PORT = 3035;

app.listen(PORT, () => console.log(`We be jamming to the tunes of ${PORT}`));
