import { Objects } from 'utils/objects'

export const datasourceValidators: Record<string, (x: string) => boolean> = {
  // check at least one character exists
  referenceText: (text) => !(Objects.isEmpty(text) || /[A-Za-z]/.test(text)),
  // check that reference link is link format
  referenceLink: (link) => !Objects.isEmpty(link) || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(link),
  // check that is number
  year: (yearString) => !(Objects.isEmpty(yearString) || Number.isInteger(Number(yearString))),
  // check at least one character exists
  comment: (commentString) => !(Objects.isEmpty(commentString) || /[A-Za-z]/.test(commentString)),
}
