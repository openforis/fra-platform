const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

module.exports.init = (app, verifyCallback) => {

  app.use(express.static('public'))
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(session({
    secret: 'loggedInUser',
    name: 'loggedInUser',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false}
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new GoogleStrategy({
      clientID: '1011844730374-24343gagnjfauhn43of92kgvj7jffoe2.apps.googleusercontent.com',
      clientSecret: 'PhG3-PKrEu2KytSjCAeoJjrv',
      callbackURL: '/auth/google/callback'
    },
    verifyCallback
  ))

  passport.serializeUser((user, done) => done(null, user))

  passport.deserializeUser((user, done) => done(null, user))

}
