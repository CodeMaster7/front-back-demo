module.exports = (req, res, next) => {
  // if there's a user object on the session, we know they've already been authenticated so we can move on by invoking next
  if (req.session.user) {
    next()
  } else {
  // if there isn't a user object, we know they haven't logged in and will send a 403
    res.sendStatus(403);
  }
}