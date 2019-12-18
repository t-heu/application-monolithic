const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('./auth/auth')(passport)

require('./database');

app.use(session({
  secret: 'secrett',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.error = req.flash('error')
  res.locals.name = req.name || null;
  next()
})

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(express.static('public'))
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use('/', require('./routes'))

app.listen(3000)
