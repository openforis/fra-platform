import * as fs from 'fs'
import { marked } from 'marked'

type Props = { assessmentName: string; cycleName: string; lang: string; name: string }
const getDefinition = (props: Props) => {
  const { cycleName, name, lang, assessmentName } = props
  return fs.promises.readFile(
    `${__dirname}/../../../static/definitions/${assessmentName}/${cycleName}/${lang}/${name}.md`,
    'utf8'
  )
}
export const getHtml = async (props: Props): Promise<string> => {
  const markdown = await getDefinition(props)

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

  const bodyClass = props.lang === 'ar' ? 'class="rtl"' : ''

  return `<html>
          <head>
            <title>${toc[0].text}</title>
            <link rel="stylesheet" href="/css/definition.css"/>
          </head>
          <body ${bodyClass}>
          ${tocHTML}
          ${content}
          </body>
          </html>`
}
