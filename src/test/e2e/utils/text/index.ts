// Note:
// labels are expected to be unique, e.g. Date.now().toString()

const singleLine = (label: string): string => `Single line text ${label}`

const multiLine = (label: string): Array<string> => [
  'These are valid comments.',
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${label}`,
]

export const TextBuilder = {
  multiLine,
  singleLine,
}
