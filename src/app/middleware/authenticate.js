module.exports = {
  authenticate: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next()
    }
    req.flash('error', 'you not loggin')
    res.redirect('/login')
  }
}

