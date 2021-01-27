// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = (Promise as any).promisifyAll(require('fs'))
const marked = require('marked')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
const { readParameterWithAllowedValues, readAllowedParameter } = require('../utils/sanityChecks')

const getDefinition = (name: any, lang: any) => {
  return fs.readFileAsync(`${__dirname}/${lang}/${name}.md`, 'utf8')
}
module.exports.init = (app: any) => {
  app.get('/definitions/:lang/:name', (req: any, res: any) => {
    try {
      const lang = readParameterWithAllowedValues(req, 'lang', ['en', 'es', 'fr', 'ru'])
      const name = readAllowedParameter(req, 'name', R.match(/^[a-z0-9]+$/i))
      const mdRes = getDefinition(name, lang)
      mdRes
        .then((markdown: any) => {
          const toc: any = []
          const renderer = new marked.Renderer()
          renderer.heading = function (text: any, level: any) {
            if (level < 3) {
              const anchor = text.toLowerCase().substr(0, text.indexOf(' '))
              toc.push({
                anchor,
                text,
              })
              return `<h${level} id="${anchor}" class="anchor-link">${text}</h${level}>`
            }

            return `<h${level}>${text}</h${level}>`
          }
          marked.setOptions({
            renderer,
            smartypants: true,
          })
          const content = markdown ? marked(markdown) : ''
          let tocHTML = '<ul class="toc">'
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
          toc.forEach((entry, index) => {
            if (index > 0) {
              tocHTML += `<li><a href="#${entry.anchor}">${entry.text}</a></li>`
            }
          })
          tocHTML += '</ul><hr/>'
          res.send(`<html>
          <head>
            <title>${toc[0].text}</title>
            <link rel="stylesheet" href="/css/definition.css"/>
          </head>
          <body>
          ${tocHTML}
          ${content}
          </body>
          </html>`)
        })
        .error((err: any) => {
          console.error(err)
          if (err.code === 'ENOENT') {
            if (lang !== 'en') {
              res.redirect(`/definitions/en/${name}`)
            } else {
              res.status(404).send('404 / Page not found')
            }
          } else {
            res.status(500).send('An error occured')
          }
        })
    } catch (err) {
      console.error(err)
      res.status(500).send('An error occured.')
    }
  })
}
