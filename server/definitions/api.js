const marked = require('marked')

const en = require('./en')
const fr = require('./fr')
const es = require('./es')

const definitions = {
  'en': en,
  'fr': fr,
  'es': es
}

const getDefition = (name, lang) => {
  const defs = definitions[lang]
  return defs ? defs[name] : null
}

module.exports.init = app => {

  app.get('/definitions/:lang/:name', (req, res) => {
    const content = marked(getDefition(req.params.name, req.params.lang))
    res.send(`<html lang="fi">
    <head>
      <link rel="stylesheet" href="/css/definition.css"/>
    </head>
    <body>
    ${content}
    </body>
    </html>`)
  })
}
