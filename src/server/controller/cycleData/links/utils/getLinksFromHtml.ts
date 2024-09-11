import { Parser } from 'htmlparser2'
import { Objects } from 'utils/objects'

type LinkInfo = {
  link: string
  name: string
}

type Returned = Array<LinkInfo>

export const getLinksFromHtml = (html: string): Returned => {
  if (Objects.isEmpty(html)) return []

  const links: Returned = []

  let currentLink: LinkInfo | null = null
  const parser = new Parser(
    {
      onopentag(name, attributes) {
        if (name === 'a') {
          currentLink = {
            link: attributes.href ?? null,
            name: '',
          }
        }
      },
      ontext(text) {
        if (currentLink) {
          currentLink.name += text
        }
      },
      onclosetag(tagname) {
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
