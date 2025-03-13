import type { IJodit } from 'jodit/esm/types/jodit'

export const _processPaste = (_: IJodit, html: string) => {
  try {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html || ''
    const textParts: Array<string> = []
    let currentText = ''

    const walkNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        currentText += node.textContent
      } else if (node instanceof HTMLAnchorElement) {
        if (currentText.trim()) {
          textParts.push(currentText.trim())
          currentText = ''
        }
        const href = node.getAttribute('href')
        const text = node.textContent || ''
        textParts.push(`<a href="${href}" rel="nofollow" target="_blank">${text}</a>`)
      } else if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(walkNodes)
      }
    }

    walkNodes(tempDiv)

    if (currentText.trim()) {
      textParts.push(currentText.trim())
    }

    return textParts.join(' ')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error processing paste:', error)
    return html
  }
}
