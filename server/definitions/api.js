const marked = require('marked')

const en = require('./en')
const fr = require('./fr')
const es = require('./es')

const definitions = {
  'en': en,
  'fr': fr,
  'es': es
}

const getDefinition = (name, lang) => {
  const defs = definitions[lang]
  return defs ?
    defs[name] ? defs[name] : defs.nodata
    : null
}

module.exports.init = app => {

  app.get('/definitions/:lang/:name', (req, res) => {
    const markdown = getDefinition(req.params.name, req.params.lang)
    const content =  markdown ? marked(markdown) : ''
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
