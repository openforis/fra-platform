import { Parser } from 'htmlparser2'

type ElementOffset = {
  height: number
  left: number
  top: number
  width: number
  x: number
  y: number
}

const elementOffset = (element: Element): ElementOffset | object => {
  if (element) {
    const rect = element.getBoundingClientRect()
    const scrollLeft = window.scrollX ?? document.documentElement.scrollLeft
    const scrollTop = window.scrollY ?? document.documentElement.scrollTop

    const { height, width, x, y } = rect
    const left = rect.left + scrollLeft
    const top = rect.top + scrollTop

    return { height, left, top, width, x, y }
  }

  return {}
}

const scrollTo = (options: ScrollToOptions = { top: 0, left: 0, behavior: 'smooth' }): void => {
  const mainElement = document.getElementById('main')
  mainElement.scrollTo(options)
}

const parseDOMValue = (value: string): string =>
  new DOMParser().parseFromString(value, 'text/html').documentElement.innerText.replaceAll('\n', '')

const findElementByName = <Returned extends Element>(element: Element, name: string): Returned | undefined => {
  const queue: Array<Element> = [element]

  while (queue.length) {
    const item = queue.shift()
    if (item.nodeName === name) {
      return item as Returned
    }
    queue.push(...Array.from(item.children))
  }

  return undefined
}

const getHtmlTextContent = (html: string): string => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html ?? '', 'text/html')
  return doc.documentElement.textContent || ''
}

const isHTMLEmpty = (html: string): boolean => {
  // Objects.isEmpty() calls trim() internally, which causes
  // crashes with large strings in Firefox. It is avoided here.
  if (!html) return true

  let hasVisibleText = false
  const parser = new Parser(
    {
      ontext(text): void {
        // Stop parsing as soon as a non-whitespace character is found
        if (/\S/.test(text)) {
          hasVisibleText = true
          parser.pause()
        }
      },
    },
    { decodeEntities: true }
  )

  parser.write(html)
  parser.end()

  return !hasVisibleText
}

export const DOMs = {
  elementOffset,
  findElementByName,
  getHtmlTextContent,
  isHTMLEmpty,
  parseDOMValue,
  scrollTo,
}
