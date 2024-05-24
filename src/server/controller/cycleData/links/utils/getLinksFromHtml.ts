import { JSDOM } from 'jsdom'
import { Objects } from 'utils/objects'

type LinkInfo = {
  link: string
  name: string
}

type Returned = Array<LinkInfo>

export const getLinksFromHtml = (html: string): Returned => {
  if (Objects.isEmpty(html)) return []

  const dom = new JSDOM(html)
  const doc = dom.window.document
  const anchorTags = doc.querySelectorAll('a')

  const links: Returned = []
  for (let i = 0; i < anchorTags.length; i += 1) {
    const anchor = anchorTags[i]
    const link = anchor.getAttribute('href')
    const name = anchor.textContent
    links.push({
      link,
      name,
    })
  }

  return links
}
