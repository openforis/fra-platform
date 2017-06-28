const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const userRepository = require('../user/userRepository')
const R = require('ramda')

module.exports.init = app => {

  app.use(express.static('public'))
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(session({
    secret: 'loggedInUser',
    name: 'loggedInUser',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false}
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new GoogleStrategy({
      clientID: '1011844730374-24343gagnjfauhn43of92kgvj7jffoe2.apps.googleusercontent.com',
      clientSecret: 'PhG3-PKrEu2KytSjCAeoJjrv',
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) =>
      userRepository
        .findUserByLoginEmails(profile.emails.map(e => e.value))
        .then(user => user ? done(null, user) : done(null, false, {message: 'User not authorized'}))
  ))

  passport.serializeUser(function (user, done) {
    console.log('=== serializeUser user ', user)
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    console.log('=== deserializeUser user ', user)
    done(null, user)
  })

  app.get('/auth/google',
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email']}))

  app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => res.redirect('/#/country/ITA')
  )
}
