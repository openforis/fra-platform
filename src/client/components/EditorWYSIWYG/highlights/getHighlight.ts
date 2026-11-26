import { Objects } from 'utils/objects'

import { HighlightName } from 'client/components/EditorWYSIWYG/highlights/highlightName'
import { highlightPriority } from 'client/components/EditorWYSIWYG/highlights/highlightPriority'

export const getHighlight = (name: HighlightName): Highlight | undefined => {
  const isSupported = !Objects.isNil(CSS.highlights)
  if (!isSupported) return undefined

  const registeredHighlight = CSS.highlights.get(name)
  if (!Objects.isNil(registeredHighlight)) return registeredHighlight

  const highlight = new Highlight()
  highlight.priority = highlightPriority[name]
  CSS.highlights.set(name, highlight)

  return highlight
}
