const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const userRepository = require('../user/userRepository')
const R = require('ramda')

module.exports.init = app => {

  // app.configure(() => {
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
  // })

  passport.use(new GoogleStrategy({
      clientID: '1011844730374-24343gagnjfauhn43of92kgvj7jffoe2.apps.googleusercontent.com',
      clientSecret: 'PhG3-PKrEu2KytSjCAeoJjrv',
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      const user = R.pipe(R.dissoc('_raw'), R.dissoc('_json'))(profile)
      console.log('===== user ', user)
      return done(null, user)
      // User.findOrCreate({googleId: profile.id}, function (err, user) {
      //   return done(err, user)
      // })
    }
  ))

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    // User.findById(id, function(err, user) {
    const user = {
      id: '000',
      displayName: 'Mino Togna',
      name: {familyName: 'Togna', givenName: 'Mino'},
      photos: [{value: 'https://lh5.googleusercontent.com/-eYkPADSj8hI/AAAAAAAAAAI/AAAAAAAABiE/S57ZUPD5IAg/photo.jpg?sz=50'}],
      provider: 'google',
    }
    done(null, user)
    // })
  })

  app.get('/auth/google',
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email']}))

  app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => res.redirect('/#/country/ITA')
  )
}
