const User = require('../models/User')
const Post = require('../models/Post')
const { Op } = require('sequelize')
const passport = require('passport')

module.exports = {
  async index(req, res) {
    const post = await Post.findAll({order: [['createdAt', 'DESC']]})
    res.render('index', {posts: post})
  },
  async login(req, res) {
    res.render('login')
  },
  async login_auth(req, res, next) {
    const { name, password } = req.body
    let error = []

    if(req.body.name == "" || req.body.password == "") {
      error.push({alert: "fields are empty"})
    }

    if(error.length > 0) {
      res.render('login', {error1: error})
    } else {
      passport.authenticate('local', {
       successRedirect: "/app/register",
       failureRedirect: "/login",
       failureFlash: true
      })(req, res, next)
    }
  },
  async signup(req, res) {
    res.render('signup')
  },
  async signup_auth(req, res) {
    const { email, name, password } = req.body
    
    let error = []
    
    const verif = await User.findOne({
      where: {
        [Op.or]: [{name}, {email}]
      }
    })

    if(req.body.email == "" || req.body.password == "" || req.body.name == "") {
      error.push({alert: "fields are empty"})
    }
    
    if(verif) {
      error.push({alert: 'User/Email already exist'})
    }

    if(error.length > 0) {
      res.render('signup', {error: error})
    } else {
      const data = await User.create({
      email,
      name,
      password
      })
      res.redirect('/')
    }
  },  
  async register(req, res) {
    res.render('form')
  },
  async ok(req, res) {
    const { topic, title, text, sub_title, image_link, tags, author } = req.body

    let error = []

    if (req.body.topic == "" || req.body.title == "" || req.body.text == "" || req.body.tags == "" || req.body.sub_title == "" || req.body.image_link == "") {
      error.push({alert: "fields are empty"})
    }
    if (req.body.topic.length < 5 || req.body.title < 5 || req.body.text < 20 || req.body.tags < 1) {
      error.push({alert: "the fields entered are less than five"})
    }

    if (error.length > 0) {
      res.render('form', {error: error})
    } else {
      const data = await Post.create({
      topic,
      title,
      text,
      sub_title,
      image_link,
      tags,
      author,
      })
      res.redirect('/')
    } 
  },
  async findall(req, res) {
    const list = await Post.findOne({ where: { id: req.params.id } })
    res.render('posts', {posts: list})
  },
  async update(req, res) {
    const up_u = await User.update({ name: 'baz'}, {where: {id: req.params.id}})
    res.json(up_u)
  },
  async delete(req, res) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json('Im in delete'); 
  },
}

