export const elementOffset = (el) => {
  if (el) {
    const rect = el.getBoundingClientRect()

    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    return {
      height: rect.height,
      width: rect.width,
      x: rect.x,
      y: rect.y,
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
    }
  }

  return {}
}

export const documentScrollTo = (options = { top: 0, left: 0, behavior: 'smooth' }) => {
  const { documentElement } = document
  if (documentElement.scrollTo) {
    documentElement.scrollTo(options)
  } else {
    // Non Chromium based Edge version
    documentElement.scrollIntoView(true)
  }
}
