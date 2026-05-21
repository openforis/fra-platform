import { TFunction } from 'i18next'
import type { IJodit } from 'jodit/esm/types/jodit'

import { ToasterHook } from 'client/hooks/toaster'

export const _processPaste =
  (toaster: ToasterHook['toaster'], t: TFunction) =>
  (_: IJodit, html: string): string => {
    try {
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html || ''
      const textParts: Array<string> = []
      let currentText = ''

      const walkNodes = (node: Node): void => {
        if (node.nodeType === Node.TEXT_NODE) {
          currentText += node.textContent
        } else if (node instanceof HTMLAnchorElement) {
          if (currentText.trim()) {
            textParts.push(currentText.trim())
            currentText = ''
          }
          const href = node.getAttribute('href')?.trim() ?? ''
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

      const visualElements = [
        'table',
        'td',
        'th',
        'img',
        'video',
        'iframe',
        'canvas',
        'svg',
        'figure',
        'hr',
        'br',
        'ul',
        'ol',
        'li',
        'blockquote',
      ]

      if (visualElements.some((element) => html.toLowerCase().includes(`<${element}`))) {
        toaster.info(t('validation.contentUpdatedOnlyLinks'))
      }

      return textParts.join(' ')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error processing paste:', error)
      return html
    }
  }
