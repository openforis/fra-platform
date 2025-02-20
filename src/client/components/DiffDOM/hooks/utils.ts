import { Strings } from 'utils/strings'

import { DiffElement, DiffElementNode, DiffTextNode, DiffTextNodeName, DiffType } from 'client/components/DiffDOM/types'

export const cleanDOM = (value: string): string => {
  return (
    value
      .replace(/[\n\t\r]/g, '')
      // .replace(/\u00a0|&nbsp;/g, ' ')
      .toString()
  )
}

export const normalizeDiffDOM = (value: string): string => {
  const cleanedValue = cleanDOM(value)

  const parser = new DOMParser()
  const doc = parser.parseFromString(`<div>${cleanedValue}</div>`, 'text/html')
  const element = doc.body.firstElementChild as HTMLElement
  element?.normalize()

  return element ? `<div class="___diff">${element.innerHTML}</div>` : ''
}

export const applyDiffClassToElement = (element: DiffElement, type: DiffType): DiffElement => {
  const elementNode = element as DiffElementNode

  if ('nodeName' in element && Object.values(DiffTextNodeName).includes(element.nodeName as DiffTextNodeName)) {
    // replace space with Unicode char
    const data = Strings.nbspToUnicode((element as DiffTextNode).data)
    const textNode = { nodeName: element.nodeName, data }

    return {
      nodeName: 'span',
      attributes: { class: `${elementNode.attributes?.class ?? ''} ${type}` },
      childNodes: [textNode],
    }
  }

  return {
    ...elementNode,
    childNodes: elementNode.childNodes?.map((child) => applyDiffClassToElement(child, type)) || [],
  }
}
