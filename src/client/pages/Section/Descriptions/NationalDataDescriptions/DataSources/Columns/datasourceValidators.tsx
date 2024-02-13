import { Objects } from 'utils/objects'

export const datasourceValidators: Record<string, (x: string) => boolean> = {
  // check at least one character exists
  referenceText: (text) => !(Objects.isEmpty(text) || /\p{L}/u.test(text)),
  // check that reference link is link format
  referenceLink: (link) => !Objects.isEmpty(link) || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(link),
  // check at least one character exists
  comment: (commentString) => !(Objects.isEmpty(commentString) || /\p{L}/u.test(commentString)),
}
