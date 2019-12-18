const express = require('express')
const routes = express.Router()

const control = require('./app/controllers/controller')
const { authenticate } = require('./app/middleware/authenticate')

//CRUD
routes.get('/', control.index)
routes.get('/posts/:id', control.findall)

//signup
routes.get('/signup', control.signup)
routes.post('/signup/auth', control.signup_auth)

//login
routes.get('/login', control.login)
routes.post('/login/auth', control.login_auth)

//registro de post
routes.get('/app/register', authenticate, control.register)
routes.post('/app/register/auth', control.ok)

module.exports = routes

