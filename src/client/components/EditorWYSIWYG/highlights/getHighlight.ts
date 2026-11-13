import { Objects } from 'utils/objects'

import { HighlightName } from 'client/components/EditorWYSIWYG/highlights/highlightName'

export const getHighlight = (name: HighlightName): Highlight | undefined => {
  const isSupported = !Objects.isNil(CSS.highlights)
  if (!isSupported) return undefined

  const registeredHighlight = CSS.highlights.get(name)
  if (!Objects.isNil(registeredHighlight)) return registeredHighlight

  const highlight = new Highlight()
  CSS.highlights.set(name, highlight)

  return highlight
}
