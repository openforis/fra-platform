import serialize from 'dom-serializer'
import { DomUtils, parseDocument } from 'htmlparser2'
import type { IJodit } from 'jodit/esm/types/jodit'

import { processor, tableTags } from './_sanitizer'

export const _processCustomPaste = (_: IJodit, html: string): string => {
  const sanitizedHtml = processor
    .processSync(html)
    .toString()
    .replace(/(<div><br><\/div>)*/, '')

  const dom = parseDocument(sanitizedHtml, { lowerCaseAttributeNames: true, lowerCaseTags: true })

  const styledTableNodes = DomUtils.findAll((node) => {
    return node.type === 'tag' && tableTags.includes(node.name) && typeof node.attribs.style === 'string'
  }, dom.children)

  const lengthRE = /^\d+(?:\.\d+)?[a-zA-Z%]+$/
  styledTableNodes.forEach((el) => {
    const { style } = el.attribs
    const styleDeclarations = style.split(';')

    const safeDeclarations = styleDeclarations.reduce<Array<string>>((acc, chunk) => {
      const decl = chunk.trim()
      if (!decl) {
        return acc
      }
      const [property, value] = decl.split(':').map((s) => s.trim())

      if ((property === 'width' || property === 'height') && lengthRE.test(value)) {
        acc.push(`${property}: ${value}`)
      }
      return acc
    }, [])

    if (safeDeclarations.length > 0) {
      // eslint-disable-next-line no-param-reassign
      el.attribs.style = safeDeclarations.join('; ')
    } else {
      // eslint-disable-next-line no-param-reassign
      delete el.attribs.style
    }
  })

  return serialize(dom.children, {
    decodeEntities: false,
    xmlMode: false,
  })
}
