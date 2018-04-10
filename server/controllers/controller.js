module.exports = {
  getUser: (req, res) => {
    // if there's a user on the session, send that user back, otherwise send a 404 - not found
    if(req.session.user) {
      res.status(200).send(req.session.user)
    } else res.sendStatus(404)
  },
  getSecrets: (req, res) => {
    // send the secret! but keep in mind, the endpoint has authentication middleware that will run before this handler function will run. If the user is not authenticated, they'll receive a 403 instead.
    res.status(200).send({secret: 'this is my super cool secret... '})
  },
  addFav: (req, res) => {
    // Add a favorite thing to the session object
    req.session.user.favorites.push(req.body)
    res.status(200).send(req.session.user.favorites)
  },
  login: (req, res) => {
    let { password, username } = req.body;
    // if the password and username match the ones we have on record in our .env, then add to the session object a user property with the value of an object
    if(password === process.env.PASSWORD && username === process.env.USER_NAME) {
      req.session.user = {
        name: username,
        favorites: []
      };
      // send back the newly created user
      res.status(200).send(req.session.user);
    } else {
      res.sendStatus(403);
    }
  },
  logout: (req, res) => {
    // req.session.destroy will destroy (delete) the session 
    req.session.destroy()
    res.sendStatus(200)
  }
}