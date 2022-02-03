import * as marked from 'marked'
import * as fs from 'fs'

const getDefinition = (name: string, lang: string) => {
  return fs.promises.readFile(`${__dirname}/../../../static/definitions/${lang}/${name}.md`, 'utf8')
}
export const getHtml = async (lang: string, name: string): Promise<string> => {
  const markdown = await getDefinition(name, lang)

  const toc: Array<Record<string, string>> = []
  const renderer = new marked.Renderer()
  renderer.heading = function (text: string, level: number) {
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
  // @ts-ignore
  marked.setOptions({
    renderer,
    smartypants: true,
  })
  // @ts-ignore
  const content = markdown ? marked(markdown) : ''
  let tocHTML = '<ul class="toc">'
  toc.forEach(({ anchor, text }: Record<string, string>, index: number) => {
    if (index > 0) {
      tocHTML += `<li><a href="#${anchor}">${text}</a></li>`
    }
  })
  tocHTML += '</ul><hr/>'

  return `<html>
          <head>
            <title>${toc[0].text}</title>
            <link rel="stylesheet" href="/css/definition.css"/>
          </head>
          <body>
          ${tocHTML}
          ${content}
          </body>
          </html>`
}
