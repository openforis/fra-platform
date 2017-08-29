
const marked = require('marked')

const enTexts = require('./en')

module.exports.init = app => {

  app.get('/definitions/:lang/:name', (req, res) => {
    console.log('api', marked(enTexts[req.params.name]))
    const content = marked(enTexts[req.params.name])
    res.send(`<html lang="fi">
    <head>
      <link rel="stylesheet" href="/css/definition.css"/>
    </head>
    <body>
    ${content}
    </body>
    </html>`)})
}
