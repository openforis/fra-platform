import { Objects } from 'utils/objects'

import { getLinkHref } from './_getLinkHref'

type Props = {
  container: HTMLDivElement
  highlight?: Highlight
  links: Array<string>
  onHighlight?: (anchors: Array<HTMLAnchorElement>) => void
}

type Returned = () => void

export const highlightLinks = (props: Props): Returned => {
  const { container, highlight, links, onHighlight } = props

  const hrefs = new Set<string>(links)
  const ranges = new Set<Range>()

  const removeRanges = (): void => {
    ranges.forEach((range) => highlight?.delete(range))
    ranges.clear()
  }

  const updateRanges = (): void => {
    removeRanges()

    const anchors: Array<HTMLAnchorElement> = []
    container.querySelectorAll<HTMLAnchorElement>('.jodit-wysiwyg a').forEach((anchor) => {
      if (!hrefs.has(getLinkHref(anchor))) return

      anchors.push(anchor)
      if (Objects.isNil(highlight)) return

      const range = document.createRange()
      range.selectNodeContents(anchor)
      highlight.add(range)
      ranges.add(range)
    })

    onHighlight?.(anchors)
  }

  updateRanges()

  // Jodit renders the content after the editor mounts
  const observer = new MutationObserver(updateRanges)
  observer.observe(container, { attributeFilter: ['href'], characterData: true, childList: true, subtree: true })

  return (): void => {
    observer.disconnect()
    removeRanges()
  }
}
