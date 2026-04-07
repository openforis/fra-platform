import fs from 'fs'
import { marked } from 'marked'

type Props = { assessmentName: string; cycleName: string; lang: string; name: string }
const getDefinition = (props: Props): Promise<string> => {
  const { assessmentName, cycleName, lang, name } = props
  return fs.promises.readFile(
    `${__dirname}/../../../static/definitions/${assessmentName}/${cycleName}/${lang}/${name}.md`,
    'utf8'
  )
}

const _getAnchorAndTextFromHeader = (header: string): { anchor: string; text: string } => {
  const sectionMarkerMatch = header.match(/<!--\s*section:(.*?)\s*-->/)

  if (sectionMarkerMatch && sectionMarkerMatch.length > 1) {
    return {
      anchor: sectionMarkerMatch[1].trim(), // Result of the capturing group (.*?)
      text: header.replace(sectionMarkerMatch[0], '').trim(), // Remove HTML comment
    }
  }

  return {
    anchor: header.toLowerCase().substring(0, header.indexOf(' ')).trim(),
    text: header,
  }
}

export const getHtml = async (props: Props): Promise<string> => {
  const markdown = await getDefinition(props)

  const toc: Array<Record<string, string>> = []
  const renderer = new marked.Renderer()
  renderer.heading = ({ depth, tokens }): string => {
    const text = tokens.at(0).raw

    if (depth < 3) {
      const { anchor, text: newText } = _getAnchorAndTextFromHeader(text)
      toc.push({
        anchor,
        text: newText,
      })
      return `<h${depth} id="${anchor}" class="anchor-link">${newText}</h${depth}>`
    }

    return `<h${depth}>${text}</h${depth}>`
  }
  marked.setOptions({ renderer })

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
