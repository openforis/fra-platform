const elementOffset = (element: Element) => {
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
  const { documentElement } = document
  if (documentElement.scrollTo) {
    documentElement.scrollTo(options)
  } else {
    // Non Chromium based Edge version
    documentElement.scrollIntoView(true)
  }
}

const parseDOMValue = (value: string): string =>
  new DOMParser().parseFromString(value, 'text/html').documentElement.innerText.replaceAll('\n', '')

export const DOMs = {
  elementOffset,
  scrollTo,
  parseDOMValue,
}
