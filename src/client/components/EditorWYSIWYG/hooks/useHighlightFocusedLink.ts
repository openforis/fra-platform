import { RefObject, useEffect, useRef } from 'react'

import { Objects } from 'utils/objects'

import { getHighlight } from 'client/components/EditorWYSIWYG/highlights/getHighlight'
import { HighlightName } from 'client/components/EditorWYSIWYG/highlights/highlightName'

import { highlightLinks } from './_highlightLinks'

type Props = {
  containerRef: RefObject<HTMLDivElement>
  focusedLink?: string
}

export const useHighlightFocusedLink = (props: Props): void => {
  const { containerRef, focusedLink } = props

  const scrolledLinkRef = useRef<string>(undefined)

  useEffect(() => {
    const container = containerRef.current
    const canHighlight = !Objects.isNil(container) && !Objects.isNil(focusedLink)
    if (!canHighlight) return (): void => undefined

    const scrollToLink = (anchors: Array<HTMLAnchorElement>): void => {
      const scrolled = scrolledLinkRef.current === focusedLink
      if (scrolled || Objects.isEmpty(anchors)) return

      anchors.at(0).scrollIntoView({ block: 'center' })
      scrolledLinkRef.current = focusedLink
    }

    const highlight = getHighlight(HighlightName.focusedLink)
    // An empty focused link stands for the links without address
    const links = [Objects.isEmpty(focusedLink) ? '' : focusedLink]

    return highlightLinks({ container, highlight, links, onHighlight: scrollToLink })
  }, [containerRef, focusedLink])
}
