import * as fs from 'fs'
import marked from 'marked'
import * as R from 'ramda'
import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { readParameterWithAllowedValues, readAllowedParameter } from '../../utils/sanityChecks'

const getDefinition = (name: string, lang: string) => {
  return fs.promises.readFile(`${__dirname}/../../static/definitions/${lang}/${name}.md`, 'utf8')
}

export const DefinitionGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Definitions.get(), (req: Request, res: Response) => {
      try {
        const lang = readParameterWithAllowedValues(req, 'lang', ['en', 'es', 'fr', 'ru', 'ar', 'zh'])
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
            toc.forEach((entry: any, index: number) => {
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
          .catch((err: any) => {
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
  },
}
