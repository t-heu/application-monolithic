const localpass = require('passport-local').Strategy
const Sequelize = require('sequelize')
const User = require('../app/models/User')

module.exports = function(passport) {
  passport.use(new localpass({usernameField: 'name', passwordField: 'password'}, (name, password, done) => {
    
    User.findOne({ where: {name: name}}).then(name => {
      
      if(!name) {
        return done(null, false, {message: 'account not exist'})
      }

      if(password == name.password) {
        return done(null, name)    
      } else {  
        return done(null, false, {message: 'password not exist'})
      }
    })
  }))
  
  passport.serializeUser((name, done) => {
    done(null, name.id)
  })
  
  passport.deserializeUser((id, done)  => {
    User.findByPk(id).then(name => {
      done(null, name)
    })
  })
}

