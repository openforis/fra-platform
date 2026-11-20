import { HighlightName } from 'client/components/EditorWYSIWYG/highlights/highlightName'

export const highlightPriority: Record<HighlightName, number> = {
  [HighlightName.focusedLink]: 1,
  [HighlightName.invalidLink]: 0,
}
