export const cleanDOM = (value: string): string => {
  return value
    .replace(/[\n\t\r]/g, '')
    .replace(/\u00a0/g, ' ')
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
