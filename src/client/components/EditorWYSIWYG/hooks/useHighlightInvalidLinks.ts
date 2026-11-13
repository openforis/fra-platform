import { RefObject, useEffect } from 'react'

import { Objects } from 'utils/objects'

import { getHighlight } from 'client/components/EditorWYSIWYG/highlights/getHighlight'
import { HighlightName } from 'client/components/EditorWYSIWYG/highlights/highlightName'

type Props = {
  containerRef: RefObject<HTMLDivElement>
  invalidLinks?: Array<string>
}

export const useHighlightInvalidLinks = (props: Props): void => {
  const { containerRef, invalidLinks } = props

  useEffect(() => {
    const container = containerRef.current
    const highlight = getHighlight(HighlightName.invalidLink)
    const canHighlight = !Objects.isNil(container) && !Objects.isNil(highlight) && !Objects.isEmpty(invalidLinks)
    if (!canHighlight) return (): void => undefined

    const hrefs = new Set<string>(invalidLinks)
    const ranges = new Set<Range>()

    const removeRanges = (): void => {
      ranges.forEach((range) => highlight.delete(range))
      ranges.clear()
    }

    const updateRanges = (): void => {
      removeRanges()

      container.querySelectorAll<HTMLAnchorElement>('.jodit-wysiwyg a').forEach((anchor) => {
        const hrefAttribute = anchor.getAttribute('href')
        const href = Objects.isEmpty(hrefAttribute) ? '' : hrefAttribute
        if (!hrefs.has(href)) return

        const range = document.createRange()
        range.selectNodeContents(anchor)
        highlight.add(range)
        ranges.add(range)
      })
    }

    updateRanges()

    // Jodit renders the content after the editor mounts
    const observer = new MutationObserver(updateRanges)
    observer.observe(container, { attributeFilter: ['href'], characterData: true, childList: true, subtree: true })

    return (): void => {
      observer.disconnect()
      removeRanges()
    }
  }, [containerRef, invalidLinks])
}
