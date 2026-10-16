import { Parser } from 'htmlparser2'

import { Objects } from 'utils/objects'

type HtmlLink = {
  link: string | null
  name: string
}

const getLinks = (html: string): Array<HtmlLink> => {
  if (Objects.isEmpty(html)) return []

  const links: Array<HtmlLink> = []

  let currentLink: HtmlLink | null = null
  const parser = new Parser(
    {
      onopentag(name, attributes): void {
        if (name === 'a') {
          currentLink = {
            link: attributes.href ?? null,
            name: '',
          }
        }
      },
      ontext(text): void {
        if (currentLink) {
          currentLink.name += text
        }
      },
      onclosetag(tagname): void {
        if (tagname === 'a' && currentLink) {
          links.push(currentLink)
          currentLink = null
        }
      },
    },
    { decodeEntities: true }
  )

  parser.write(html)
  parser.end()

  return links
}

export const Htmls = {
  getLinks,
}
