import { DiffElement, DiffElementNode, DiffTextNodeName, DiffType } from 'client/components/DiffDOM/types'

export const cleanDOM = (value: string): string => {
  return value
    .replace(/[\n\t\r]/g, '')
    .replace(/\u00a0|&nbsp;/g, ' ')
    .toString()
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
  if ('nodeName' in element && Object.values(DiffTextNodeName).includes(element.nodeName as DiffTextNodeName)) {
    return element // Do nothing if it's a text node
  }

  const elementNode = element as DiffElementNode
  const newClass = elementNode.attributes?.class ? `${elementNode.attributes.class} ${type}` : type

  return {
    ...elementNode,
    attributes: {
      ...elementNode.attributes,
      class: newClass,
    },
    childNodes: elementNode.childNodes?.map((child) => applyDiffClassToElement(child, type)) || [],
  }
}
