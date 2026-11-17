import { RefObject, useEffect } from 'react'

import { Objects } from 'utils/objects'

import { getHighlight } from 'client/components/EditorWYSIWYG/highlights/getHighlight'
import { HighlightName } from 'client/components/EditorWYSIWYG/highlights/highlightName'

import { highlightLinks } from './_highlightLinks'

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

    return highlightLinks({ container, highlight, links: invalidLinks })
  }, [containerRef, invalidLinks])
}
