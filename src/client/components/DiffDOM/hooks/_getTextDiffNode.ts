import * as Diff from 'diff'
import { Strings } from 'utils/strings'

export const getTextDiffNode = (currentValue: string, newValue: string): HTMLDivElement => {
  const changes = Diff.diffLines(Strings.nbspToUnicode(currentValue), Strings.nbspToUnicode(newValue))

  const newNode = document.createElement('div')

  changes.forEach((change, i) => {
    const { added, removed, value } = change

    value.split('\n\r').forEach((text) => {
      const span = document.createElement('span')
      if (added) span.classList.add('added')
      if (removed) span.classList.add('removed')
      span.textContent = text
      newNode.appendChild(span)

      if (i < changes.length - 1) {
        newNode.appendChild(document.createElement('br'))
      }
    })
  })

  return newNode
}
