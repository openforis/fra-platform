const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const marked = require('marked')
const R = require('ramda')
const { checkParamHasAllowedValues, checkParamValueIsAllowed } = require('../utils/accessControl')

const getDefinition = (name, lang) => {
  return fs.readFileAsync(`${__dirname}/${lang}/${name}.md`, 'utf8')
}

module.exports.init = app => {

  app.get('/definitions/:lang/:name', (req, res) => {
    try {
      const lang = checkParamHasAllowedValues(req, 'lang', ['en', 'es', 'fr', 'ru'])
      const name = checkParamValueIsAllowed(req, 'name', R.match(/^[a-z0-9]+$/i))

      const mdRes = getDefinition(name, lang)
      mdRes.then(markdown => {
        const content = markdown ? marked(markdown) : ''
        res.send(`<html lang="fi">
          <head>
            <link rel="stylesheet" href="/css/definition.css"/>
          </head>
          <body>
          ${content}
          </body>
          </html>`)
      }).error(err => {
        console.error(err)
        if (err.code === 'ENOENT') {
          res.status(404).send('404 / Page not found')
        }
        else {
          res.status(500).send('An error occured')
        }
      })
    }
    catch (err) {
      console.error(err)
      res.status(500).send('An error occured.')
    }
  })
}
