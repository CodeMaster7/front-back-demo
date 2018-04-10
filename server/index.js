// configuring the .env
// keep in mind, ALWAYS PUT YOUR .ENV IN YOUR .GITIGNORE
// I did not in this case because this is demo code
require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      authenticate = require('./middleware/authenticate'),
      ctrl = require('./controllers/controller');

const app = express(),
      port = 3005;

// TOP LEVEL MIDDLEWARE
app.use(bodyParser.json());

// this is serving up our static frontend files so that we only have to use one server.
// To create a build folder ===>>> npm run build
// Any time you make a change to your react code, you will have to rerun npm run build... which is why it's suggested to wait until you have finished your frontend
// Now that your backend is serving up your frontend, you will not have to run npm start, you will only to use nodemon to run your backend server. You'll then be able to see your app on the port that your server is using. In this case, 3005.
app.use(express.static(`${__dirname}/../build`))

// session is a function from the express-session package required above
// it takes an object as an argument
// this object is the config object for your session
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));

app.get('/api/getUser', ctrl.getUser)
// request level middleware is being used on this endpoint below. Because it's in the endpoint, it will only affect this endpoint.
app.get('/api/secretData', authenticate, ctrl.getSecrets)
app.post('/api/addFav', ctrl.addFav)
app.post('/api/login', ctrl.login)
app.post('/api/logout', ctrl.logout)

app.listen(port, () => console.log(`listening on port ${port}`));