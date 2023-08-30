function authMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.status(401).send({"message": "Unauthenticated!"})
  }

module.exports = {
    authMiddleware
}