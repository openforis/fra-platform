const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const marked = require('marked')

const getDefinition = (name, lang) => {
  return fs.readFileAsync(`${__dirname}/${lang}/${name}.md`, 'utf8')
}

module.exports.init = app => {

  app.get('/definitions/:lang/:name', (req, res) => {
    const mdRes = getDefinition(req.params.name, req.params.lang)

    mdRes.then(markdown => {
      console.log('res', markdown)
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
      if(err.code === 'ENOENT') {
        res.send('404 / Page not found', 404)
      }
      else {
        res.send('An error occured', 500)
      }
    })
  })
}
